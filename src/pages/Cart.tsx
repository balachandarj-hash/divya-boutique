import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useStore, productFor } from '../context/Store'
import { asset, inr } from '../lib/asset'

export default function Cart() {
  const { cart, setQty, removeFromCart, cartSubtotal } = useStore()
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState('')
  const shipping = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 79
  const discount = applied === 'DIVYA10' ? Math.round(cartSubtotal * 0.1) : applied === 'FESTIVE15' ? Math.round(cartSubtotal * 0.15) : 0
  const total = Math.max(0, cartSubtotal - discount + shipping)

  function applyPromo() {
    const next = code.trim().toUpperCase()
    if (next === 'DIVYA10' || next === 'FESTIVE15') setApplied(next)
    else setApplied('invalid')
  }

  if (cart.length === 0) {
    return (
      <div className="empty">
        <h1>Your bag is empty</h1>
        <p>New arrivals are waiting — sarees, kurtis, western and kids.</p>
        <Link to="/shop" className="btn btn-rose" style={{ marginTop: 18 }}>
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="wrap">
      <p className="crumbs">
        <Link to="/">Home</Link> / Bag
      </p>
      <h1 style={{ fontSize: 36, marginBottom: 18 }}>Your bag</h1>
      <div className="cart-layout">
        <div>
          {cart.map((line) => {
            const p = productFor(line.productId)
            if (!p) return null
            return (
              <div key={`${line.productId}-${line.size}-${line.color}`} className="line">
                <Link to={`/product/${p.slug}`}>
                  <img src={asset(p.images[0])} alt="" />
                </Link>
                <div>
                  <Link to={`/product/${p.slug}`}>
                    <strong>{p.name}</strong>
                  </Link>
                  <p className="meta-line">
                    {line.color} · {line.size}
                  </p>
                  <p>{inr(p.price)}</p>
                  <div className="qty" style={{ marginTop: 8 }}>
                    <button type="button" onClick={() => setQty(line.productId, line.size, line.color, line.qty - 1)}>
                      −
                    </button>
                    <span>{line.qty}</span>
                    <button type="button" onClick={() => setQty(line.productId, line.size, line.color, line.qty + 1)}>
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    style={{ marginTop: 8, padding: '6px 10px' }}
                    onClick={() => removeFromCart(line.productId, line.size, line.color)}
                  >
                    Remove
                  </button>
                </div>
                <strong>{inr(p.price * line.qty)}</strong>
              </div>
            )
          })}
        </div>
        <aside className="summary">
          <h2 style={{ fontFamily: 'var(--sans)', fontSize: 18, marginBottom: 8 }}>Order summary</h2>
          <div className="promo">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Promo code"
              aria-label="Promo code"
            />
            <button type="button" className="btn btn-ghost" onClick={applyPromo}>
              Apply
            </button>
          </div>
          {applied === 'invalid' ? <p className="meta-line">Code not recognised. Try DIVYA10.</p> : null}
          {applied === 'DIVYA10' || applied === 'FESTIVE15' ? (
            <p className="meta-line">Code {applied} applied.</p>
          ) : null}
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
          <Link to={`/checkout?promo=${applied && applied !== 'invalid' ? applied : ''}`} className="btn btn-rose btn-full" style={{ marginTop: 16 }}>
            Checkout
          </Link>
          <p className="meta-line" style={{ marginTop: 10 }}>
            Demo checkout — no real payment is taken.
          </p>
        </aside>
      </div>
    </div>
  )
}
