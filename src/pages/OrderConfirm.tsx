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
          ? `Thank you, ${order.name}. Your order ${inr(order.total)} is noted for ${order.city}.`
          : 'Your Divya Boutique order has been placed.'}
      </p>
      <p className="meta-line">
        WhatsApp opened with the order confirmation for +91 96885 63463. Tap Send so the boutique receives it and can arrange delivery.
      </p>
      <Link to="/shop" className="btn btn-rose" style={{ marginTop: 22 }}>
        Keep shopping
      </Link>
    </div>
  )
}
