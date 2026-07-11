import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProductStore } from './productStore'
import * as productApi from '../api/products'
import type { Product } from '../types'

vi.mock('../api/products')

const sampleProducts: Product[] = [
  { id: 1, name: 'Produit A', category: 'Test', price: 10, stock: 50, lowStockThreshold: 20, soldLast7Days: 5 },
  { id: 2, name: 'Produit B', category: 'Test', price: 20, stock: 5, lowStockThreshold: 10, soldLast7Days: 8 },
]

describe('productStore', () => {
  let store: ReturnType<typeof useProductStore>

  beforeEach(async () => {
    vi.mocked(productApi.fetchProducts).mockResolvedValue([...sampleProducts])
    store = useProductStore()
    await store.loadProducts()
  })

  it('charge les produits depuis l\'API', () => {
    expect(store.products.length).toBe(2)
  })

  it('ajoute un nouveau produit', async () => {
    const newProduct = { name: 'Produit C', category: 'Test', price: 5, stock: 30, lowStockThreshold: 10, soldLast7Days: 0 }
    const createdProduct = { id: 3, ...newProduct }
    vi.mocked(productApi.createProduct).mockResolvedValue(createdProduct)

    const countBefore = store.products.length
    await store.addProduct(newProduct)
    expect(store.products.length).toBe(countBefore + 1)
  })

  it('modifie un produit existant', async () => {
    const modifiedProduct = { ...sampleProducts[0], name: 'Nom modifié' }
    vi.mocked(productApi.updateProduct).mockResolvedValue(modifiedProduct)

    
    await store.updateProduct(modifiedProduct)
    const updated = store.products.find((product) => product.id === modifiedProduct.id)
    expect(updated?.name).toBe('Nom modifié')
  })

  it('supprime un produit', async () => {
    const firstProduct = store.products[0]
    vi.mocked(productApi.deleteProduct).mockResolvedValue(undefined)

    await store.deleteProduct(firstProduct.id)
    const stillExists = store.products.some((product) => product.id === firstProduct.id)
    expect(stillExists).toBe(false)
  })
})