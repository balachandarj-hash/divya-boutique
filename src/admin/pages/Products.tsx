import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, PRODUCTS } from '../../data/catalog'
import { asset } from '../../lib/asset'
import { useAdmin } from '../AdminState'
import DataTable from '../components/DataTable'
import StatusBadge from '../components/StatusBadge'
import { inr } from '../lib/format'
import type { ProductStatus } from '../data/mock'

export default function Products() {
  const { inventory, notify } = useAdmin()
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const [cat, setCat] = useState('all')
  const [status, setStatus] = useState('all')

  const rows = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const inv = inventory.find((i) => i.productId === p.id)
      const needle = q.trim().toLowerCase()
      if (needle && !`${p.name} ${p.category} ${inv?.sku ?? ''}`.toLowerCase().includes(needle)) return false
      if (cat !== 'all' && p.category !== cat) return false
      if (status !== 'all' && inv?.status !== status) return false
      return true
    })
  }, [q, cat, status, inventory])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or SKU"
          className="rounded-xl border border-line bg-white px-3 py-2 text-sm outline-none"
        />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-xl border border-line bg-white px-3 py-2 text-sm">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-line bg-white px-3 py-2 text-sm">
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="hidden">Hidden</option>
        </select>
      </div>
      <DataTable columns={['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status', '']} empty={rows.length ? undefined : 'No products match.'}>
        {rows.map((product) => {
          const inv = inventory.find((i) => i.productId === product.id)
          return (
            <tr key={product.id}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={asset(product.images[0])} alt="" className="h-12 w-10 rounded-lg object-cover" />
                  <span className="font-medium">{product.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-muted">{inv?.sku}</td>
              <td className="px-4 py-3 capitalize">{product.category}</td>
              <td className="px-4 py-3">{inr(product.price)}</td>
              <td className="px-4 py-3">{inv?.stock}</td>
              <td className="px-4 py-3">
                <StatusBadge status={(inv?.status ?? 'active') as ProductStatus} />
              </td>
              <td className="px-4 py-3">
                <button
                  type="button"
                  className="text-sm text-rose hover:underline"
                  onClick={() => notify('Saved locally — catalog file is unchanged')}
                >
                  Edit
                </button>
              </td>
            </tr>
          )
        })}
      </DataTable>
    </div>
  )
}
