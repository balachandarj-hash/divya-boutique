import { useMemo, useState } from 'react'
import { useAdmin } from '../AdminState'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import { formatDate, inr, paymentLabel } from '../lib/format'
import type { OrderStatus } from '../data/mock'

const STATUSES: OrderStatus[] = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']

export default function Orders() {
  const { orders, setOrderStatus } = useAdmin()
  const [status, setStatus] = useState('all')
  const rows = useMemo(
    () => (status === 'all' ? orders : orders.filter((o) => o.status === status)),
    [orders, status],
  )

  return (
    <div className="space-y-4">
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-line bg-white px-3 py-2 text-sm">
        <option value="all">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <DataTable columns={['Order', 'Customer', 'City', 'Payment', 'Total', 'Status']}>
        {rows.map((order) => (
          <tr key={order.id}>
            <td className="px-4 py-3">
              <p className="font-medium">{order.id}</p>
              <p className="text-xs text-muted">{formatDate(order.createdAt)}</p>
              <p className="text-xs text-muted">{order.items.map((i) => `${i.name} × ${i.qty}`).join(', ')}</p>
            </td>
            <td className="px-4 py-3">
              <p>{order.customerName}</p>
              <p className="text-xs text-muted">{order.phone}</p>
            </td>
            <td className="px-4 py-3">{order.city}</td>
            <td className="px-4 py-3">{paymentLabel(order.payment)}</td>
            <td className="px-4 py-3">{inr(order.total)}</td>
            <td className="px-4 py-3">
              <div className="flex flex-col gap-2">
                <StatusBadge status={order.status} />
                <select
                  value={order.status}
                  onChange={(e) => setOrderStatus(order.id, e.target.value as OrderStatus)}
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
