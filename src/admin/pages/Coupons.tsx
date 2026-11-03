import { useAdmin } from '../AdminState'
import DataTable from '../components/DataTable'

export default function Coupons() {
  const { coupons, toggleCoupon } = useAdmin()

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">
        DIVYA10 and FESTIVE15 already work on storefront checkout. FIRST500 is admin-only mock and does not change the shop.
      </p>
      <DataTable columns={['Code', 'Offer', 'Used', 'On shop', 'Status', '']}>
        {coupons.map((c) => (
          <tr key={c.id}>
            <td className="px-4 py-3 font-medium">{c.code}</td>
            <td className="px-4 py-3">
              {c.type === 'percent' ? `${c.value}% off` : `₹${c.value} off`}
              <p className="text-xs text-muted">{c.note}</p>
            </td>
            <td className="px-4 py-3">{c.used}</td>
            <td className="px-4 py-3">{c.appliesOnShop ? 'Yes' : 'No'}</td>
            <td className="px-4 py-3">{c.active ? 'Active' : 'Paused'}</td>
            <td className="px-4 py-3">
              <button type="button" className="text-sm text-rose hover:underline" onClick={() => toggleCoupon(c.id)}>
                {c.active ? 'Pause' : 'Activate'}
              </button>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  )
}
