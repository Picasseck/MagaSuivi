import { reactive } from 'vue'
import type { Product } from '../types'
import { products as initialProducts } from '../data/products'

interface ProductStore {
  items: Product[]
}

const store = reactive<ProductStore>({
  items: [...initialProducts],
})

function generateId(): number {
  const existingIds = store.items.map((product) => product.id)
  return existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1
}

export function useProductStore() {
  function addProduct(newProduct: Omit<Product, 'id'>) {
    store.items.push({ id: generateId(), ...newProduct })
  }

  function updateProduct(updatedProduct: Product) {
    const index = store.items.findIndex((product) => product.id === updatedProduct.id)
    if (index !== -1) {
      store.items[index] = updatedProduct
    }
  }

  function deleteProduct(productId: number) {
    const index = store.items.findIndex((product) => product.id === productId)
    if (index !== -1) {
      store.items.splice(index, 1)
    }
  }

  return {
    products: store.items,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}