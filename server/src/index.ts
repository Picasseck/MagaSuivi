import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/api/products', async (request, response) => {
  const products = await prisma.product.findMany({
    orderBy: { id: 'asc' },
  })
  response.json(products)
})

app.get('/api/products/:id', async (request, response) => {
  const id = Number(request.params.id)
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) {
    response.status(404).json({ error: 'Produit introuvable.' })
    return
  }

  response.json(product)
})

app.post('/api/products', async (request, response) => {
  const { name, category, price, stock, lowStockThreshold, soldLast7Days } = request.body

  const newProduct = await prisma.product.create({
    data: { name, category, price, stock, lowStockThreshold, soldLast7Days },
  })

  response.status(201).json(newProduct)
})

app.put('/api/products/:id', async (request, response) => {
  const id = Number(request.params.id)
  const { name, category, price, stock, lowStockThreshold, soldLast7Days } = request.body

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { name, category, price, stock, lowStockThreshold, soldLast7Days },
  })

  response.json(updatedProduct)
})

app.delete('/api/products/:id', async (request, response) => {
  const id = Number(request.params.id)

  await prisma.product.delete({
    where: { id },
  })

  response.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})