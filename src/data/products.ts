import type { Product } from '../types'

export const products: Product[] = [
  { id: 1, name: 'Pain de campagne', category: 'Boulangerie', price: 2.40, stock: 142, lowStockThreshold: 20, soldLast7Days: 418 },
  { id: 2, name: 'Bananes (kg)', category: 'Fruits & légumes', price: 1.95, stock: 88, lowStockThreshold: 25, soldLast7Days: 376 },
  { id: 3, name: 'Lait demi-écrémé 1L', category: 'Crèmerie', price: 0.89, stock: 0, lowStockThreshold: 30, soldLast7Days: 295 },
  { id: 4, name: 'Café moulu 250g', category: 'Épicerie', price: 3.45, stock: 0, lowStockThreshold: 15, soldLast7Days: 212 },
  { id: 5, name: 'Pâtes penne 500g', category: 'Épicerie', price: 1.15, stock: 6, lowStockThreshold: 20, soldLast7Days: 187 },
  { id: 6, name: 'Eau minérale 6x1,5L', category: 'Boissons', price: 2.70, stock: 11, lowStockThreshold: 20, soldLast7Days: 164 },
  { id: 7, name: 'Yaourt nature x8', category: 'Crèmerie', price: 1.60, stock: 9, lowStockThreshold: 15, soldLast7Days: 143 },
  { id: 8, name: 'Jus d\'orange 1L', category: 'Boissons', price: 1.85, stock: 54, lowStockThreshold: 20, soldLast7Days: 128 },
  { id: 9, name: 'Pommes Gala (kg)', category: 'Fruits & légumes', price: 2.25, stock: 67, lowStockThreshold: 25, soldLast7Days: 119 },
  { id: 10, name: 'Beurre doux 250g', category: 'Crèmerie', price: 2.10, stock: 43, lowStockThreshold: 15, soldLast7Days: 102 },
  { id: 11, name: 'Farine T55 1kg', category: 'Épicerie', price: 0.95, stock: 78, lowStockThreshold: 20, soldLast7Days: 87 },
  { id: 12, name: 'Œufs frais x12', category: 'Crèmerie', price: 3.20, stock: 31, lowStockThreshold: 20, soldLast7Days: 76 },
]