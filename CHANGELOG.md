# Changelog

Todas as mudanças relevantes deste projeto são documentadas aqui.

Este site tem versionamento próprio, independente do dashboard/produto (que está na v2.1).
O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e
[Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [1.1.0] — 2026-08-23

### Corrigido

- Removido efeito visual da Hero que havia sido adicionado fora do escopo original e não atendeu
  ao resultado esperado (shader WebGL `LightBloom`). Reversão cirúrgica: o componente foi
  excluído, o `GoldSwoosh` voltou ao estado da v1.0.0 (ambient + horizonte + trilhas douradas) e
  os ajustes de `z-index` e `pointer-events` que só existiam para acomodá-lo saíram junto. Cards
  de features, CTAs e preview do dashboard permaneceram intocados.
- Corrigida transparência do mega-menu "Plataforma", que permitia leitura indevida do texto do
  Hero por trás: fundo agora é `#111111` sólido, sem alpha. O `backdrop-filter: blur()` foi
  removido por não ter mais efeito sob um fundo opaco. O menu mobile recebeu o mesmo tratamento,
  pelo mesmo motivo.
- Corrigido vazamento do mega-menu para fora da viewport em telas estreitas (a 900px o painel
  saía 71px pela esquerda). Ele era ancorado no item "Plataforma", que desliza para a esquerda
  conforme a pílula encolhe; agora se ancora na própria pílula, que é sempre centralizada.
  Verificado de 780px a 1440px. Bug pré-existente à v1.0.0, encontrado ao testar a correção de
  transparência em larguras variadas.

### Adicionado

- Fotos reais e bios atualizadas dos 3 fundadores na seção "Sobre". Imagens em
  `src/assets/founders/`, recortadas em quadrado e reamostradas para 512×512 (≈25–39 kB cada),
  importadas via ESM para que o Vite as versione com hash.
- Meta tags de SEO/compartilhamento no `index.html`: `description`, `og:title`,
  `og:description`, `og:type`, `og:image` e `og:locale`. `<title>` atualizado para
  "Apex Security — Segurança de Aplicações com IA".

### Notas

- Não havia ocorrência da grafia "Miguell" no código — o nome já constava como
  "Miguel Domingos" desde a v1.0.0. Verificado por busca em todo o repositório.
- O `CONTEXTO_APEX.md` citado no prompt desta sessão não existe neste repositório; o contexto
  foi recuperado de `README.md` e deste `CHANGELOG.md`.

---

## [1.0.0] — 2026-08-19

Primeira versão do site institucional da Apex Security. Projeto criado do zero, sem dependência
de código do dashboard.

### Adicionado

**Infraestrutura**
- Projeto React 18 + Vite 5, sem roteador — página única com âncoras de scroll suave
- `framer-motion` para scroll-reveal e transição do mega-menu
- Sistema de design em `src/styles/global.css`: paleta dourada sobre preto profundo,
  tipografia `Sora` (display) + `Inter` (corpo), tokens de layout e componentes base
- `src/data/site.js` como fonte única de conteúdo (módulos, planos, fundadores, endpoints)

**Navbar**
- Pílula flutuante central com `backdrop-filter: blur(12px)`, borda dourada sutil e sombra
- Logo oficial à esquerda; botão "Ver Demonstração" à direita apontando para o dashboard
- Mega-menu que abre no hover de "Plataforma", em grid de 2 colunas com os 6 módulos comerciais,
  transição de opacidade + deslocamento vertical (~200ms)
- Menu hambúrguer abaixo de 768px, com trava de scroll do body e fechamento por `Esc`

**Hero**
- Headline em duas cores com "impacto financeiro:" em gradiente dourado
- Elemento assinatura `GoldSwoosh`: trilhas de luz em curvas Bézier com stroke em gradiente,
  em três camadas (glow difuso, fios nítidos e horizonte luminoso), convergindo logo acima
  da fileira de cards
- Dois CTAs (preenchido → dashboard; contorno → scroll até Preços)
- Fileira de 4 cards de destaque
- Frame estilizado de navegador com a screenshot real do dashboard em produção

**Seções**
- **Plataforma** — os 6 módulos (Apex Scan, Shield, Fix, Risk, Pulse, Radar) e bloco dedicado ao
  human-in-the-loop
- **Como Funciona** — timeline vertical numerada com as 8 etapas do fluxo, do push ao risco
  financeiro calculado
- **Preços** — Starter / Pro / Enterprise, com o plano Pro destacado e badge "Mais Popular"
- **Sobre** — texto de missão e três cards de fundadores com avatar de iniciais
- **Contato** — formulário com `POST` direto para a API já existente do dashboard
  (`/api/contact`), com estados de envio, sucesso e erro
- **Footer** — logo, links rápidos, módulos, redes sociais e link "Acessar Plataforma"

**Acessibilidade e responsividade**
- Skip link, foco de teclado visível, `aria-expanded`/`aria-haspopup` no mega-menu
- Feedback do formulário anunciado por `role="status"` + `aria-live="polite"`
- `prefers-reduced-motion` respeitado em todas as animações e no scroll suave
- Layout responsivo até 375px, sem overflow horizontal

**Assets**
- Logo oficial com margens transparentes recortadas
- Screenshot do dashboard recortada para remover a marca d'água do sistema

### Notas técnicas

- `global.css` é importado antes de `App.jsx` em `main.jsx`. O Vite emite CSS na ordem dos
  imports e regras de componente têm a mesma especificidade dos utilitários globais — inverter
  a ordem quebra overrides responsivos silenciosamente.
- O mega-menu recebe `x: '-50%'` via framer-motion em vez de `transform: translateX(-50%)` no
  CSS: o framer escreve `transform` inline e apagaria a centralização declarada em folha.

### Pendências (placeholders marcados com `TODO` no código)

- Fotos e bios definitivas dos fundadores
- URLs reais das redes sociais no footer
