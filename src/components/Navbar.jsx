import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Icon from './Icons.jsx'
import { DASHBOARD_URL, MODULES, NAV_LINKS } from '../data/site.js'
import './Navbar.css'

/* Logo oficial da Apex Security.
   TODO: substituir /public/logo-apex.png caso o time envie uma versao nova. */
const LOGO_SRC = '/logo-apex.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef(null)
  const reduced = useReducedMotion()

  /* Compacta a pilula depois dos primeiros pixels de scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Esc fecha qualquer painel aberto */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Trava o scroll do body enquanto o menu mobile estiver aberto */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  /* Pequeno atraso no fechamento: o ponteiro pode atravessar o vao
     entre o item do navbar e o painel sem que o menu pisque. */
  const openMega = () => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }

  const scheduleCloseMega = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140)
  }

  const megaTransition = reduced
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        {/* --------------------------- Marca --------------------------- */}
        <a className="nav__brand" href="#topo" aria-label="Apex Security — início">
          <img className="nav__logo" src={LOGO_SRC} alt="Apex Security" width="180" height="52" />
        </a>

        {/* ---------------------- Pilula flutuante --------------------- */}
        <nav className="nav__pill" aria-label="Navegação principal">
          {NAV_LINKS.map((link) =>
            link.hasMenu ? (
              <div
                key={link.href}
                className="nav__item nav__item--has-menu"
                onMouseEnter={openMega}
                onMouseLeave={scheduleCloseMega}
              >
                <a
                  className={`nav__link ${megaOpen ? 'is-active' : ''}`}
                  href={link.href}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  onFocus={openMega}
                  onClick={() => setMegaOpen(false)}
                >
                  {link.label}
                  <Icon name="chevron" size={15} className="nav__chevron" />
                </a>

                {/* ------------------- Mega-menu ------------------- */}
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      className="mega"
                      role="menu"
                      aria-label="Módulos da plataforma"
                      /* O `x: '-50%'` centraliza o painel sobre o item: o
                         framer-motion escreve `transform` inline e apagaria
                         um translateX vindo do CSS. */
                      initial={{ opacity: 0, x: '-50%', y: reduced ? 0 : -10 }}
                      animate={{ opacity: 1, x: '-50%', y: 0 }}
                      exit={{ opacity: 0, x: '-50%', y: reduced ? 0 : -10 }}
                      transition={megaTransition}
                      onMouseEnter={openMega}
                      onMouseLeave={scheduleCloseMega}
                    >
                      <div className="mega__grid">
                        {MODULES.map((mod) => (
                          <a
                            key={mod.id}
                            className="mega__item"
                            href="#plataforma"
                            role="menuitem"
                            onClick={() => setMegaOpen(false)}
                          >
                            <span className="mega__icon">
                              <Icon name={mod.icon} size={20} />
                            </span>
                            <span className="mega__text">
                              <strong className="mega__name">{mod.name}</strong>
                              <span className="mega__desc">{mod.short}</span>
                            </span>
                          </a>
                        ))}
                      </div>

                      <div className="mega__foot">
                        <span>
                          Revisão humana obrigatória em toda alteração de código — a IA nunca faz
                          merge sozinha.
                        </span>
                        <a
                          className="mega__foot-link"
                          href={DASHBOARD_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver a plataforma
                          <Icon name="external" size={14} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div key={link.href} className="nav__item">
                <a className="nav__link" href={link.href} onMouseEnter={scheduleCloseMega}>
                  {link.label}
                </a>
              </div>
            )
          )}
        </nav>

        {/* -------------------------- Acoes ---------------------------- */}
        <div className="nav__actions">
          <a
            className="btn btn--ghost btn--sm nav__cta"
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Demonstração
          </a>

          <button
            className="nav__burger"
            type="button"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {/* ------------------------ Menu mobile -------------------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={megaTransition}
          >
            <nav className="mobile__nav" aria-label="Navegação principal (mobile)">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  className="mobile__link"
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mobile__modules">
              <p className="mobile__label">Plataforma</p>
              {MODULES.map((mod) => (
                <a
                  key={mod.id}
                  className="mobile__module"
                  href="#plataforma"
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon name={mod.icon} size={18} />
                  <span>{mod.name}</span>
                </a>
              ))}
            </div>

            <a
              className="btn btn--primary btn--block"
              href={DASHBOARD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              Ver Demonstração
              <Icon name="arrow" size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
