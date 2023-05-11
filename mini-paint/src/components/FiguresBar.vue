<template>
  <div class="figures-wrapper">
    <h3>Figures</h3>
    <div class="figures-container">
      <ButtonSample
        v-for="(figure, index) in figuresList"
        :key="index"
        @click="setFigure(figure)"
        :class="{
          active: currentFigure === figure
        }"
      >
        {{ figure }}
      </ButtonSample>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCanvasStore } from '@/stores/canvasStore'
import ButtonSample from './UI/ButtonSample.vue'

const canvasStore = useCanvasStore()
const figuresList = canvasStore.getFigures
const currentFigure = canvasStore.getChoosenFigure

const setFigure = (figure: string) => {
  canvasStore.setFigure(figure)
}
</script>

<style scoped>
.figures-wrapper {
  width: 100%;
}
.figures-container {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid var(--color-secondary);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.active {
  background-color: var(--color-secondary);
  color: var(--color-primary);
}
</style>
