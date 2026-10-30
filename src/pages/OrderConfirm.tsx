import { Link, useLocation, useParams } from 'react-router-dom'
import type { Order } from '../context/Store'
import { inr } from '../lib/asset'

export default function OrderConfirm() {
  const { id } = useParams()
  const order = useLocation().state as Order | null

  return (
    <div className="success">
      <p className="eyebrow" style={{ color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Thank you
      </p>
      <h1 style={{ fontSize: 36, margin: '10px 0 12px' }}>Order {id} is in</h1>
      <p>
        {order
          ? `We have packed a note for ${order.name} in ${order.city}. Pay by ${order.payment.toUpperCase()} · ${inr(order.total)}.`
          : 'Your Divya Boutique order has been placed. A confirmation will arrive by email.'}
      </p>
      <p className="meta-line">Demo store — nothing will be charged or shipped.</p>
      <Link to="/shop" className="btn btn-rose" style={{ marginTop: 22 }}>
        Keep shopping
      </Link>
    </div>
  )
}
