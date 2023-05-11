<template>
  <div class="figures-wrapper">
    <h3>Figures</h3>
    <div class="fill">
      <ButtonSample
        :class="{
          active: isFigureFilled
        }"
        @click="setFillState(true)"
      >
        Filled
      </ButtonSample>
      <ButtonSample
        :class="{
          active: !isFigureFilled
        }"
        @click="setFillState(false)"
      >
        Transparent
      </ButtonSample>
    </div>
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
const isFigureFilled = canvasStore.getIsFigureFilled

const setFigure = (figure: string) => {
  canvasStore.setFigure(figure)
}
const setFillState = (state: boolean) => {
  canvasStore.setFillState(state)
}
</script>

<style scoped>
.figures-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.figures-container {
  padding: 10px;
  border: 1px solid var(--color-secondary);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fill {
  display: flex;
  gap: 10px;
}

.active {
  background-color: var(--color-secondary);
  color: var(--color-primary);
}
</style>
