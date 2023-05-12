<template>
  <div class="canvas-wrapper">
    <canvas
      ref="canvas"
      width="1200"
      height="600"
      @mousedown="startDrawing"
      @mousemove="figureCheck"
      @mouseup="figureDraw"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCanvasStore } from '@/stores/canvasStore'
import { line } from '@/helpers/lineHelper'
import { circle } from '@/helpers/circleHelper'
import { rectangle } from '@/helpers/rectangleHelper'
import { star } from '@/helpers/starHelper'
import { polygon } from '@/helpers/polygonHelper'

const canvasStore = useCanvasStore()

const canvas = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const startX = ref(0)
const startY = ref(0)
const endX = ref(0)
const endY = ref(0)

const width = canvasStore.getBrushThickness
const color = canvasStore.getPickedColor
const choosenFigure = canvasStore.getChoosenFigure
const isFilled = canvasStore.getIsFigureFilled
const polygonVertex = canvasStore.getPolygonVertex
const starVertex = canvasStore.getStarVertex

const initializeCanvas = () => {
  if (!canvas.value) {
    return
  }
  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    ctx.lineWidth = Number(width.value)
    ctx.lineCap = 'round'
    ctx.strokeStyle = color.value
    ctx.fillStyle = color.value
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

function drawCurve(event: MouseEvent) {
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

const figureCheck = (event: MouseEvent) => {
  choosenFigure.value === '' ? drawCurve(event) : null
}

const figureDraw = (event: MouseEvent) => {
  if (!canvas.value) {
    return
  }
  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    endX.value = event.offsetX
    endY.value = event.offsetY

    switch (choosenFigure.value) {
      case 'rectangle':
        rectangle(ctx, startX, startY, endX, endY, isFilled)
        break
      case 'circle':
        circle(ctx, startX, startY, endX, endY, isFilled)
        break
      case 'line':
        line(ctx, startX, startY, endX, endY)
        break
      case 'polygon':
        polygon(ctx, startX, startY, endX, endY, isFilled, polygonVertex.value)
        break
      case 'square':
        polygon(ctx, startX, startY, endX, endY, isFilled, 4)
        break
      case 'triangle':
        polygon(ctx, startX, startY, endX, endY, isFilled, 3)
        break
      case 'star':
        star(ctx, startX, startY, endX, endY, isFilled, starVertex.value)
        break
      default:
        stopDrawing()
        break
    }
    stopDrawing()
  }
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
  background: #fff;
}
</style>
