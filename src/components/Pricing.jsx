import Icon from './Icons.jsx'
import Reveal from './Reveal.jsx'
import { DASHBOARD_URL, PLANS } from '../data/site.js'
import './Pricing.css'

export default function Pricing() {
  return (
    <section className="section section--alt" id="precos">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Preços</span>
          <h2 className="section__title">
            Comece grátis, <span className="gold-text">cresça quando precisar</span>
          </h2>
          <p className="section__subtitle">
            A varredura e a priorização são gratuitas e ilimitadas. Você só paga quando quiser
            traduzir risco técnico em número de negócio.
          </p>
        </Reveal>

        <div className="plans">
          {PLANS.map((plan, i) => {
            const isExternal = plan.cta.external
            const href = isExternal ? DASHBOARD_URL : plan.cta.href

            return (
              <Reveal
                className={`card plan ${plan.featured ? 'plan--featured' : ''}`}
                key={plan.id}
                delay={i * 0.09}
              >
                {plan.featured && <span className="plan__badge">Mais Popular</span>}

                <header className="plan__head">
                  <h3 className="plan__name">{plan.name}</h3>
                  <p className="plan__tagline">{plan.tagline}</p>
                </header>

                <p className="plan__price">
                  {plan.price}
                  <span className="plan__price-note">{plan.priceNote}</span>
                </p>

                <hr className="rule" />

                <ul className="plan__features">
                  {plan.features.map((feature) => (
                    <li className="plan__feature" key={feature}>
                      <Icon name="check" size={17} className="plan__check" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  className={`btn btn--block ${plan.featured ? 'btn--primary' : 'btn--ghost'}`}
                  href={href}
                  {...(isExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {plan.cta.label}
                  <Icon name="arrow" size={17} />
                </a>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="plans__note" delay={0.15}>
          Todos os planos incluem revisão humana obrigatória antes de qualquer merge e ofuscação de
          segredos via Apex Shield.
        </Reveal>
      </div>
    </section>
  )
}
