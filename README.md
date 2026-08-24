# Apex Security — Site Institucional

> **Este repositório é o site de apresentação (marketing) da Apex Security — não é o produto.**
> O produto é o dashboard/plataforma ASPM, que vive em um repositório separado, com deploy,
> backend e ciclo de versões próprios.

| | Site institucional (este repo) | Dashboard / Produto |
|---|---|---|
| **Papel** | Vitrine comercial, copy, planos, contato | A plataforma ASPM em si |
| **Versão** | `1.0.0` | `2.1` |
| **Stack** | React + Vite (sem backend próprio) | React + Vite + API própria |
| **Produção** | *(a definir no primeiro deploy)* | https://apex-security-delta.vercel.app |

A única ligação entre os dois projetos são links: todos os botões **"Ver Demonstração"** e
**"Acessar Plataforma"** apontam para o dashboard em produção.

---

## Stack

- **React 18** + **Vite 5** — mesmo padrão do dashboard, para consistência de manutenção
- **framer-motion** — scroll-reveal e transição do mega-menu
- **Sem roteador** — página única com âncoras de scroll suave (`scroll-behavior: smooth`)
- **Sem backend próprio** — o formulário de contato reaproveita a API já em produção do dashboard

## Rodando localmente

```bash
npm install
npm run dev
```

O Vite sobe em `http://localhost:5173`.

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Serve o `dist/` localmente, para conferir o build |

## Estrutura

```
src/
├─ main.jsx                 Entrada. Importa global.css ANTES dos componentes (ver nota abaixo)
├─ App.jsx                  Composição da página única
├─ data/site.js             Fonte única de conteúdo: módulos, planos, fundadores, endpoints
├─ styles/global.css        Sistema de design: paleta, tipografia, botões, cards, acessibilidade
└─ components/
   ├─ Navbar.jsx            Pílula flutuante + mega-menu (hover) + menu hambúrguer
   ├─ Hero.jsx              Headline, CTAs, 4 cards de destaque, frame do dashboard
   ├─ GoldSwoosh.jsx        Elemento assinatura: as trilhas de luz douradas
   ├─ Platform.jsx          Os 6 módulos + bloco human-in-the-loop
   ├─ HowItWorks.jsx        Timeline numerada das 8 etapas do fluxo
   ├─ Pricing.jsx           Starter / Pro / Enterprise
   ├─ About.jsx             Missão + cards dos fundadores
   ├─ Contact.jsx           Formulário → API do dashboard
   ├─ Footer.jsx            Logo, links, redes, copyright
   ├─ Icons.jsx             Ícones SVG inline
   └─ Reveal.jsx            Wrapper de scroll-reveal, respeita prefers-reduced-motion
public/
├─ logo-apex.png            Logo oficial (fundo transparente, margens já recortadas)
└─ dashboard-preview.png    Screenshot real do dashboard exibida no hero
```

> **Nota sobre a ordem de import em `main.jsx`:** `global.css` precisa vir **antes** de `App.jsx`.
> O Vite emite o CSS na ordem dos imports, e regras de componente (`.nav__cta { display: none }`)
> têm a mesma especificidade de utilitários globais (`.btn { display: inline-flex }`) — quem vier
> depois vence. Inverter essa ordem quebra silenciosamente vários overrides responsivos.

## Sistema de design

| Token | Valor |
|---|---|
| Fundo | `#0A0A0A` (seções alternadas: `#0D0D0D`) |
| Dourado principal | `#C9A84C` |
| Dourado claro | `#E8C97A` |
| Dourado escuro | `#8B6914` |
| Texto | `#F5F0E1` |
| Texto secundário | `#9A9488` |
| Cards | `#111111`, borda `1px solid #2A2200` |

**Tipografia:** `Sora` para display/headlines e botões (identidade comercial própria, distinta do
`Cinzel` usado no dashboard), `Inter` para corpo de texto.

## Integração com a API

O formulário de contato faz `POST` direto para o backend já existente do dashboard:

```
POST https://apex-security-api.onrender.com/api/contact
Content-Type: application/json

{ "name": "...", "email": "...", "subject": "...", "message": "..." }
```

Não há variáveis de ambiente. O site não precisa de nenhuma configuração para buildar ou deployar.

## Placeholders a substituir

Todos estão marcados com `TODO` no código:

| Item | Onde | Como substituir |
|---|---|---|
| Redes sociais | `src/components/Footer.jsx` → `SOCIALS` | Trocar `href: '#'` pelas URLs reais |
| Screenshot do dashboard | `public/dashboard-preview.png` | Substituir o arquivo mantendo o nome |
| Logo | `public/logo-apex.png` | Substituir o arquivo mantendo o nome |

As fotos e bios dos fundadores já são as definitivas (v1.1.0). Para trocá-las, substitua os
arquivos em `src/assets/founders/` mantendo os nomes, e edite `FOUNDERS` em `src/data/site.js`.

## Acessibilidade

- Skip link para o conteúdo principal
- Foco de teclado visível em todos os elementos interativos
- `prefers-reduced-motion` respeitado: desliga scroll-reveal, transições e o scroll suave
- Mega-menu com `aria-expanded` / `aria-haspopup`; `Esc` fecha os painéis
- Feedback do formulário anunciado via `role="status"` + `aria-live="polite"`

## Responsividade

Totalmente responsivo. Abaixo de `768px` a pílula do navbar colapsa para menu hambúrguer,
e todas as grades passam a coluna única.
