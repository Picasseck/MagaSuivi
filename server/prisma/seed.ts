import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  { name: 'Pain de campagne', category: 'Boulangerie', price: 2.40, stock: 142, lowStockThreshold: 20, soldLast7Days: 418 },
  { name: 'Bananes (kg)', category: 'Fruits & légumes', price: 1.95, stock: 88, lowStockThreshold: 25, soldLast7Days: 376 },
  { name: 'Lait demi-écrémé 1L', category: 'Crèmerie', price: 0.89, stock: 0, lowStockThreshold: 30, soldLast7Days: 295 },
  { name: 'Café moulu 250g', category: 'Épicerie', price: 3.45, stock: 0, lowStockThreshold: 15, soldLast7Days: 212 },
  { name: 'Pâtes penne 500g', category: 'Épicerie', price: 1.15, stock: 6, lowStockThreshold: 20, soldLast7Days: 187 },
  { name: 'Eau minérale 6x1,5L', category: 'Boissons', price: 2.70, stock: 11, lowStockThreshold: 20, soldLast7Days: 164 },
  { name: 'Yaourt nature x8', category: 'Crèmerie', price: 1.60, stock: 9, lowStockThreshold: 15, soldLast7Days: 143 },
  { name: 'Jus d\'orange 1L', category: 'Boissons', price: 1.85, stock: 54, lowStockThreshold: 20, soldLast7Days: 128 },
  { name: 'Pommes Gala (kg)', category: 'Fruits & légumes', price: 2.25, stock: 67, lowStockThreshold: 25, soldLast7Days: 119 },
  { name: 'Beurre doux 250g', category: 'Crèmerie', price: 2.10, stock: 43, lowStockThreshold: 15, soldLast7Days: 102 },
  { name: 'Farine T55 1kg', category: 'Épicerie', price: 0.95, stock: 78, lowStockThreshold: 20, soldLast7Days: 87 },
  { name: 'Œufs frais x12', category: 'Crèmerie', price: 3.20, stock: 31, lowStockThreshold: 20, soldLast7Days: 76 },
]

async function main() {
  await prisma.product.deleteMany()
  await prisma.product.createMany({ data: products })
  console.log('Base de données remplie avec succès.')
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })