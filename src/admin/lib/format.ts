import { inr } from '../../lib/asset'
import type { OrderStatus, Payment, ProductStatus } from '../data/mock'

export { inr }

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function statusLabel(status: OrderStatus | ProductStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export function paymentLabel(payment: Payment | string): string {
  if (payment === 'upi') return 'UPI'
  if (payment === 'cod') return 'Cash on delivery'
  if (payment === 'card') return 'Card'
  return payment
}
