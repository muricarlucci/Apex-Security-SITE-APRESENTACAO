import { motion, useReducedMotion } from 'framer-motion'
import GoldSwoosh from './GoldSwoosh.jsx'
import Icon from './Icons.jsx'
import { DASHBOARD_URL, HERO_FEATURES } from '../data/site.js'
import './Hero.css'

/* Screenshot real do dashboard em producao.
   TODO: substituir /public/dashboard-preview.png quando houver uma
   captura mais recente da plataforma. */
const DASHBOARD_SHOT = '/dashboard-preview.png'

export default function Hero() {
  const reduced = useReducedMotion()

  /* Entrada escalonada dos blocos do hero */
  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }
        }

  return (
    <section className="hero" id="topo">
      <div className="container hero__inner">
        {/* O palco delimita ate onde as trilhas douradas se estendem:
            elas convergem no horizonte logo acima da fileira de cards. */}
        <div className="hero__stage">
          <GoldSwoosh />

          {/* -------------------------- Headline ------------------------- */}
          <motion.h1 className="hero__title" {...rise(0.05)}>
            Da linha de código ao{' '}
            <span className="hero__title-accent">impacto financeiro:</span> proteja seu software em
            tempo real.
          </motion.h1>

          <motion.p className="hero__subtitle" {...rise(0.15)}>
            Conecte seus repositórios, receba os alertas, quantifique o risco real para a sua
            empresa e aplique remediações automáticas via Pull Request em segundos.
          </motion.p>

          {/* ---------------------------- CTAs --------------------------- */}
          <motion.div className="hero__ctas" {...rise(0.25)}>
            <a
              className="btn btn--primary"
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Demonstração
              <Icon name="arrow" size={18} />
            </a>
            <a className="btn btn--ghost" href="#precos">
              Veja os planos
              <Icon name="arrow" size={18} />
            </a>
          </motion.div>
        </div>

        {/* ------------------------ Cards de destaque -------------------- */}
        <motion.ul className="hero__features" {...rise(0.35)}>
          {HERO_FEATURES.map((feature) => (
            <li className="hero__feature" key={feature.title}>
              <span className="hero__feature-icon">
                <Icon name={feature.icon} size={26} />
              </span>
              <div className="hero__feature-text">
                <h2 className="hero__feature-title">{feature.title}</h2>
                <p className="hero__feature-desc">{feature.text}</p>
              </div>
            </li>
          ))}
        </motion.ul>

        {/* ---------------------- Preview do dashboard ------------------- */}
        <motion.div className="hero__preview" {...rise(0.45)}>
          <div className="hero__frame">
            <div className="hero__frame-bar" aria-hidden="true">
              <span className="hero__dot" />
              <span className="hero__dot" />
              <span className="hero__dot" />
              <span className="hero__frame-url">apex-security-delta.vercel.app</span>
            </div>

            <a
              className="hero__frame-shot"
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir a plataforma Apex Security em nova aba"
            >
              <img
                src={DASHBOARD_SHOT}
                alt="Painel de controle da Apex Security exibindo total de alertas, distribuição por severidade e alertas recentes"
                width="1918"
                height="800"
                loading="lazy"
              />
              <span className="hero__frame-overlay">
                Abrir plataforma
                <Icon name="external" size={16} />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
