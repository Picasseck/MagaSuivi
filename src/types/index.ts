export interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  lowStockThreshold: number
  soldLast7Days: number
}

export interface Sale {
  id: number
  productId: number
  productName: string
  category: string
  quantity: number
  total: number
  date: string
}

export type StockLevel = 'ok' | 'low' | 'out'