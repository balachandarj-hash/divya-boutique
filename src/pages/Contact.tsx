import { FormEvent, useState } from 'react'
import { useStore } from '../context/Store'
import { openStoreWhatsApp } from '../lib/whatsapp'

export default function Contact() {
  const { notify } = useStore()
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const message = String(data.get('message') || '').trim()
    openStoreWhatsApp(
      [
        'Divya Boutique enquiry',
        `Name: ${name}`,
        `Email: ${email}`,
        phone ? `Phone: ${phone}` : null,
        '',
        message,
      ]
        .filter((line) => line !== null)
        .join('\n'),
    )
    setSent(true)
    notify('Opening WhatsApp — send to complete your enquiry')
  }

  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <h1>Contact</h1>
          <p>Fill the form and your enquiry goes to +91 96885 63463 on WhatsApp.</p>
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
            <label htmlFor="cphone">Phone</label>
            <input id="cphone" name="phone" type="tel" inputMode="tel" placeholder="10-digit mobile" required />
          </div>
          <div className="field">
            <label htmlFor="cmsg">Message</label>
            <textarea id="cmsg" name="message" rows={5} required />
          </div>
          <button type="submit" className="btn btn-rose">
            Send enquiry on WhatsApp
          </button>
          {sent ? (
            <p className="meta-line">WhatsApp opened with your message. Tap Send so we receive it on 96885 63463.</p>
          ) : null}
        </form>
        <div className="card">
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 18 }}>Atelier</h2>
          <p className="meta-line">Kallagam, Trichy District, Tamil Nadu, India – 621 653</p>
          <p className="meta-line">
            <a href="mailto:divyasellam2003@gmail.com">divyasellam2003@gmail.com</a>
          </p>
          <p className="meta-line">
            <a href="tel:+919688563463">+91 96885 63463</a>
          </p>
          <p className="meta-line">Monday to Sunday · 10:00 am – 10:30 pm</p>
          <p className="meta-line">
            WhatsApp:{' '}
            <a href="https://wa.me/919688563463" target="_blank" rel="noreferrer">
              +91 96885 63463
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
