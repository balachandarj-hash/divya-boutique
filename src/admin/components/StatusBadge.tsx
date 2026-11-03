import type { OrderStatus, ProductStatus } from '../data/mock'
import { statusLabel } from '../lib/format'

const TONE: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-800',
  confirmed: 'bg-sky-50 text-sky-800',
  shipped: 'bg-indigo-50 text-indigo-800',
  delivered: 'bg-emerald-50 text-emerald-800',
  cancelled: 'bg-rose-50 text-rose-700',
  active: 'bg-emerald-50 text-emerald-800',
  draft: 'bg-amber-50 text-amber-800',
  hidden: 'bg-zinc-100 text-zinc-600',
}

export default function StatusBadge({ status }: { status: OrderStatus | ProductStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${TONE[status] ?? 'bg-zinc-100'}`}>
      {statusLabel(status)}
    </span>
  )
}
