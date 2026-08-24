/**
 * Fonte unica de verdade para conteudo do site.
 * Toda a copy sobre o produto reflete modulos que existem de fato na
 * plataforma Apex Security — nao adicionar capacidades ficticias aqui.
 */

/* Fotos dos fundadores. Importadas (e nao referenciadas por caminho em
   /public) para que o Vite as processe: hash no nome do arquivo e cache
   longo garantido no deploy. */
import muriloPhoto from '../assets/founders/murilo-carlucci.jpg'
import guilhermePhoto from '../assets/founders/guilherme-catto.jpg'
import miguelPhoto from '../assets/founders/miguel-domingos.jpg'

/** URL publica do dashboard/produto (projeto separado, ja em producao). */
export const DASHBOARD_URL = 'https://apex-security-delta.vercel.app'

/** Backend de contato reaproveitado do dashboard — nao existe backend proprio neste site. */
export const CONTACT_ENDPOINT = 'https://apex-security-api.onrender.com/api/contact'

/** Modulos da plataforma — alimentam o mega-menu e a secao Plataforma. */
export const MODULES = [
  {
    id: 'scan',
    name: 'Apex Scan',
    icon: 'scan',
    short: 'Análise estática (SAST) e detecção de secrets em cada push',
    long: 'Varredura estática em cada push com Semgrep e Trivy, normalizando a saída de qualquer scanner em um formato único (ASU) para priorização por contexto.'
  },
  {
    id: 'shield',
    name: 'Apex Shield',
    icon: 'shield',
    short: 'Ofuscação de dados sensíveis antes de qualquer envio à IA',
    long: 'DLP de borda que detecta e ofusca segredos — chaves, tokens e senhas — antes que qualquer dado deixe a rede do cliente.'
  },
  {
    id: 'fix',
    name: 'Apex Fix',
    icon: 'fix',
    short: 'Geração autônoma de correções e Pull Requests via IA',
    long: 'Gera o patch corrigido e o teste automaticamente e abre um Pull Request. A revisão humana é sempre obrigatória — a IA nunca faz merge sozinha.'
  },
  {
    id: 'risk',
    name: 'Apex Risk',
    icon: 'risk',
    short: 'Quantificação financeira FAIR e cálculo de prazo SLA',
    long: 'Traduz cada vulnerabilidade em impacto financeiro real (R$) usando FAIR, blast radius e exigências de LGPD, com prazo de compliance calculado.'
  },
  {
    id: 'pulse',
    name: 'Apex Pulse',
    icon: 'pulse',
    short: 'Detecção estatística de anomalias com Machine Learning',
    long: 'Machine Learning estatístico (Isolation Forest) identificando comportamentos fora do padrão no seu ciclo de desenvolvimento.'
  },
  {
    id: 'radar',
    name: 'Apex Radar',
    icon: 'radar',
    short: 'Inteligência preditiva de ameaças do seu setor em tempo real',
    long: 'Panorama executivo das ameaças que realmente importam para o setor da sua empresa, atualizado continuamente.'
  }
]

/** Cards de destaque do hero — textos exatamente como na referência visual. */
export const HERO_FEATURES = [
  {
    icon: 'shieldCheck',
    title: 'Proteção em Tempo Real',
    text: 'Monitore e proteja seu código 24/7 com inteligência contínua.'
  },
  {
    icon: 'bolt',
    title: 'Remediação Automática',
    text: 'Corrija vulnerabilidades automaticamente via PR.'
  },
  {
    icon: 'bars',
    title: 'Risco Financeiro',
    text: 'Quantifique o impacto real e priorize o que importa.'
  },
  {
    icon: 'code',
    title: 'Dev-Friendly',
    text: 'Integração nativa com seu workflow e ferramentas.'
  }
]

/** Fluxo sequencial real da plataforma — a ordem importa. */
export const PIPELINE = [
  {
    title: 'Push no repositório',
    text: 'O desenvolvedor envia o código normalmente. Nenhuma mudança no workflow existente.'
  },
  {
    title: 'Scan automático',
    text: 'Semgrep e Trivy rodam na pipeline CI/CD a cada commit, sem intervenção manual.'
  },
  {
    title: 'Normalização e priorização',
    text: 'O formato ASU unifica a saída de qualquer scanner e ordena os achados por contexto real.'
  },
  {
    title: 'DLP protege segredos',
    text: 'O Apex Shield ofusca chaves e dados sensíveis antes de qualquer envio externo.'
  },
  {
    title: 'IA gera patch + teste',
    text: 'O Apex Fix produz a correção e o teste automatizado que comprova o resultado.'
  },
  {
    title: 'Pull Request aberto',
    text: 'A correção chega como PR no seu repositório, com contexto completo do achado.'
  },
  {
    title: 'Revisão humana',
    text: 'Ninguém faz merge por você. A aprovação final é sempre de um engenheiro do time.'
  },
  {
    title: 'Risco financeiro calculado',
    text: 'O Apex Risk traduz o achado em impacto em reais e prazo de compliance.'
  }
]

/** Planos comerciais. */
export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Free / Open-Source',
    price: 'Grátis',
    priceNote: 'para sempre',
    features: [
      'Até 3 repositórios',
      'Varreduras ilimitadas',
      'Normalização ASU e priorização por contexto',
      'Comunidade e documentação aberta'
    ],
    cta: { label: 'Começar Grátis', href: null, external: true },
    featured: false
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Empresas',
    price: 'Sob consulta',
    priceNote: 'por organização',
    features: [
      'Tudo do Starter',
      'Análise de Risco Financeiro (Apex Risk — FAIR/LGPD/SLA)',
      'Notificações via Discord',
      'IA dedicada com maior limite de requisições',
      'Suporte prioritário'
    ],
    cta: { label: 'Falar com Vendas', href: '#contato', external: false },
    featured: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Custom',
    price: 'Personalizado',
    priceNote: 'por contrato',
    features: [
      'Tudo do Pro',
      'SLA customizado por contrato',
      'Suporte dedicado com gerente de conta',
      'Compliance reporting avançado',
      'Onboarding assistido'
    ],
    cta: { label: 'Contatar Time Enterprise', href: '#contato', external: false },
    featured: false
  }
]

/**
 * Fundadores. As `initials` seguem como fallback caso alguma foto falhe
 * ao carregar.
 */
export const FOUNDERS = [
  {
    name: 'Murilo Carlucci',
    initials: 'MC',
    role: 'Desenvolvedor',
    bio: 'Desenvolvedor full-stack e cibersegurança, responsável pela arquitetura central, automação e pela engenharia dos motores analíticos da plataforma ASPM.',
    photo: muriloPhoto
  },
  {
    name: 'Guilherme Catto',
    initials: 'GC',
    role: 'Desenvolvedor',
    bio: 'Desenvolvedor focado em engenharia de backend e automação, construindo pipelines escaláveis e garantindo a resiliência operacional da plataforma.',
    photo: guilhermePhoto
  },
  {
    name: 'Miguel Domingos',
    initials: 'MD',
    role: 'Desenvolvedor',
    bio: 'Desenvolvedor voltado a Application Security (AppSec), integrando práticas de código seguro, mapeamento de falhas e conformidade contínua no ecossistema.',
    photo: miguelPhoto
  }
]

/** Ancoras do navbar e do footer. */
export const NAV_LINKS = [
  { label: 'Plataforma', href: '#plataforma', hasMenu: true },
  { label: 'Como Funciona', href: '#como-funciona', hasMenu: false },
  { label: 'Preços', href: '#precos', hasMenu: false },
  { label: 'Sobre', href: '#sobre', hasMenu: false },
  { label: 'Contato', href: '#contato', hasMenu: false }
]
