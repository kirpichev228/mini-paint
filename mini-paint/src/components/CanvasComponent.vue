<template>
  <div class="canvas-wrapper">
    <canvas
      ref="canvas"
      width="700"
      height="700"
      @mousedown="startDrawing"
      @mousemove="drawLine"
      @mouseup="stopDrawing"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCanvasStore } from '@/stores/canvasStore'

const canvasStore = useCanvasStore()

const canvas = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const startX = ref(0)
const startY = ref(0)
const width = canvasStore.getBrushThickness
const color = canvasStore.getPickedColor

const initializeCanvas = () => {
  if (!canvas.value) {
    return
  }
  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    ctx.lineWidth = Number(width.value)
    ctx.lineCap = 'round'
    ctx.strokeStyle = color.value
  }
}

function startDrawing(event: MouseEvent) {
  initializeCanvas()
  if (!canvas.value) {
    return
  }

  isDrawing.value = true
  startX.value = event.offsetX
  startY.value = event.offsetY
}

function drawLine(event: MouseEvent) {
  if (!isDrawing.value || !canvas.value) {
    return
  }

  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    ctx.beginPath()
    ctx.moveTo(startX.value, startY.value)
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke()

    startX.value = event.offsetX
    startY.value = event.offsetY
  }
}

function stopDrawing() {
  isDrawing.value = false
}
</script>

<style scoped>
.canvas-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
}

canvas {
  border: 1px solid var(--color-secondary);
  cursor: crosshair;
}
</style>
