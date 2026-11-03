import type { LucideIcon } from 'lucide-react'

export default function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
}) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-[0_10px_28px_rgba(80,40,30,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
          <p className="mt-2 font-serif text-3xl text-ink">{value}</p>
          {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-soft text-rose">
          <Icon size={20} />
        </span>
      </div>
    </article>
  )
}
