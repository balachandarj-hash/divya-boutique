import { customersSeed } from '../AdminState'
import DataTable from '../components/DataTable'
import { formatDate, inr } from '../lib/format'

export default function Customers() {
  return (
    <DataTable columns={['Customer', 'Phone', 'City', 'Orders', 'Spent', 'Last order']}>
      {customersSeed.map((c) => (
        <tr key={c.id}>
          <td className="px-4 py-3">
            <p className="font-medium">{c.name}</p>
            {c.email ? <p className="text-xs text-muted">{c.email}</p> : null}
          </td>
          <td className="px-4 py-3">{c.phone}</td>
          <td className="px-4 py-3">{c.city}</td>
          <td className="px-4 py-3">{c.orders}</td>
          <td className="px-4 py-3">{inr(c.spent)}</td>
          <td className="px-4 py-3">{formatDate(c.lastOrderAt)}</td>
        </tr>
      ))}
    </DataTable>
  )
}
