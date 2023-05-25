<template>
  <main class="gallery-wrapper">
    <Transition name="zoom">
      <ImageZoom
        :imgURL="selectedImg.imgUrl"
        v-if="selectedImg.isVisible"
        @zoomOut="selectedImg.isVisible = false"
      />
    </Transition>
    <h2 class="gallery-heading">Works gallery</h2>
    <label>
      Sort by user
      <select v-model="selectedUser" @change="filterUsers">
        <option value="">All Users</option>
        <option v-for="(user, index) in usersList" :key="index" :value="user">{{ user }}</option>
      </select>
    </label>
    <div class="works-container">
      <TransitionGroup name="fade">
        <div class="image-container" v-for="(image, index) in filteredImageList" :key="index">
          <div class="image-heading">
            <h4>{{ image.username }}</h4>
            <button
              class="delete-image"
              v-if="userStore.user.email === image.username"
              @click="deleteImage(image.itemID)"
            >
              Delete
            </button>
          </div>
          <img
            :src="image.imageURL"
            :alt="image.username"
            @click="setZoom(String(image.imageURL))"
          />
        </div>
      </TransitionGroup>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, reactive, onUpdated } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useErrorStore } from '@/stores/errorStore'
import { useLoaderStore } from '@/stores/loaderStore'
import ImageZoom from '@/components/ImageZoom.vue'
import type { ImageInfo } from '@/types'

const userStore = useUserStore()
const errorStore = useErrorStore()
const loaderStore = useLoaderStore()

const imageList = computed<ImageInfo[] | undefined>(
  () => userStore.images
)

const selectedUser = ref('')

const usersList = computed<string[]>(
  () => [...new Set(imageList.value?.map((obj) => obj.username))]
)
const filteredImageList = computed<ImageInfo[]>(
  () => {
    if (!selectedUser.value) {
      return imageList.value || []
    }
    return (imageList.value || []).filter((image) => image.username === selectedUser.value)
  }
)

const filterUsers = (): void => {
  filteredImageList.value
}

const getImages = async (): Promise<void> => {
  try {
    loaderStore.setLoaderStatus()
    await userStore.getImages()
  } catch (error: unknown) {
    errorStore.showErrorToast(String(error))
  }
}

const deleteImage = async (userID: number): Promise<void> => {
  try {
    await userStore.deleteImage(userID)
  } catch (error: unknown) {
    errorStore.showErrorToast(String(error))
  } finally {
    loaderStore.setLoaderStatus()
  }
}

const selectedImg = reactive({
  isVisible: false,
  imgUrl: ''
})

const setZoom = (url: string): void => {
  (selectedImg.isVisible = true), (selectedImg.imgUrl = url)
}

onMounted(() => {
  getImages()
})

onUpdated(() => {
  loaderStore.setLoaderStatus()
})
</script>

<style scoped>
.gallery-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.gallery-heading {
  font-size: 28px;
}

.works-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(446px, 1fr));
  justify-items: center;
  gap: var(--gap);
}

.image-container {
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding: var(--gap);
  background: var(--color-background);
  box-shadow: inset var(--color-shadow);
  color: var(--color-primary);
}

.image-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-image {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 15px;
}

.delete-image:hover {
  color: var(--color-secondary);
}

img {
  cursor: zoom-in;
  width: 420px;
  height: 200px;
  background: #fff;
  box-shadow: var(--color-shadow);
}

.zoom-enter-active,
.zoom-leave-active {
  transition: opacity 0.3s ease;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(30px);
}
</style>
