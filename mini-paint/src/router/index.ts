import { auth } from '@/firebase/index'
import authService from '@/services/authService'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Gallery',
      component: () => import('@/views/GalleryPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginPage.vue')
    },
    {
      path: '/registration',
      name: 'Registration',
      component: () => import('@/views/RegistrationPage.vue')
    },
    {
      path: '/draw',
      name: 'Draw',
      component: () => import('@/views/DrawPage.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  await authService.fetchUser()
  if ((to.path === '/login' || to.path === '/registration') && auth.currentUser) {
    next('/')
    return
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await authService.fetchUser()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
