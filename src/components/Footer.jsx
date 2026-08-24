import Icon from './Icons.jsx'
import { DASHBOARD_URL, MODULES, NAV_LINKS } from '../data/site.js'
import './Footer.css'

/* TODO: substituir por perfis reais quando as contas do grupo forem criadas. */
const SOCIALS = [
  { name: 'GitHub', icon: 'github', href: '#' },
  { name: 'LinkedIn', icon: 'linkedin', href: '#' },
  { name: 'Email', icon: 'mail', href: '#contato' }
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* ------------------------- Marca ------------------------- */}
        <div className="footer__brand">
          <a href="#topo" aria-label="Apex Security — voltar ao topo">
            <img
              className="footer__logo"
              src="/logo-apex.png"
              alt="Apex Security"
              width="170"
              height="52"
              loading="lazy"
            />
          </a>
          <p className="footer__tagline">
            Plataforma ASPM que detecta, prioriza e remedia vulnerabilidades de código — com
            revisão humana obrigatória em cada correção.
          </p>

          <ul className="footer__socials">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  className="footer__social"
                  href={social.href}
                  aria-label={social.name}
                  {...(social.href.startsWith('#')
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ----------------------- Navegação ----------------------- */}
        <nav className="footer__col" aria-label="Links rápidos">
          <h2 className="footer__title">Navegação</h2>
          <ul className="footer__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a className="footer__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ----------------------- Plataforma ---------------------- */}
        <nav className="footer__col" aria-label="Módulos da plataforma">
          <h2 className="footer__title">Plataforma</h2>
          <ul className="footer__links">
            {MODULES.map((mod) => (
              <li key={mod.id}>
                <a className="footer__link" href="#plataforma">
                  {mod.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container">
        <hr className="rule" />
        <div className="footer__bottom">
          <p className="footer__copy">© 2026 Apex Security. Todos os direitos reservados.</p>
          <a
            className="footer__platform"
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar Plataforma
            <Icon name="external" size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
