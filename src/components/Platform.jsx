import Icon from './Icons.jsx'
import Reveal from './Reveal.jsx'
import { MODULES } from '../data/site.js'
import './Platform.css'

/**
 * Secao "Plataforma" — destino da ancora do navbar e do mega-menu.
 * Apresenta os seis modulos reais da Apex Security.
 */
export default function Platform() {
  return (
    <section className="section section--alt" id="plataforma">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">A plataforma</span>
          <h2 className="section__title">
            Seis módulos, <span className="gold-text">um único fluxo</span> de segurança
          </h2>
          <p className="section__subtitle">
            Da varredura ao Pull Request revisado, cada etapa é coberta por um módulo especializado
            — e todos trabalham sobre o mesmo formato normalizado de dados.
          </p>
        </Reveal>

        <ul className="modules">
          {MODULES.map((mod, i) => (
            <Reveal as="li" className="card module" key={mod.id} delay={i * 0.07}>
              <span className="module__icon">
                <Icon name={mod.icon} size={24} />
              </span>
              <h3 className="module__name">{mod.name}</h3>
              <p className="module__short">{mod.short}</p>
              <hr className="rule module__rule" />
              <p className="module__long">{mod.long}</p>
            </Reveal>
          ))}
        </ul>

        {/* Human-in-the-loop: valor central da marca */}
        <Reveal className="hitl" delay={0.1}>
          <span className="hitl__icon">
            <Icon name="shieldCheck" size={28} />
          </span>
          <div>
            <h3 className="hitl__title">Human-in-the-loop, sempre</h3>
            <p className="hitl__text">
              A IA propõe, o time decide. Nenhuma alteração chega ao seu código sem que um
              engenheiro aprove o Pull Request — a automação acelera a correção, mas nunca substitui
              a revisão humana.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
