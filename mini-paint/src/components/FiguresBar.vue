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
        v-for="(figure, index) in figures"
        :key="index"
        @click="setFigure(figure)"
        :class="{
          active: choosenFigure === figure
        }"
      >
        {{ figure }}
      </ButtonSample>
    </div>
    <div class="vertex-container">
      <div class="star">
        <h4>Star vertex amount:</h4>
        <input
          type="number"
          max="500"
          min="3"
          step="1"
          v-model="starVertex"
          @change="setStarVertex"
        />
      </div>
      <div class="polygon">
        <h4>Polygon vertex amount:</h4>
        <input
          type="number"
          max="20"
          min="5"
          step="1"
          v-model="polygonVertex"
          @change="setPolygonVertex"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCanvasStore } from '@/stores/canvasStore'
import { storeToRefs } from 'pinia'
import ButtonSample from './UI/ButtonSample.vue'

const canvasStore = useCanvasStore()
const { polygonVertex, starVertex, figures, choosenFigure, isFigureFilled } =
  storeToRefs(canvasStore)

const setFigure = (figure: string) => {
  canvasStore.setFigure(figure)
}
const setFillState = (state: boolean) => {
  canvasStore.setFillState(state)
}
const setPolygonVertex = (event: Event) => {
  const target = event.target as HTMLInputElement
  canvasStore.setPolygonVertex(Number(target.value))
}
const setStarVertex = (event: Event) => {
  const target = event.target as HTMLInputElement
  canvasStore.setStarVertex(Number(target.value))
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

.vertex-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  border: none;
  outline: none;
  background: var(--color-primary);
  padding-top: 3px;
}

.polygon,
.star {
  display: flex;
  align-items: center;
  gap: 5px;
}

.active {
  background-color: var(--color-secondary);
  color: var(--color-primary);
}
</style>
