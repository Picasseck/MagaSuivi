<script setup lang="ts">
import { ref, computed } from 'vue'
import Topbar from '../components/Topbar.vue'
import { useProductStore } from '../stores/productStore'
import { formatPrice, applyDiscount } from '../utils/stock'

const productStore = useProductStore()

const discountPercent = ref(10)
const selectedCategory = ref('Toutes')

const categories = computed(() => {
  const unique = [...new Set(productStore.products.map((product) => product.category))]
  return ['Toutes', ...unique]
})

const discountedProducts = computed(() => {
  const list =
    selectedCategory.value === 'Toutes'
      ? productStore.products
      : productStore.products.filter((product) => product.category === selectedCategory.value)

  return list.map((product) => ({
    ...product,
    discountedPrice: applyDiscount(product.price, discountPercent.value),
  }))
})
</script>

<template>
    <div>
        <Topbar title="Soldes & promotions" subtitle="Appliquez des remises sur vos produits" />
        <div class="page">
            <div class="controls card">
                <div class="control">
                    <label>Catégorie concernée</label>
                    <select v-model="selectedCategory">
                        <option v-for="category in categories" :key="category" :value="category">
                        {{ category }}
                        </option>
                    </select>
                </div>

                <div class="control">
                    <label>Remise appliquée : {{ discountPercent }} %</label>
                    <input v-model.number="discountPercent" type="range" min="0" max="70" step="5" />
                </div>
            </div>

            <div class="card">
                <div class="table-wrap">
                    <table>
                        <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Catégorie</th>
                            <th>Prix initial</th>
                            <th>Remise</th>
                            <th>Prix soldé</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="product in discountedProducts" :key="product.id">
                            <td class="prod-name">{{ product.name }}</td>
                            <td class="prod-cat">{{ product.category }}</td>
                            <td class="old-price">{{ formatPrice(product.price) }}</td>
                            <td>
                            <span class="discount-badge">−{{ discountPercent }} %</span>
                            </td>
                            <td class="new-price">{{ formatPrice(product.discountedPrice) }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>    
</template>