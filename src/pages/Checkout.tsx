import { FormEvent, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '../context/Store'
import { inr } from '../lib/asset'

const STATES = [
  'Tamil Nadu',
  'Karnataka',
  'Maharashtra',
  'Delhi',
  'Telangana',
  'Kerala',
  'West Bengal',
  'Gujarat',
  'Rajasthan',
  'Uttar Pradesh',
]

export default function Checkout() {
  const { cart, cartSubtotal, placeOrder, user } = useStore()
  const [params] = useSearchParams()
  const promo = params.get('promo') ?? ''
  const navigate = useNavigate()
  const [payment, setPayment] = useState('upi')

  const shipping = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 79
  const discount =
    promo === 'ANISHA10' ? Math.round(cartSubtotal * 0.1) : promo === 'FESTIVE15' ? Math.round(cartSubtotal * 0.15) : 0
  const total = Math.max(0, cartSubtotal - discount + shipping)

  if (cart.length === 0) {
    return (
      <div className="empty">
        <h1>Nothing to check out</h1>
        <Link to="/shop" className="btn btn-rose" style={{ marginTop: 16 }}>
          Shop new arrivals
        </Link>
      </div>
    )
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const order = placeOrder({
      name: String(data.get('name') || ''),
      city: String(data.get('city') || ''),
      payment,
      total,
    })
    navigate(`/order/${order.id}`, { state: order })
  }

  return (
    <div className="wrap">
      <p className="crumbs">
        <Link to="/cart">Bag</Link> / Checkout
      </p>
      <h1 style={{ fontSize: 36, marginBottom: 18 }}>Checkout</h1>
      <form className="checkout-layout" onSubmit={onSubmit}>
        <div className="card">
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 18, marginBottom: 16 }}>Shipping</h2>
          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" required defaultValue={user?.name ?? ''} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required defaultValue={user?.email ?? ''} />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" required placeholder="10-digit mobile" />
          </div>
          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" rows={3} required />
          </div>
          <div className="field">
            <label htmlFor="city">City</label>
            <input id="city" name="city" required />
          </div>
          <div className="field">
            <label htmlFor="state">State</label>
            <select id="state" name="state" required defaultValue="Tamil Nadu">
              {STATES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="pin">PIN code</label>
            <input id="pin" name="pin" required />
          </div>
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 18, margin: '18px 0 12px' }}>Payment</h2>
          {[
            ['upi', 'UPI (GPay / PhonePe / Paytm)'],
            ['card', 'Credit or debit card'],
            ['cod', 'Cash on delivery'],
          ].map(([id, label]) => (
            <label key={id} style={{ display: 'flex', gap: 8, margin: '8px 0', cursor: 'pointer' }}>
              <input type="radio" name="pay" checked={payment === id} onChange={() => setPayment(id)} />
              {label}
            </label>
          ))}
          <p className="meta-line">This is a demo boutique. No payment is processed.</p>
        </div>
        <aside className="summary">
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 18 }}>Pay {inr(total)}</h2>
          <div className="row">
            <span>Subtotal</span>
            <span>{inr(cartSubtotal)}</span>
          </div>
          <div className="row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : inr(shipping)}</span>
          </div>
          {discount > 0 ? (
            <div className="row">
              <span>Discount</span>
              <span>−{inr(discount)}</span>
            </div>
          ) : null}
          <div className="row total">
            <span>Total</span>
            <span>{inr(total)}</span>
          </div>
          <button type="submit" className="btn btn-rose btn-full" style={{ marginTop: 16 }}>
            Place order
          </button>
        </aside>
      </form>
    </div>
  )
}
