<script setup lang="ts">
import { computed } from 'vue'
import Topbar from '../components/Topbar.vue'
import KpiCard from '../components/KpiCard.vue'
import SalesChart from '../components/SalesChart.vue'
import StockAlerts from '../components/StockAlerts.vue'
import TopProducts from '../components/TopProducts.vue'
import { products } from '../data/products'
import { getStockAlerts } from '../utils/stock'

const totalProducts = computed(() => products.length)
const alertCount = computed(() => getStockAlerts(products).length)
</script>

<template>
    <div>
        <Topbar title="Tableau de bord" subtitle="Magasin Châteaucreux · Aujourd'hui" />
        <div class="page">
            <div class="kpi-grid">
                <KpiCard label="Chiffre d'affaires du jour" value="12 480 €" trend="+8,2 %" trend-type="up" variant="ok">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                </KpiCard>

                <KpiCard label="Ventes réalisées" value="327" trend="+3,1 %" trend-type="up" variant="brand">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                </svg>
                </KpiCard>

                <KpiCard label="Produits en stock" :value="String(totalProducts)" variant="warn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <path d="M3.3 7L12 12l8.7-5M12 22V12" />
                </svg>
                </KpiCard>

                <KpiCard label="Ruptures & stocks bas" :value="String(alertCount)" :trend="`${alertCount} alertes`" trend-type="down" variant="danger">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                </KpiCard>
            </div>

            <div class="dash-panels">
                <SalesChart />
                <StockAlerts />
            </div>

            <TopProducts />
            
        </div>
    </div>    
</template>