import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'

import LandingPageView from '@/views/LandingPageView.vue'
import JobSearchView from '@/views/JobSearchView.vue'
import PublicationsView from '@/views/PublicationsView.vue'
import MentorsView from '@/views/MentorsView.vue'
import LoginView from '@/views/LoginView.vue'
import DonateView from '@/views/DonateView.vue'
import ContactUsView from '@/views/ContactUsView.vue'
import SignupView from '@/views/SignupView.vue'
import LoginResetView from '@/views/LoginResetView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPageView
  },
  {
    path: '/Publications',
    name: 'Publications',
    component: PublicationsView
  },
  {
    path: '/Mentors',
    name: 'Mentors',
    component: MentorsView
  },
  {
    path: '/JobSearch',
    name: 'JobSearch',
    component: JobSearchView
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
  {
    path: '/LoginReset',
    name: 'LoginReset',
    component: LoginResetView
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: ProfileView
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const user = auth.currentUser // Get the current authenticated user

  // If the route requires authentication and the user isn't logged in, redirect to Login
  if (to.matched.some(record => record.meta.requiresAuth) && !user) {
    next({ name: 'Login' }) // Redirect to Login
  } else {
    next() // Continue to the requested route
  }
})

export default router
