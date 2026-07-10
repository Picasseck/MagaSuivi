<script setup lang="ts">
import { computed } from 'vue'
import { products } from '../data/products'
import { getStockAlerts, getStockLevel } from '../utils/stock'

const alerts = computed(() => getStockAlerts(products))
</script>

<template>
  <div class="card">
    <div class="panel-head">
      <h2>Alertes de stock</h2>
    </div>
    <ul class="alert-list">
      <li v-for="product in alerts" :key="product.id" class="alert-row">
        <span class="alert-dot" :class="getStockLevel(product) === 'out' ? 'dot-danger' : 'dot-warn'"></span>
        <div class="alert-info">
          <div class="alert-name">{{ product.name }}</div>
          <div class="alert-meta">{{ product.category }} · réf. {{ product.id }}</div>
        </div>
        <span
          class="alert-badge"
          :class="getStockLevel(product) === 'out' ? 'badge-danger' : 'badge-warn'"
        >
          {{ getStockLevel(product) === 'out' ? 'Rupture' : `Stock bas · ${product.stock}` }}
        </span>
      </li>
    </ul>
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

.alert-list {
  padding: 6px 18px;
}

.alert-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid var(--line);
}

.alert-row:last-child {
  border-bottom: none;
}

.alert-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-danger { background: var(--danger); }
.dot-warn { background: var(--warn); }

.alert-info {
  flex: 1;
  min-width: 0;
}

.alert-name {
  font-weight: 600;
  font-size: 13.5px;
}

.alert-meta {
  font-size: 12px;
  color: var(--ink-soft);
}

.alert-badge {
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 6px;
}

.badge-danger { background: var(--danger-soft); color: var(--danger); }
.badge-warn { background: var(--warn-soft); color: var(--warn); }
</style>