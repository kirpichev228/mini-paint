<template>
  <aside>
    <BrushRange />
    <ColorsBar />
    <CustomColor />
    <FiguresBar />
    <ButtonSample @click="canvasStore.clearCanvas"> Clear area </ButtonSample>
    <ButtonSample @click="saveImage"> Save in gallery </ButtonSample>
    <ButtonSample @click="loadImage">Open File</ButtonSample>

  </aside>
</template>

<script setup lang="ts">
import ColorsBar from '@/components/ColorsBar.vue'
import FiguresBar from '@/components/FiguresBar.vue'
import BrushRange from '@/components/UI/BrushRange.vue'
import CustomColor from './UI/CustomColor.vue'
import ButtonSample from './UI/ButtonSample.vue'
import { useCanvasStore } from '@/stores/canvasStore'
import { useUserStore } from '@/stores/userStore'
import type { ImageInfo } from '@/components/types/'
import { useLoaderStore } from '@/stores/loaderStore'
import { useErrorStore } from '@/stores/errorStore'

const canvasStore = useCanvasStore()
const userStore = useUserStore()
const loaderStore = useLoaderStore()
const errorStore = useErrorStore()

const saveImage = async () => {
  const imageData: ImageInfo = {
    username: userStore.getUser.value.email,
    imageURL: canvasStore.saveCanvas()
  }

  try {
    loaderStore.setLoaderStatus()
    await userStore.saveImage(imageData)
  } catch (error: unknown) {
    errorStore.showErrorToast(String(error))
  } finally {
    loaderStore.setLoaderStatus()
  }
}

const loadImage = (): void => {
  const input: HTMLInputElement = document.createElement('input')
  input.type = 'file'
  input.addEventListener('change', (event: Event) => {
    const file: File | undefined = (event.target as HTMLInputElement)?.files?.[0]
    if (!file) {
      return
    }
    const reader: FileReader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      const img: HTMLImageElement = new Image()
      img.addEventListener('load', () => {
        canvasStore.setCanvasImage(img)
      })
      if (!reader.result) {
        return
      }
      img.src = reader.result.toString()
    })
  })

  input.click()
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
  align-items: flex-start;
  overflow-y: scroll;
}
</style>
