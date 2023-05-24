import type { ImageInfo } from '@/types'
import { auth } from '@/firebase/index'
import authService from '@/services/authService'
import imageService from '@/services/imageService'
import { onValue } from 'firebase/database'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const isAuthorized = ref(false)
  const user = ref()
  const userId = ref<string | undefined>('' || undefined)
  const images = ref<ImageInfo[] | undefined>()
  const getUser = computed(() => user)
  const getUserId = computed(() => userId)
  const getAuthorizationStatus = computed(() => isAuthorized)
  const getImagesList = computed(() => images)

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

  async function saveImage(imageData: ImageInfo) {
    await imageService.save(imageData)
  }

  async function getImages() {
    const result = await imageService.load()
    onValue(result, (snap) => {
      if (snap.val() !== null) {
        images.value = Object.values(snap.val())
      }
    })
  }

  async function deleteImage(userID: number) {
    await imageService.delete(userID)
  }

  return {
    getUser,
    getUserId,
    getAuthorizationStatus,
    setUser,
    setUserId,
    setAuthorizationStatus,
    fetchUser,
    saveImage,
    getImages,
    deleteImage,
    getImagesList
  }
})
