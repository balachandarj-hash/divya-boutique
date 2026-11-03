import { CATEGORIES, COLLECTIONS } from '../../data/catalog'
import { asset } from '../../lib/asset'
import { categoryCounts, collectionCounts } from '../data/mock'

export default function Categories() {
  const cats = categoryCounts()
  const cols = collectionCounts()

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg">Shop categories</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cats.map((c) => {
            const meta = CATEGORIES.find((x) => x.id === c.id)
            return (
              <article key={c.id} className="overflow-hidden rounded-2xl border border-line bg-white">
                <img src={asset(meta?.image ?? '')} alt="" className="h-36 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-lg">{c.label}</h3>
                  <p className="text-sm text-muted">{c.count} products</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-lg">Collections</h2>
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-line bg-blush/60 text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Collection</th>
                <th className="px-4 py-3 font-medium">Products</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {cols.map((c) => {
                const meta = COLLECTIONS.find((x) => x.id === c.id)
                return (
                  <tr key={c.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{c.label}</p>
                      <p className="text-xs text-muted">{meta?.blurb}</p>
                    </td>
                    <td className="px-4 py-3">{c.count}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
