import { createRouter, createWebHistory } from 'vue-router'

import LandingPageView from '@/views/LandingPageView.vue'
import CommunityView from '@/views/CommunityView.vue'
import PublicationsView from '@/views/PublicationsView.vue'
import ResourcesView from '@/views/ResourcesView.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPageView
  },
  {
    path: '/Community',
    name: 'Community',
    component: CommunityView
  },
  {
    path: '/Publications',
    name: 'Publications',
    component: PublicationsView
  },
  {
    path: '/Resources',
    name: 'Resources',
    component: ResourcesView
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
