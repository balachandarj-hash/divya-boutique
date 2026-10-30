import { FormEvent, useState } from 'react'
import { useStore } from '../context/Store'

export default function Contact() {
  const { notify } = useStore()
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
    notify('Message received — we will write back soon')
  }

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>Contact</h1>
          <p>Visit the atelier or send a note. We reply within one working day.</p>
        </div>
      </div>
      <div className="wrap contact-grid">
        <form className="card" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="cname">Name</label>
            <input id="cname" name="name" required />
          </div>
          <div className="field">
            <label htmlFor="cemail">Email</label>
            <input id="cemail" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="cmsg">Message</label>
            <textarea id="cmsg" name="message" rows={5} required />
          </div>
          <button type="submit" className="btn btn-rose">
            Send message
          </button>
          {sent ? <p className="meta-line">Thank you. We have your note.</p> : null}
        </form>
        <div className="card">
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 18 }}>Atelier</h2>
          <p className="meta-line">14, North Usman Road, T. Nagar, Chennai 600017</p>
          <p className="meta-line">hello@anishaboutique.in</p>
          <p className="meta-line">+91 44 4000 1288</p>
          <p className="meta-line">Tue–Sun · 11:00 am – 8:00 pm</p>
          <p className="meta-line">WhatsApp orders: +91 90000 11288</p>
        </div>
      </div>
    </>
  )
}
