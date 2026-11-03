import { Navigate, Route, Routes } from 'react-router-dom'
import './admin.css'
import { AdminProvider } from './AdminState'
import AdminLayout from './AdminLayout'
import RequireAdmin from './RequireAdmin'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import Inventory from './pages/Inventory'
import Customers from './pages/Customers'
import Coupons from './pages/Coupons'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/Login'
import ActiveCarts from './pages/ActiveCarts'
import AbandonedCarts from './pages/AbandonedCarts'

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        element={
          <RequireAdmin>
            <AdminProvider>
              <AdminLayout />
            </AdminProvider>
          </RequireAdmin>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<Orders />} />
        <Route path="carts" element={<ActiveCarts />} />
        <Route path="abandoned-carts" element={<AbandonedCarts />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="customers" element={<Customers />} />
        <Route path="coupons" element={<Coupons />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  )
}
