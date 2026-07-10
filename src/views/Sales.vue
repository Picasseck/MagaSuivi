<script setup lang="ts">
import { ref, computed } from 'vue'
import Topbar from '../components/Topbar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import { sales } from '../data/sales'
import { formatPrice } from '../utils/stock'
import { formatDate } from '../utils/format'

const activeCategory = ref('Toutes')

const categories = computed(() => {
  const unique = [...new Set(sales.map((sale) => sale.category))]
  return ['Toutes', ...unique]
})

const filteredSales = computed(() => {
  if (activeCategory.value === 'Toutes') return sales
  return sales.filter((sale) => sale.category === activeCategory.value)
})

const totalRevenue = computed(() => {
  return filteredSales.value.reduce((sum, sale) => sum + sale.total, 0)
})

const totalItems = computed(() => {
  return filteredSales.value.reduce((sum, sale) => sum + sale.quantity, 0)
})
</script>

<template>
    <div>
     <Topbar title="Ventes" subtitle="Historique des ventes du magasin" />
        <div class="page">
            <div class="summary">
                <div class="summary-item">
                    <span class="summary-label">Chiffre d'affaires</span>
                    <span class="summary-value">{{ formatPrice(totalRevenue) }}</span>
                </div>
                <div class="summary-divider"></div>
                <div class="summary-item">
                    <span class="summary-label">Articles vendus</span>
                    <span class="summary-value">{{ totalItems }}</span>
                </div>
                <div class="summary-divider"></div>
                <div class="summary-item">
                    <span class="summary-label">Transactions</span>
                    <span class="summary-value">{{ filteredSales.length }}</span>
                </div>
            </div>

            <div class="filter-bar">
                <CategoryFilter v-model="activeCategory" :categories="categories" />
            </div>

            <div class="card">
                <div class="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Produit</th>
                        <th>Catégorie</th>
                        <th>Quantité</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="sale in filteredSales" :key="sale.id">
                        <td class="date-cell">{{ formatDate(sale.date) }}</td>
                        <td class="prod-name">{{ sale.productName }}</td>
                        <td class="prod-cat">{{ sale.category }}</td>
                        <td>{{ sale.quantity }}</td>
                        <td class="total">{{ formatPrice(sale.total) }}</td>
                    </tr>
                    </tbody>
                </table>

                <p v-if="filteredSales.length === 0" class="empty">
                    Aucune vente pour cette catégorie.
                </p>
            </div>
        </div>
     </div>
    </div>
</template>

<style scoped>
.summary {
  display: flex;
  align-items: center;
  gap: 28px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px 26px;
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-label {
  font-size: 12.5px;
  color: var(--ink-soft);
  font-weight: 500;
}

.summary-value {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.4px;
}

.summary-divider {
  width: 1px;
  height: 38px;
  background: var(--line);
}

.filter-bar {
  margin-bottom: 20px;
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

.date-cell {
  color: var(--ink-soft);
}

.prod-name {
  font-weight: 600;
}

.prod-cat {
  color: var(--ink-soft);
  font-size: 12.5px;
}

.total {
  font-weight: 700;
}

.empty {
  padding: 40px;
  text-align: center;
  color: var(--ink-soft);
  font-size: 14px;
}
</style>