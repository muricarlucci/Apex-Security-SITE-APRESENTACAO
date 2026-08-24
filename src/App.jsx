import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Platform from './components/Platform.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Pricing from './components/Pricing.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

/**
 * Site institucional da Apex Security — pagina unica com ancoras de scroll
 * suave. Sem roteador: nenhuma secao justifica URL propria neste momento.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="conteudo">
        <Hero />
        <Platform />
        <HowItWorks />
        <Pricing />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
