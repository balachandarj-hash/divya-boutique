import { PRODUCTS } from '../../data/catalog'
import { useAdmin } from '../AdminState'
import DataTable from '../components/DataTable'

export default function Inventory() {
  const { inventory, adjustStock } = useAdmin()

  return (
    <DataTable columns={['SKU', 'Product', 'On hand', 'Reserved', 'Available', 'Threshold', 'Adjust']}>
      {inventory.map((row) => {
        const product = PRODUCTS.find((p) => p.id === row.productId)
        const available = Math.max(0, row.stock - row.reserved)
        const low = row.stock <= row.threshold
        return (
          <tr key={row.productId} className={low ? 'bg-rose-soft/40' : ''}>
            <td className="px-4 py-3 text-muted">{row.sku}</td>
            <td className="px-4 py-3 font-medium">{product?.name ?? row.productId}</td>
            <td className="px-4 py-3">{row.stock}</td>
            <td className="px-4 py-3">{row.reserved}</td>
            <td className="px-4 py-3">{available}</td>
            <td className="px-4 py-3">{row.threshold}</td>
            <td className="px-4 py-3">
              <div className="flex gap-2">
                <button type="button" className="rounded-lg border border-line px-2 py-1 text-sm" onClick={() => adjustStock(row.productId, -1)}>
                  −
                </button>
                <button type="button" className="rounded-lg border border-line px-2 py-1 text-sm" onClick={() => adjustStock(row.productId, 1)}>
                  +
                </button>
              </div>
            </td>
          </tr>
        )
      })}
    </DataTable>
  )
}
