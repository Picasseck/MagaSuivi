<script setup lang="ts">
import { computed } from 'vue'
import { products } from '../data/products'
import { formatPrice, getStockLevel } from '../utils/stock'

const topProducts = computed(() =>
  [...products]
    .sort((a, b) => b.soldLast7Days - a.soldLast7Days)
    .slice(0, 6),
)

const stockLabel = {
  ok: (stock: number) => `${stock} en stock`,
  low: (stock: number) => `${stock} en stock`,
  out: () => 'Rupture',
}
</script>

<template>
  <div class="card">
    <div class="panel-head">
      <h2>Produits les plus vendus</h2>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Vendus (7j)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in topProducts" :key="product.id">
            <td class="prod-name">{{ product.name }}</td>
            <td class="prod-cat">{{ product.category }}</td>
            <td class="price">{{ formatPrice(product.price) }}</td>
            <td>{{ product.soldLast7Days }}</td>
            <td>
              <span class="stock-pill" :class="`pill-${getStockLevel(product)}`">
                {{ stockLabel[getStockLevel(product)](product.stock) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.panel-head {
  padding: 16px 18px;
  border-bottom: 1px solid var(--line);
}

.panel-head h2 {
  font-size: 15px;
  font-weight: 700;
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
  padding: 11px 14px;
  border-bottom: 1px solid var(--line);
  background: #fafbfc;
}

tbody td {
  padding: 13px 14px;
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
</style>