import type { Product } from '../types'

const API_URL = 'http://localhost:3000/api/products'

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Erreur lors du chargement des produits.')
  }
  return response.json()
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<Product> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error('Erreur lors de la création du produit.')
  }
  return response.json()
}

export async function updateProduct(product: Product): Promise<Product> {
  const response = await fetch(`${API_URL}/${product.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error('Erreur lors de la modification du produit.')
  }
  return response.json()
}

export async function deleteProduct(productId: number): Promise<void> {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Erreur lors de la suppression du produit.')
  }
}