<template>
  <div class="custom-wrapper">
    <h3>Custom color</h3>
    <div class="custom-container">
      <input type="color" v-model="customColor" @change="setCustomColor" />
      <ButtonSample @click="saveCustomColor"> Save color in bar </ButtonSample>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCanvasStore } from '@/stores/canvasStore'
import ButtonSample from './ButtonSample.vue'

const { setPickedColor, addColors } = useCanvasStore()

const customColor = ref('#000000')

const setCustomColor = (event: Event) => {
  const target = event.target as HTMLInputElement
  setPickedColor(target.value)
}

const saveCustomColor = () => {
  addColors(customColor.value)
}
</script>

<style scoped>
.custom-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.custom-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
