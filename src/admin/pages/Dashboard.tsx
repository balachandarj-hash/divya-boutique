import { IndianRupee, Package, ShoppingBag, Users } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { PRODUCTS } from '../../data/catalog'
import { asset } from '../../lib/asset'
import { useAdmin, monthlySales, customersSeed } from '../AdminState'
import { topSellersFrom } from '../data/mock'
import StatCard from '../components/StatCard'
import StatusBadge from '../components/StatusBadge'
import { formatDate, inr } from '../lib/format'

export default function Dashboard() {
  const { orders, inventory } = useAdmin()
  const paid = orders.filter((o) => o.status !== 'cancelled')
  const revenue = paid.reduce((n, o) => n + o.total, 0)
  const recent = [...orders].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 8)
  const top = topSellersFrom(orders)
  const low = inventory.filter((row) => row.stock <= row.threshold)

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={inr(revenue)} hint="Paid mock orders" icon={IndianRupee} />
        <StatCard label="Total Orders" value={String(orders.length)} hint="Including cancelled" icon={ShoppingBag} />
        <StatCard label="Total Customers" value={String(customersSeed.length)} hint="Demo shoppers" icon={Users} />
        <StatCard label="Total Products" value={String(PRODUCTS.length)} hint="Live catalog count" icon={Package} />
      </div>

      <section className="rounded-2xl border border-line bg-white p-5 shadow-[0_10px_28px_rgba(80,40,30,0.06)]">
        <h2 className="mb-4 text-lg">Monthly sales</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlySales}>
              <CartesianGrid stroke="#eadfd6" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#8a7872', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8a7872', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip
                formatter={(value) => inr(Number(value))}
                contentStyle={{ borderRadius: 12, borderColor: '#eadfd6' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#c45b74" strokeWidth={2.5} dot={{ r: 3, fill: '#c45b74' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-line bg-white p-5">
          <h2 className="mb-4 text-lg">Recent orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="pb-2 font-medium">Order</th>
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Total</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recent.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3">
                      <p className="font-medium">{order.id}</p>
                      <p className="text-xs text-muted">{formatDate(order.createdAt)}</p>
                    </td>
                    <td className="py-3">{order.customerName}</td>
                    <td className="py-3">{inr(order.total)}</td>
                    <td className="py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-white p-5">
            <h2 className="mb-4 text-lg">Top selling products</h2>
            <ul className="space-y-3">
              {top.map((item) => {
                const product = PRODUCTS.find((p) => p.id === item.productId)
                return (
                  <li key={item.productId} className="flex items-center gap-3">
                    <img
                      src={asset(product?.images[0] ?? 'images/cat-saree.jpg')}
                      alt=""
                      className="h-12 w-10 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted">{item.units} sold</p>
                    </div>
                    <p className="text-sm">{inr(item.revenue)}</p>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h2 className="mb-4 text-lg">Low stock products</h2>
            <ul className="space-y-3">
              {low.map((row) => {
                const product = PRODUCTS.find((p) => p.id === row.productId)
                return (
                  <li key={row.productId} className="flex items-center justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate">{product?.name ?? row.productId}</span>
                    <span className="rounded-full bg-rose-soft px-2 py-0.5 text-xs text-rose">{row.stock} left</span>
                  </li>
                )
              })}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
