<template>
  <aside>
    <BrushRange />
    <ColorsBar />
    <CustomColor />
    <FiguresBar />
    <ButtonSample @click="clearCanvas"> Clear area </ButtonSample>
    <ButtonSample @click="saveModalVisible = true"> Save in gallery </ButtonSample>
    <ButtonSample @click="loadCanvasState">Undo</ButtonSample>
    <SaveModal 
      v-if="saveModalVisible" 
      @save="(name) => saveImageInGallery(name)"
      :disability="buttonDisable"
      />
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ColorsBar from '@/components/ColorsBar.vue'
import FiguresBar from '@/components/FiguresBar.vue'
import BrushRange from '@/components/UI/BrushRange.vue'
import SaveModal from './UI/SaveModal.vue'
import CustomColor from './UI/CustomColor.vue'
import ButtonSample from './UI/ButtonSample.vue'
import { useCanvasStore } from '@/stores/canvasStore'
import { useUserStore } from '@/stores/userStore'
import type { ImageInfo } from '@/types'
import { useLoaderStore } from '@/stores/loaderStore'
import { useErrorStore } from '@/stores/errorStore'
import { storeToRefs } from 'pinia'

const { saveCanvas, clearCanvas, loadCanvasState } = useCanvasStore()
const { saveImage } = useUserStore()
const { user } = storeToRefs(useUserStore())
const { setLoaderStatus } = useLoaderStore()
const { showErrorToast } = useErrorStore()

const buttonDisable = ref(false)
const saveModalVisible = ref(false)

const saveImageInGallery = async (name: string) => {
  const imageData: ImageInfo = {
    username: user.value.email,
    imageURL: saveCanvas(),
    itemID: new Date().getTime(),
    itemName: name
  }

  try {
    buttonDisable.value = true
    setLoaderStatus()
    await saveImage(imageData)
    saveModalVisible.value = false
  } catch (error: unknown) {
    showErrorToast(String(error))
  } finally {
    setLoaderStatus()
    buttonDisable.value = false
    saveModalVisible.value = false
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
