import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'wallet-dashboard',
      component: () => import('@/views/WalletDashboard/WalletDashboard.vue')
    },
    {
      path: '/address/:id',
      name: 'address-details',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AddressDetails/AddressDetails.vue')
    }
  ]
})

export default router
