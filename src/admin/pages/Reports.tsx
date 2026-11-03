import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAdmin, monthlySales } from '../AdminState'
import { salesByCategory } from '../data/mock'
import { inr } from '../lib/format'

const RANGE: Record<string, number> = { '30': 1, '90': 3, '365': 12 }
const PIE = ['#c45b74', '#a07850', '#4a3b36', '#8a7872']

export default function Reports() {
  const { orders } = useAdmin()
  const [range, setRange] = useState('365')
  const months = RANGE[range] ?? 12
  const series = monthlySales.slice(-months)
  const byCategory = salesByCategory(orders)
  const byStatus = useMemo(() => {
    const map = new Map<string, number>()
    for (const o of orders) map.set(o.status, (map.get(o.status) ?? 0) + 1)
    return [...map.entries()].map(([name, value]) => ({ name, value }))
  }, [orders])

  function exportCsv() {
    const header = 'id,date,customer,city,status,total\n'
    const body = orders
      .map((o) => `${o.id},${o.createdAt},${o.customerName},${o.city},${o.status},${o.total}`)
      .join('\n')
    const blob = new Blob([header + body], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'divya-boutique-orders.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {['30', '90', '365'].map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setRange(id)}
            className={`rounded-full px-3 py-1.5 text-sm ${range === id ? 'bg-ink text-white' : 'border border-line bg-white'}`}
          >
            {id === '365' ? '12 months' : `${id} days`}
          </button>
        ))}
        <button type="button" onClick={exportCsv} className="ml-auto rounded-xl bg-rose px-3 py-2 text-sm text-white hover:bg-rose-hover">
          Export orders CSV
        </button>
      </div>

      <section className="rounded-2xl border border-line bg-white p-5">
        <h2 className="mb-4 text-lg">Revenue by month</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={series}>
              <CartesianGrid stroke="#eadfd6" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#8a7872', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8a7872', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value) => inr(Number(value))} contentStyle={{ borderRadius: 12, borderColor: '#eadfd6' }} />
              <Bar dataKey="revenue" fill="#c45b74" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="mb-4 text-lg">Sales by category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCategory}>
                <XAxis dataKey="name" tick={{ fill: '#8a7872', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(value) => inr(Number(value))} />
                <Bar dataKey="revenue" fill="#a07850" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="mb-4 text-lg">Orders by status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {byStatus.map((_, i) => (
                    <Cell key={i} fill={PIE[i % PIE.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  )
}
