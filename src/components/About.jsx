import Reveal from './Reveal.jsx'
import { FOUNDERS } from '../data/site.js'
import './About.css'

export default function About() {
  return (
    <section className="section" id="sobre">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Sobre</span>
          <h2 className="section__title">
            Segurança não deveria ser um <span className="gold-text">privilégio</span>
          </h2>
        </Reveal>

        <Reveal className="mission" delay={0.05}>
          <p className="mission__text">
            A Apex Security nasceu da convicção de que segurança não deveria ser um privilégio de
            grandes corporações com orçamentos ilimitados. Acreditamos em democratizar a segurança
            de aplicações — tornando proteção de nível empresarial acessível, automática e
            compreensível para qualquer time de desenvolvimento, independente do tamanho.
          </p>
        </Reveal>

        <ul className="founders">
          {FOUNDERS.map((person, i) => (
            <Reveal as="li" className="card founder" key={person.name} delay={0.1 + i * 0.08}>
              <div className="founder__avatar">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={`Retrato de ${person.name}`}
                    width="88"
                    height="88"
                    loading="lazy"
                  />
                ) : (
                  <span className="founder__initials" aria-hidden="true">
                    {person.initials}
                  </span>
                )}
              </div>

              <h3 className="founder__name">{person.name}</h3>
              <p className="founder__role">{person.role}</p>
              <p className="founder__bio">{person.bio}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
