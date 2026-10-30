import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useStore } from '../context/Store'

export default function Footer() {
  const { notify } = useStore()
  const [email, setEmail] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    notify('You are on the list for new drops')
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo />
            <p>
              Indian ethnic and western wear for women and kids — crafted in small batches, shipped
              across India.
            </p>
            <p>Kallagam, Trichy District, Tamil Nadu, India – 621 653</p>
            <p>
              <a href="tel:+919688563463">+91 96885 63463</a> ·{' '}
              <a href="mailto:divyasellam2003@gmail.com">divyasellam2003@gmail.com</a>
            </p>
            <p>Monday to Sunday · 10:00 am – 10:30 pm</p>
          </div>
          <div>
            <h4>Shop</h4>
            <Link to="/shop/sarees">Sarees</Link>
            <Link to="/shop/kurtis">Kurtis</Link>
            <Link to="/shop/western">Western Wear</Link>
            <Link to="/shop/kids">Kids Wear</Link>
            <Link to="/shop?new=1">New Arrivals</Link>
          </div>
          <div>
            <h4>House</h4>
            <Link to="/about">Our story</Link>
            <Link to="/collections">Collections</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/account">Account</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>
          <div>
            <h4>Newsletter</h4>
            <p>New weaves, drop dates and 10% off your first order.</p>
            <form className="newsletter" onSubmit={onSubmit}>
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button className="btn btn-rose" type="submit">
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="legal">
          <span>© {new Date().getFullYear()} Divya Boutique. All rights reserved.</span>
          <span>Prices in INR · Free shipping on orders ₹999+ · Easy 7-day returns</span>
        </div>
      </div>
    </footer>
  )
}
