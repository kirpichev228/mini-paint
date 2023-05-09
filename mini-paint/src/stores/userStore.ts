import { auth } from '@/firebase/index'
import authService from '@/services/authService'
// import type { User } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const isAuthorized = ref(false)
  const user = ref()
  const userId: Ref<string | undefined> = ref('' || undefined)

  const getUser = computed(() => user)
  const getUserId = computed(() => userId)
  const getAuthorizationStatus = computed(() => isAuthorized)

  function setAuthorizationStatus(state: boolean): void {
    isAuthorized.value = state
  }
  async function setUser() {
    auth.onAuthStateChanged(async (userData) => {
      if (!userData) {
        isAuthorized.value = false
        user.value = null
        userId.value = undefined
      } else {
        isAuthorized.value = true
        user.value = userData
        userId.value = userData.uid
      }
    })
  }
  function setUserId(data: string | undefined): void {
    userId.value = data
  }
  async function fetchUser() {
    return authService.fetchUser()
  }

  return {
    getUser,
    getUserId,
    getAuthorizationStatus,
    setUser,
    setUserId,
    setAuthorizationStatus,
    fetchUser
  }
})
