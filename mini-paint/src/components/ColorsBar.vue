<template>
  <div class="colors-wrapper">
    <h3>Colors</h3>
    <div class="color-container">
      <div
        class="color-item"
        v-for="(color, index) in colors"
        :key="index"
        :style="{ background: color }"
        @click="setColor(color)"
        :class="{ active: pickedColor === color }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCanvasStore } from '@/stores/canvasStore'
import { storeToRefs } from 'pinia'

const canvasStore = useCanvasStore()

const { colors, pickedColor } = storeToRefs(canvasStore)

const setColor = (color: string) => {
  canvasStore.setPickedColor(color)
}
</script>

<style scoped>
.colors-wrapper {
  width: 100%;
}
.color-container {
  border: 2px solid var(--color-secondary);
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
  grid-gap: 1em;
  width: 100%;
  margin-top: 10px;
  gap: 3px;
  justify-items: center;
}

.color-item {
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: 0.3;
  border: 1px solid var(--color-primary);
}

.color-item:hover {
  opacity: 1;
}

.active {
  opacity: 1;
  border: 1px solid var(--color-secondary);
}
</style>
