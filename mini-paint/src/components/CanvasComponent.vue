<template>
  <div class="canvas-wrapper">
    <canvas
      ref="canvas"
      id="my-canvas"
      @mousedown="startDrawing"
      @mousemove="figureCheck"
      @mouseup="figureDraw"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useCanvasStore } from '@/stores/canvasStore'
import { line } from '@/helpers/lineHelper'
import { circle } from '@/helpers/circleHelper'
import { rectangle } from '@/helpers/rectangleHelper'
import { star } from '@/helpers/starHelper'
import { polygon } from '@/helpers/polygonHelper'
import type { FigureCoordinates } from '@/components/types/index'

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

const startDrawing = (event: MouseEvent) => {
  initializeCanvas()
  if (!canvas.value) {
    return
  }

  isDrawing.value = true
  startX.value = event.offsetX
  startY.value = event.offsetY
}

const drawCurve = (event: MouseEvent) => {
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

const stopDrawing = () => {
  canvasStore.setCanvas(canvas.value)
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

    const coordinates: FigureCoordinates = {
      startX: startX.value,
      startY: startY.value,
      endX: endX.value,
      endY: endY.value
    }

    switch (choosenFigure.value) {
      case 'rectangle':
        rectangle(ctx, coordinates, isFilled.value)
        break
      case 'circle':
        circle(ctx, coordinates, isFilled.value)
        break
      case 'line':
        line(ctx, coordinates)
        break
      case 'polygon':
        polygon(ctx, coordinates, isFilled.value, polygonVertex.value)
        break
      case 'square':
        polygon(ctx, coordinates, isFilled.value, 4)
        break
      case 'triangle':
        polygon(ctx, coordinates, isFilled.value, 3)
        break
      case 'star':
        star(ctx, coordinates, isFilled.value, starVertex.value)
        break
      default:
        stopDrawing()
        break
    }
    stopDrawing()
  }
}

const resizeCanvas = () => {
  if (!canvas.value) {
    return
  }
  const canvass = canvas.value
  const canvasWrapper = canvass.parentElement
  if (!canvasWrapper) {
    return
  }
  const width = canvasWrapper.clientWidth
  const height = canvasWrapper.clientHeight
  canvass.width = width
  canvass.height = height
}

onMounted(() => {
  resizeCanvas()
})

onMounted(() => {
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.canvas-wrapper {
  width: 100%;
  height: 90vh;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
}

canvas {
  border: 1px solid var(--color-secondary);
  cursor: crosshair;
  background: #fff;
}
</style>
