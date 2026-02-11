import { createRouter, createWebHistory } from 'vue-router'

import StudyModeView from '@/views/StudyModeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'study',
      component: StudyModeView
    },
    {
      path: '/cards',
      name: 'cards',
      component: () => import('../views/AllCardsView.vue'),
    }
  ]
})

export default router
