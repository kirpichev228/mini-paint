import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import authService from '@/services/authService'
import { auth } from '@/firebase/index'

export const useAuthStore = defineStore('authStore', () => {
  const userStore = useUserStore()

  async function login(email: string, password: string) {
    await authService.login(email, password)
    userStore.setUser()
    userStore.setUserId(auth.currentUser?.uid)
    userStore.setAuthorizationStatus(true)
    // console.log(user);
  }

  async function registration(email: string, password: string) {
    await authService.register(email, password)
    userStore.setUser()
    userStore.setUserId(auth.currentUser?.uid)
    userStore.setAuthorizationStatus(false)
  }

  async function logout() {
    await authService.logout()
    userStore.setUser()
    userStore.setUserId(undefined)
    userStore.setAuthorizationStatus(false)
  }

  return { login, registration, logout }
})
