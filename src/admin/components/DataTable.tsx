import type { ReactNode } from 'react'

export default function DataTable({
  columns,
  children,
  empty,
}: {
  columns: string[]
  children: ReactNode
  empty?: string
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-line bg-blush/60 text-xs uppercase tracking-wider text-muted">
          <tr>
            {columns.map((col) => (
              <th key={col} className="whitespace-nowrap px-4 py-3 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
      {empty ? <p className="px-4 py-8 text-center text-sm text-muted">{empty}</p> : null}
    </div>
  )
}
