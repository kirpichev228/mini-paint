<template>
  <aside>
    <BrushRange />
    <ColorsBar />
    <CustomColor />
    <FiguresBar />
    <ButtonSample @click="canvasStore.clearCanvas"> Clear area </ButtonSample>
    <ButtonSample :disabled="buttonDisable" @click="saveImage"> Save in gallery </ButtonSample>
    <ButtonSample @click="canvasStore.loadCanvasState">Undo</ButtonSample>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ColorsBar from '@/components/ColorsBar.vue'
import FiguresBar from '@/components/FiguresBar.vue'
import BrushRange from '@/components/UI/BrushRange.vue'
import CustomColor from './UI/CustomColor.vue'
import ButtonSample from './UI/ButtonSample.vue'
import { useCanvasStore } from '@/stores/canvasStore'
import { useUserStore } from '@/stores/userStore'
import type { ImageInfo } from '@/types'
import { useLoaderStore } from '@/stores/loaderStore'
import { useErrorStore } from '@/stores/errorStore'

const canvasStore = useCanvasStore()
const userStore = useUserStore()
const loaderStore = useLoaderStore()
const errorStore = useErrorStore()

const buttonDisable = ref(false)

const saveImage = async () => {
  const imageData: ImageInfo = {
    username: userStore.getUser.value.email,
    imageURL: canvasStore.saveCanvas()
  }

  try {
    buttonDisable.value = true
    loaderStore.setLoaderStatus()
    await userStore.saveImage(imageData)
  } catch (error: unknown) {
    errorStore.showErrorToast(String(error))
  } finally {
    loaderStore.setLoaderStatus()
    buttonDisable.value = false
  }
}
</script>

<style scoped>
aside {
  height: 90vh;
  min-width: 260px;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--gap);
  overflow-y: scroll;
}
</style>
