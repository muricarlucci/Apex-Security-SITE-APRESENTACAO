/**
 * Gera um index.html autossuficiente a partir do build standalone do Vite.
 *
 * O Vite ja embute como data URI toda imagem IMPORTADA no codigo (graças ao
 * assetsInlineLimit altissimo no modo standalone). Restam tres coisas para
 * este script resolver:
 *
 *   1. o CSS, que sai como arquivo separado -> vira <style> inline
 *   2. o JS, idem                           -> vira <script> inline
 *   3. os arquivos de /public, que o Vite copia sem tocar e sao referenciados
 *      por caminho absoluto ("/logo-apex.png") -> viram data URI
 *
 * Resultado: um unico arquivo que abre com duplo clique, sem servidor.
 *
 * Dois detalhes que custaram caro e estao resolvidos aqui:
 *
 *   - String.replace com uma STRING de substituicao interpreta `$&`, `$'`,
 *     "$`" e `$1` como padroes. Esses pares aparecem naturalmente em JS
 *     minificado, o que reinjetava a tag <script> original no meio do bundle.
 *     Por isso toda substituicao usa uma FUNCAO, que nao expande nada.
 *
 *   - Trocar cada referencia pelo data URI duplicava a imagem uma vez por uso
 *     (o logo aparece 3x: favicon, navbar e footer). Dentro do JS as
 *     referencias apontam para um mapa unico, `window.__APEX_ASSETS`, e so o
 *     HTML recebe o data URI literal.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const outDir = join(root, 'dist-standalone')
const publicDir = join(root, 'public')
const htmlPath = join(outDir, 'index.html')

const MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

const kb = (s) => `${(Buffer.byteLength(s, 'utf8') / 1024).toFixed(0)} kB`
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Substituicao literal: a funcao impede a expansao de `$&`, `$'` etc. */
const sub = (haystack, needle, value) => haystack.replace(needle, () => value)

if (!existsSync(htmlPath)) {
  console.error('  ! dist-standalone/index.html nao existe. Rode o build do Vite antes.')
  process.exit(1)
}

let html = readFileSync(htmlPath, 'utf8')

// ------------------------------------------- 1. catalogo de /public

/** @type {Map<string, string>} caminho publico -> data URI */
const assets = new Map()

if (existsSync(publicDir)) {
  for (const name of readdirSync(publicDir)) {
    const mime = MIME[extname(name).toLowerCase()]
    if (!mime) continue
    const b64 = readFileSync(join(publicDir, name)).toString('base64')
    assets.set(`/${name}`, `data:${mime};base64,${b64}`)
  }
}

// ------------------------------------------------ 2. CSS -> <style>

const cssTag = html.match(/<link[^>]+rel=["']stylesheet["'][^>]*href=["'](\/[^"']+\.css)["'][^>]*>/i)
if (!cssTag) {
  console.error('  ! nenhum <link rel="stylesheet"> local encontrado')
  process.exit(1)
}
const css = readFileSync(join(outDir, cssTag[1].slice(1)), 'utf8')
html = sub(html, cssTag[0], `<style>\n${css}\n</style>`)
console.log(`  CSS embutido            ${kb(css)}`)

// ----------------------------------------------- 3. JS -> <script>

const jsTag = html.match(/<script[^>]*src=["'](\/[^"']+\.js)["'][^>]*><\/script>/i)
if (!jsTag) {
  console.error('  ! nenhum <script src> local encontrado')
  process.exit(1)
}

let js = readFileSync(join(outDir, jsTag[1].slice(1)), 'utf8')

// As referencias a /public dentro do bundle sao literais de string. Apontar
// cada uma para um mapa evita repetir o data URI inteiro a cada uso.
const usedInJs = new Set()
for (const path of assets.keys()) {
  const literal = new RegExp(`(["'])${escapeRe(path)}\\1`, 'g')
  js = js.replace(literal, () => {
    usedInJs.add(path)
    return `window.__APEX_ASSETS[${JSON.stringify(path)}]`
  })
}

// `</script>` dentro de um literal encerraria a tag antes da hora
js = js.replace(/<\/script>/gi, () => '<\\/script>')

// O mapa precisa existir antes do bundle rodar
const mapEntries = [...usedInJs].map((p) => `${JSON.stringify(p)}:${JSON.stringify(assets.get(p))}`)
const mapScript = mapEntries.length
  ? `    <script>window.__APEX_ASSETS={${mapEntries.join(',')}};</script>\n`
  : ''

// O bundle vai para o FIM do body, nao para o lugar da tag original no <head>.
// O Vite emitia `type="module"`, que e adiado por padrao; um <script> inline
// nao e — rodando no <head> ele procuraria #root antes de o body existir,
// falharia em createRoot e deixaria a pagina em branco.
html = sub(html, jsTag[0], '')
html = sub(
  html,
  '</body>',
  `${mapScript}    <script>\n${js}\n    </script>\n  </body>`
)
console.log(`  JS embutido             ${kb(js)}`)
for (const p of usedInJs) {
  console.log(`  ${p.padEnd(24)}${kb(assets.get(p))}  -> window.__APEX_ASSETS`)
}

// ------------------------------- 4. og:image nao aceita data URI

// Rastreadores de rede social nao leem data URI e a imagem embutida aqui
// so inflaria o arquivo. Vira comentario com a instrucao de preencher a URL
// absoluta depois do deploy.
html = html.replace(
  /[ \t]*<meta\s+property=["']og:image["'][^>]*>\s*\n?/i,
  () =>
    '    <!-- og:image: aponte para a URL absoluta apos o deploy, ex.\n' +
    '         <meta property="og:image" content="https://SEU-SITE.vercel.app/preview.png"> -->\n'
)

// ----------------------------- 5. atributos do HTML -> data URI

let htmlRefs = 0
for (const [path, uri] of assets) {
  const attr = new RegExp(`((?:src|href)=)(["'])${escapeRe(path)}\\2`, 'gi')
  html = html.replace(attr, (_m, key, q) => {
    htmlRefs++
    console.log(`  ${path.padEnd(24)}${kb(uri)}  -> atributo inline`)
    return `${key}${q}${uri}${q}`
  })
}

// ------------------------------------------------- 6. verificacao

const leftovers = []
for (const m of html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)) {
  const url = m[1]
  if (url.startsWith('data:') || url.startsWith('#')) continue
  if (url.startsWith('https://fonts.googleapis.com') || url.startsWith('https://fonts.gstatic.com')) continue
  leftovers.push(url)
}

writeFileSync(htmlPath, html, 'utf8')

console.log(`\n  -> dist-standalone/index.html   ${kb(html)}`)
console.log(`     ${usedInJs.size} imagem(ns) no mapa JS, ${htmlRefs} em atributos`)

if (leftovers.length) {
  console.log('\n  ! referencias externas restantes (quebram em file://):')
  for (const l of new Set(leftovers)) console.log(`      ${l}`)
  process.exit(1)
}
console.log('     nenhuma dependencia externa alem das fontes do Google\n')
