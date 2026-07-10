<script setup lang="ts">
import { ref, computed } from 'vue'
import Topbar from '../components/Topbar.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductForm from '../components/ProductForm.vue'
import { useProductStore } from '../stores/productStore'
import { formatPrice, getStockLevel } from '../utils/stock'
import type { Product } from '../types'

const productStore = useProductStore()

const search = ref('')
const activeCategory = ref('Toutes')
const isFormOpen = ref(false)
const productToEdit = ref<Product | null>(null)

const categories = computed(() => {
  const unique = [...new Set(productStore.products.map((product) => product.category))]
  return ['Toutes', ...unique]
})

const filteredProducts = computed(() => {
  return productStore.products.filter((product) => {
    const matchesCategory =
      activeCategory.value === 'Toutes' || product.category === activeCategory.value
    const matchesSearch = product.name.toLowerCase().includes(search.value.toLowerCase())
    return matchesCategory && matchesSearch
  })
})

const stockText = {
  ok: (stock: number) => `${stock} en stock`,
  low: (stock: number) => `${stock} en stock`,
  out: () => 'Rupture',
}

function openCreateForm() {
  productToEdit.value = null
  isFormOpen.value = true
}

function openEditForm(product: Product) {
  productToEdit.value = product
  isFormOpen.value = true
}

function closeForm() {
  isFormOpen.value = false
  productToEdit.value = null
}

function handleSave(product: Product | Omit<Product, 'id'>) {
  if ('id' in product) {
    productStore.updateProduct(product)
  } else {
    productStore.addProduct(product)
  }
  closeForm()
}

function handleDelete(product: Product) {
  const confirmed = window.confirm(`Supprimer « ${product.name} » ?`)
  if (confirmed) {
    productStore.deleteProduct(product.id)
  }
}
</script>

<template>
    <div>
        <Topbar title="Produits & stock" subtitle="Gérez votre catalogue et vos niveaux de stock" />
        <div class="page">
            <div class="toolbar">
                <div class="toolbar-search">
                <SearchBar v-model="search" placeholder="Rechercher un produit…" />
                </div>
                <CategoryFilter v-model="activeCategory" :categories="categories" />
                <button class="button-primary" @click="openCreateForm">+ Nouveau produit</button>
            </div>

            <div class="card">
                <div class="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Catégorie</th>
                        <th>Prix</th>
                        <th>Stock</th>
                        <th>Statut</th>
                        <th class="actions-col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="product in filteredProducts" :key="product.id">
                        <td class="prod-name">{{ product.name }}</td>
                        <td class="prod-cat">{{ product.category }}</td>
                        <td class="price">{{ formatPrice(product.price) }}</td>
                        <td>{{ product.stock }}</td>
                        <td>
                        <span class="stock-pill" :class="`pill-${getStockLevel(product)}`">
                            {{ stockText[getStockLevel(product)](product.stock) }}
                        </span>
                        </td>
                        <td>
                            <div class="row-actions">
                                <button class="action-link" @click="openEditForm(product)">Modifier</button>
                                <button class="action-link danger" @click="handleDelete(product)">Supprimer</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <p v-if="filteredProducts.length === 0" class="empty">
                    Aucun produit ne correspond à votre recherche.
                </p>
                </div>
            </div>
        </div>
        <ProductForm
            v-if="isFormOpen"
            :product-to-edit="productToEdit"
            @save="handleSave"
            @close="closeForm"
        />
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.toolbar-search {
  width: 280px;
  max-width: 100%;
}

.button-primary {
  padding: 9px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13.5px;
  background: var(--brand);
  color: #fff;
  margin-left: auto;
}

.button-primary:hover {
  opacity: 0.92;
}

.table-wrap {
  overflow-x: auto;
}

thead th {
  text-align: left;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--ink-soft);
  font-weight: 600;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
  background: #fafbfc;
}

.actions-col {
  text-align: right;
}

tbody td {
  padding: 13px 16px;
  border-bottom: 1px solid var(--line);
  font-size: 13.5px;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: var(--bg);
}

.prod-name {
  font-weight: 600;
}

.prod-cat {
  color: var(--ink-soft);
  font-size: 12.5px;
}

.price {
  font-weight: 700;
}

.stock-pill {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  display: inline-block;
}

.pill-ok { background: var(--ok-soft); color: var(--ok); }
.pill-low { background: var(--warn-soft); color: var(--warn); }
.pill-out { background: var(--danger-soft); color: var(--danger); }

.row-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.action-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--brand);
}

.action-link:hover {
  text-decoration: underline;
}

.action-link.danger {
  color: var(--danger);
}

.empty {
  padding: 40px;
  text-align: center;
  color: var(--ink-soft);
  font-size: 14px;
}
</style>