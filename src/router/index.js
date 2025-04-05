import { createRouter, createWebHistory } from 'vue-router'

import LandingPageView from '@/views/LandingPageView.vue'
import CommunityView from '@/views/CommunityView.vue'
import PublicationsView from '@/views/PublicationsView.vue'
import ResourcesView from '@/views/ResourcesView.vue'
import LoginView from '@/views/LoginView.vue'
import DonateView from '@/views/DonateView.vue'
import ContactUsView from '@/views/ContactUsView.vue'
import SignupView from '@/views/SignupView.vue'

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
  {
    path: '/Login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Donate',
    name: 'Donate',
    component: DonateView
  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: ContactUsView
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: SignupView
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
