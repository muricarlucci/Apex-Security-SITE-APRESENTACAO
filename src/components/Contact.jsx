import { useState } from 'react'
import Icon from './Icons.jsx'
import Reveal from './Reveal.jsx'
import { CONTACT_ENDPOINT } from '../data/site.js'
import './Contact.css'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [feedback, setFeedback] = useState('')

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    if (status === 'error' || status === 'success') setStatus('idle')
  }

  /**
   * Envia direto para o backend ja existente e em producao do dashboard.
   * Este site nao tem backend proprio — o payload segue exatamente o
   * mesmo formato { name, email, subject, message } que o dashboard usa.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setFeedback('')

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim()
        })
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setStatus('success')
      setFeedback('Mensagem enviada. Nosso time responde em até um dia útil.')
      setForm(EMPTY)
    } catch (err) {
      setStatus('error')
      setFeedback(
        'Não conseguimos enviar sua mensagem agora. Tente novamente em instantes ou escreva direto para contato@apexsecurity.com.br.'
      )
    }
  }

  const sending = status === 'sending'

  return (
    <section className="section section--alt" id="contato">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Contato</span>
          <h2 className="section__title">
            Vamos conversar sobre o <span className="gold-text">seu código</span>
          </h2>
          <p className="section__subtitle">
            Dúvidas técnicas, orçamento ou uma demonstração guiada — conte o que você precisa.
          </p>
        </Reveal>

        <Reveal className="card contact" delay={0.05}>
          <form className="contact__form" onSubmit={handleSubmit} noValidate={false}>
            <div className="contact__row">
              <div className="field">
                <label className="field__label" htmlFor="contact-name">
                  Nome
                </label>
                <input
                  className="field__input"
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={update('name')}
                  disabled={sending}
                  required
                />
              </div>

              <div className="field">
                <label className="field__label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  className="field__input"
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@empresa.com"
                  value={form.email}
                  onChange={update('email')}
                  disabled={sending}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-subject">
                Assunto
              </label>
              <input
                className="field__input"
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Sobre o que você quer falar?"
                value={form.subject}
                onChange={update('subject')}
                disabled={sending}
                required
              />
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-message">
                Mensagem
              </label>
              <textarea
                className="field__input field__input--area"
                id="contact-message"
                name="message"
                rows="6"
                placeholder="Descreva seu cenário, stack e o que você espera da Apex Security."
                value={form.message}
                onChange={update('message')}
                disabled={sending}
                required
              />
            </div>

            <div className="contact__actions">
              <button className="btn btn--primary" type="submit" disabled={sending}>
                {sending ? (
                  <>
                    <Icon name="spinner" size={18} className="contact__spinner" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar
                    <Icon name="arrow" size={18} />
                  </>
                )}
              </button>

              <p className="contact__hint">
                <Icon name="mail" size={15} />
                Respondemos em até um dia útil.
              </p>
            </div>

            {/* Feedback acessivel: leitores de tela anunciam a mudanca */}
            <p
              className={`contact__feedback contact__feedback--${status}`}
              role="status"
              aria-live="polite"
            >
              {feedback}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
