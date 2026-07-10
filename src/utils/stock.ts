import type { Product, StockLevel } from '../types'

export function getStockLevel(product: Product): StockLevel {
  if (product.stock === 0) return 'out'
  if (product.stock <= product.lowStockThreshold) return 'low'
  return 'ok'
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function getStockAlerts(products: Product[]): Product[] {
  return products.filter((product) => getStockLevel(product) !== 'ok')
}

export function applyDiscount(price: number, discountPercent: number): number {
  return price * (1 - discountPercent / 100)
}