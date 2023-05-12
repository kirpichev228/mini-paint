<template>
  <main class="gallery-wrapper">
    <h2 class="gallery-heading">Your works gallery</h2>
    <div class="works-container">
      <div class="image-container"
        v-for="(image, index) in imageList" :key="index"
      >
        <h4>{{ image.username }}</h4>
        <img :src="image.imageURL" alt="">
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore()
const imageList = userStore.getImagesList

onMounted(() => {
  userStore.getImages()
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
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  justify-items: center;
  grid-gap: var(--gap);
}

.image-container {
  width: 450px;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  border: 3px solid var(--color-background);
  padding: var(--gap);
}

img {
  border: 1px solid var(--color-secondary);
}
</style>
