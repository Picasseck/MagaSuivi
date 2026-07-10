import { describe, it, expect, beforeEach } from 'vitest'
import { useProductStore } from './productStore'

describe('productStore', () => {
  let store: ReturnType<typeof useProductStore>

  beforeEach(() => {
    store = useProductStore()
  })

  it('contient des produits au démarrage', () => {
    expect(store.products.length).toBeGreaterThan(0)
  })

  it('ajoute un nouveau produit', () => {
    const countBefore = store.products.length
    store.addProduct({
      name: 'Nouveau produit',
      category: 'Test',
      price: 5,
      stock: 30,
      lowStockThreshold: 10,
      soldLast7Days: 0,
    })
    expect(store.products.length).toBe(countBefore + 1)
  })

  it('modifie un produit existant', () => {
    const firstProduct = store.products[0]
    store.updateProduct({ ...firstProduct, name: 'Nom modifié' })
    const updated = store.products.find((product) => product.id === firstProduct.id)
    expect(updated?.name).toBe('Nom modifié')
  })

  it('supprime un produit', () => {
    const firstProduct = store.products[0]
    store.deleteProduct(firstProduct.id)
    const stillExists = store.products.some((product) => product.id === firstProduct.id)
    expect(stillExists).toBe(false)
  })
})