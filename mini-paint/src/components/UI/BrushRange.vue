<template>
  <div class="brush-wrapper">
    <h3 class="heading">
      Line thickness:
      <input
        type="number"
        min="1"
        max="10"
        step="0.1"
        class="number"
        v-model="brushThickness"
        @change="setBrushWidth"
      />
    </h3>
    <input
      type="range"
      min="1"
      max="10"
      step="0.1"
      class="range"
      v-model="brushThickness"
      @change="setBrushWidth"
    />
  </div>
</template>

<script setup lang="ts">
import { useCanvasStore } from '@/stores/canvasStore'
import { storeToRefs } from 'pinia'

const { setBrushThikness } = useCanvasStore()

const { brushThickness } = storeToRefs(useCanvasStore())

const setBrushWidth = (event: Event) => {
  const target = event.target as HTMLInputElement
  setBrushThikness(Number(target.value))
}
</script>

<style scoped>
.brush-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.heading {
  display: flex;
  align-items: center;
  gap: 5px;
}

.number {
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 19px;
  width: 45px;
  padding-top: 2px;
  background: var(--color-primary);
}

input[type='range'] {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 20px;
  padding: 0 3px;
  background: var(--color-background);
  box-shadow: inset var(--color-shadow);
  cursor: pointer;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  background: var(--color-primary);
  border-radius: 0;
}

input[type='range']::-moz-range-thumb {
  width: 15px;
  height: 15px;
  background: var(--color-primary);
  border-radius: 0;
}
</style>
