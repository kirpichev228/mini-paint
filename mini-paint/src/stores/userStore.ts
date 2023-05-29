import type { ImageInfo } from '@/types'
import { auth } from '@/firebase/index'
import authService from '@/services/authService'
import imageService from '@/services/imageService'
import { onValue } from 'firebase/database'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const isAuthorized = ref(false)
  const user = ref()
  const userId = ref<string | null>('' || null)
  const images = ref<ImageInfo[] | undefined>()

  function setAuthorizationStatus(state: boolean): void {
    isAuthorized.value = state
  }
  async function setUser(): Promise<void> {
    auth.onAuthStateChanged(async (userData) => {
      if (!userData) {
        isAuthorized.value = false
        user.value = null
        userId.value = null
      } else {
        isAuthorized.value = true
        user.value = userData
        userId.value = userData.uid
      }
    })
  }
  function setUserId(data: string | null): void {
    userId.value = data
  }
  async function fetchUser(): Promise<unknown> {
    return authService.fetchUser()
  }

  async function saveImage(imageData: ImageInfo): Promise<void> {
    await imageService.save(imageData)
  }

  async function getImages(): Promise<void> {
    const result = await imageService.load()
    onValue(result, (snap) => {
      if (snap.val() !== null) {
        images.value = Object.values(snap.val())
      }
    })
  }

  async function deleteImage(userID: number): Promise<void> {
    await imageService.delete(userID)
  }

  return {
    isAuthorized,
    user,
    userId,
    images,
    setUser,
    setUserId,
    setAuthorizationStatus,
    fetchUser,
    saveImage,
    getImages,
    deleteImage,
  }
})
