import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/produits',
      name: 'products',
      component: () => import('../views/Products.vue'),
    },
    {
      path: '/ventes',
      name: 'sales',
      component: () => import('../views/Sales.vue'),
    },
    {
      path: '/soldes',
      name: 'promotions',
      component: () => import('../views/Promotions.vue'),
    },
  ],
})

export default router