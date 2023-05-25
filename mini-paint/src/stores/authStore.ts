import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import authService from '@/services/authService'
import { auth } from '@/firebase/index'

export const useAuthStore = defineStore('authStore', () => {
  const userStore = useUserStore()

  async function login(email: string, password: string): Promise<void> {
    await authService.login(email, password)
    userStore.setUser()
    userStore.setUserId(auth.currentUser?.uid)
    userStore.setAuthorizationStatus(true)
  }

  async function registration(email: string, password: string): Promise<void> {
    await authService.register(email, password)
    userStore.setUser()
    userStore.setUserId(auth.currentUser?.uid)
    userStore.setAuthorizationStatus(false)
  }

  async function logout(): Promise<void> {
    await authService.logout()
    userStore.setUser()
    userStore.setUserId(undefined)
    userStore.setAuthorizationStatus(false)
  }

  return { login, registration, logout }
})
