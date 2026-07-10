<script setup lang="ts">
import { ref, computed } from 'vue'
import Topbar from '../components/Topbar.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import { products } from '../data/products'
import { formatPrice, getStockLevel } from '../utils/stock'

const search = ref('')
const activeCategory = ref('Toutes')

const categories = computed(() => {
  const unique = [...new Set(products.map((product) => product.category))]
  return ['Toutes', ...unique]
})

const filteredProducts = computed(() => {
  return products.filter((product) => {
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
                    </tr>
                    </tbody>
                </table>

                <p v-if="filteredProducts.length === 0" class="empty">
                    Aucun produit ne correspond à votre recherche.
                </p>
                </div>
            </div>
        </div>
  </div>
</template>