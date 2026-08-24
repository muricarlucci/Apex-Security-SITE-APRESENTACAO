import Reveal from './Reveal.jsx'
import { PIPELINE } from '../data/site.js'
import './HowItWorks.css'

/**
 * Timeline numerada do fluxo real da plataforma.
 * A numeracao e intencional: a ordem das etapas importa de fato — cada
 * uma depende da anterior.
 */
export default function HowItWorks() {
  return (
    <section className="section" id="como-funciona">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Como funciona</span>
          <h2 className="section__title">
            Do push ao <span className="gold-text">risco quantificado</span>
          </h2>
          <p className="section__subtitle">
            Oito etapas que acontecem sozinhas a cada commit. Você só entra na sétima — para
            aprovar.
          </p>
        </Reveal>

        <ol className="flow">
          {PIPELINE.map((step, i) => (
            <Reveal as="li" className="flow__step" key={step.title} delay={i * 0.06}>
              <div className="flow__marker" aria-hidden="true">
                <span className="flow__number">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="flow__body">
                <h3 className="flow__title">{step.title}</h3>
                <p className="flow__text">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
