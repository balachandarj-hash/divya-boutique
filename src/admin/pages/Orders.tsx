import { useMemo, useState } from 'react'
import { useAdmin } from '../AdminState'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import { formatDate, inr, paymentLabel } from '../lib/format'
import type { ShopOrderStatus } from '../../lib/shopDb'
import { asset } from '../../lib/asset'

const STATUSES: ShopOrderStatus[] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export default function Orders() {
  const { orders, setOrderStatus } = useAdmin()
  const [status, setStatus] = useState('all')
  const rows = useMemo(
    () => (status === 'all' ? orders : orders.filter((o) => o.status === status)),
    [orders, status],
  )

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">Orders placed on the shop (WhatsApp checkout). Not demo rows.</p>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-line bg-white px-3 py-2 text-sm">
        <option value="all">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <DataTable
        columns={['Order', 'Customer', 'Products', 'City', 'Payment', 'Total', 'Status']}
        empty={rows.length ? undefined : 'No shop orders yet.'}
      >
        {rows.map((order) => (
          <tr key={order.id}>
            <td className="px-4 py-3">
              <p className="font-medium">{order.id}</p>
              <p className="text-xs text-muted">{formatDate(order.createdAt)}</p>
            </td>
            <td className="px-4 py-3">
              <p>{order.customerName}</p>
              <p className="text-xs text-muted">{order.email || '—'}</p>
              <p className="text-xs text-muted">{order.phone || '—'}</p>
            </td>
            <td className="px-4 py-3">
              <ul className="space-y-1">
                {order.items.map((item) => (
                  <li key={`${item.productId}-${item.size}`} className="flex items-center gap-2">
                    <img src={asset(item.image)} alt="" className="h-10 w-8 rounded object-cover" />
                    <span className="text-xs">
                      {item.name} × {item.qty}
                    </span>
                  </li>
                ))}
              </ul>
            </td>
            <td className="px-4 py-3">{order.city}</td>
            <td className="px-4 py-3">{paymentLabel(order.payment as 'upi' | 'cod' | 'card')}</td>
            <td className="px-4 py-3">{inr(order.total)}</td>
            <td className="px-4 py-3">
              <div className="flex flex-col gap-2">
                <StatusBadge status={order.status} />
                <select
                  value={order.status}
                  onChange={(e) => setOrderStatus(order.id, e.target.value as ShopOrderStatus)}
                  className="rounded-lg border border-line px-2 py-1 text-xs"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  )
}
