import { assertAdmin } from './auth'
import {
  customersFromShop,
  getSettings,
  listAbandonedCarts,
  listActiveCarts,
  listShopOrders,
  saveSettings,
  updateShopOrderStatus,
  type AdminSettings,
  type ShopOrderStatus,
} from '../lib/shopDb'

/** Staff-only reads/writes. Customer bag updates go through Store + shopDb, not here. */
export function adminListActiveCarts() {
  assertAdmin()
  return listActiveCarts()
}

export function adminListAbandonedCarts() {
  assertAdmin()
  return listAbandonedCarts()
}

export function adminListOrders() {
  assertAdmin()
  return listShopOrders()
}

export function adminListCustomers() {
  assertAdmin()
  return customersFromShop()
}

export function adminGetSettings() {
  assertAdmin()
  return getSettings()
}

export function adminSaveSettings(next: AdminSettings) {
  assertAdmin()
  saveSettings(next)
}

export function adminUpdateOrderStatus(id: string, status: ShopOrderStatus) {
  assertAdmin()
  updateShopOrderStatus(id, status)
}
