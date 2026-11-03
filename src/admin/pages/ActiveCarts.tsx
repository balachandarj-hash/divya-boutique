import { asset } from '../../lib/asset'
import { useAdmin } from '../AdminState'
import DataTable from '../components/DataTable'
import { formatDateTime, inr } from '../lib/format'

export default function ActiveCarts() {
  const { carts, settings } = useAdmin()
  const rows = carts.active

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        Open bags updated in the last {settings.abandonedAfterHours} hours. Guest shoppers show until they sign in or check out.
      </p>
      <DataTable
        columns={['Customer', 'Email', 'Products', 'Qty', 'Price', 'Cart total', 'Updated']}
        empty={rows.length ? undefined : 'No active carts yet. Add a piece to the shop bag, then refresh this page.'}
      >
        {rows.map((cart) => (
          <tr key={cart.id}>
            <td className="px-4 py-3">
              <p className="font-medium">{cart.customerName}</p>
              <p className="text-xs text-muted">{cart.guest ? 'Guest' : 'Signed in'}</p>
            </td>
            <td className="px-4 py-3 text-muted">{cart.email || '—'}</td>
            <td className="px-4 py-3">
              <ul className="space-y-2">
                {cart.items.map((item) => (
                  <li key={`${item.productId}-${item.size}-${item.color}`} className="flex items-center gap-2">
                    <img src={asset(item.image)} alt="" className="h-12 w-10 rounded-lg object-cover" />
                    <span className="text-sm">
                      {item.name} × {item.qty}
                    </span>
                  </li>
                ))}
              </ul>
            </td>
            <td className="px-4 py-3">{cart.items.reduce((n, i) => n + i.qty, 0)}</td>
            <td className="px-4 py-3">
              {cart.items.map((item) => (
                <p key={`${item.productId}-${item.size}`}>{inr(item.price)}</p>
              ))}
            </td>
            <td className="px-4 py-3 font-medium">{inr(cart.total)}</td>
            <td className="px-4 py-3">{formatDateTime(cart.updatedAt)}</td>
          </tr>
        ))}
      </DataTable>
    </div>
  )
}
