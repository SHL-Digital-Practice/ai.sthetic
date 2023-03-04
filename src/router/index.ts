import { createRouter, createWebHistory } from 'vue-router'
// import { ProjectView } from '../views/ProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('../views/ProjectView.vue')
    }
  ]
})

export default router
