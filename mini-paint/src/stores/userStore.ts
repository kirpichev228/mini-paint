import type { ImageInfo } from '@/components/types'
import { auth } from '@/firebase/index'
import authService from '@/services/authService'
import imageService from '@/services/imageService'
import { onValue } from 'firebase/database'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const isAuthorized = ref(false)
  const user = ref()
  const userId: Ref<string | undefined> = ref('' || undefined)
  const images: Ref<ImageInfo[] | undefined> = ref()
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
    getImagesList
  }
})
