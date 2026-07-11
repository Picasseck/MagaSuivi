import { reactive } from 'vue'
import type { Product } from '../types'
import * as productApi from '../api/products'

interface ProductStore {
  items: Product[]
  isLoading: boolean
  error: string | null
}

const store = reactive<ProductStore>({
  items: [],
  isLoading: false,
  error: null,
})



export function useProductStore() {

  async function loadProducts() {
    store.isLoading = true
    store.error = null
    try {
      const products = await productApi.fetchProducts()
      store.items.splice(0, store.items.length, ...products)
    } catch (error) {
      store.error = 'Impossible de charger les produits.'
    } finally {
      store.isLoading = false
    }
  }

  async function addProduct(newProduct: Omit<Product, 'id'>) {
    const created = await productApi.createProduct(newProduct)
    store.items.push(created)
  }

  async function updateProduct(updatedProduct: Product) {
    const saved = await productApi.updateProduct(updatedProduct)
    const index = store.items.findIndex((product) => product.id === saved.id)
    if (index !== -1) {
      store.items[index] = saved
    }
  }

  async function deleteProduct(productId: number) {
    await productApi.deleteProduct(productId)
    const index = store.items.findIndex((product) => product.id === productId)
    if (index !== -1) {
      store.items.splice(index, 1)
    }
  }

  return {
    store,
    products: store.items,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}