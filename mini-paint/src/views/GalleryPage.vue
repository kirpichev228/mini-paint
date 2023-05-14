<template>
  <main class="gallery-wrapper">
    <ImageZoom 
      :imgURL="selectedImg.imgUrl" 
      v-if="selectedImg.isVisible" 
      @zoomOut="selectedImg.isVisible = false"
    />
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
        <h4>{{ image.username }}</h4>
        <img :src="image.imageURL" :alt="image.username" @click="setZoom(image.imageURL)"/>
      </div>
    </TransitionGroup>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useErrorStore } from '@/stores/errorStore'
import { useLoaderStore } from '@/stores/loaderStore'
import ImageZoom from '@/components/ImageZoom.vue'

const userStore = useUserStore()
const errorStore = useErrorStore()
const loaderStore = useLoaderStore()

const imageList = userStore.getImagesList

const selectedUser = ref('')

const usersList = computed(() => [...new Set(imageList.value?.map((obj) => obj.username))])
const filteredImageList = computed(() => {
  if (!selectedUser.value) {
    return imageList.value || []
  }
  return (imageList.value || []).filter((image) => image.username === selectedUser.value)
})

const filterUsers = () => {
  filteredImageList.value
}

const getImages = async () => {
  try {
    loaderStore.setLoaderStatus()
    await userStore.getImages()
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

const setZoom = (url: string) => {
  selectedImg.isVisible = true,
  selectedImg.imgUrl = url
}

onMounted(() => {
  getImages()
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
  grid-template-rows: repeat(auto-fill, minmax(240px, 1fr));
  justify-items: center;
  grid-gap: var(--gap);
}

.image-container {
  width: 446px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding: var(--gap);
  background: var(--color-background);
  box-shadow: inset var(--color-shadow);
  color: var(--color-primary);
}

img {
  cursor: zoom-in;
  background: #fff;
  box-shadow: var(--color-shadow);
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
