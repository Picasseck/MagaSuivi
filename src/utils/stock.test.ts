import { describe, it, expect } from 'vitest'
import { getStockLevel, formatPrice, getStockAlerts, applyDiscount } from './stock'
import type { Product } from '../types'

function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    name: 'Produit test',
    category: 'Test',
    price: 10,
    stock: 50,
    lowStockThreshold: 20,
    soldLast7Days: 0,
    ...overrides,
  }
}

describe('getStockLevel', () => {
  it('retourne "out" quand le stock est à zéro', () => {
    const product = makeProduct({ stock: 0 })
    expect(getStockLevel(product)).toBe('out')
  })

  it('retourne "low" quand le stock est sous le seuil', () => {
    const product = makeProduct({ stock: 10, lowStockThreshold: 20 })
    expect(getStockLevel(product)).toBe('low')
  })

  it('retourne "ok" quand le stock est suffisant', () => {
    const product = makeProduct({ stock: 50, lowStockThreshold: 20 })
    expect(getStockLevel(product)).toBe('ok')
  })
})

describe('formatPrice', () => {
  it('formate un montant en euros', () => {
    expect(formatPrice(10)).toContain('10')
    expect(formatPrice(10)).toContain('€')
  })
})

describe('getStockAlerts', () => {
  it('retourne uniquement les produits en rupture ou stock bas', () => {
    const products = [
      makeProduct({ id: 1, stock: 50 }),
      makeProduct({ id: 2, stock: 0 }),
      makeProduct({ id: 3, stock: 5, lowStockThreshold: 20 }),
    ]
    const alerts = getStockAlerts(products)
    expect(alerts.length).toBe(2)
  })
})

describe('applyDiscount', () => {
  it('applique correctement une remise', () => {
    expect(applyDiscount(10, 20)).toBe(8)
  })

  it('retourne le prix inchangé avec une remise de zéro', () => {
    expect(applyDiscount(10, 0)).toBe(10)
  })
})