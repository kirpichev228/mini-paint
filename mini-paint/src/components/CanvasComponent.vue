<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas" id="my-canvas"></canvas>
    <canvas
      @mousedown="startDrawing"
      @mousemove="figureCheck"
      @mouseup="stopDrawing"
      ref="canvasOverlay"
      id="canvas-overlay"
      style="position: absolute; right: 11px; background: none"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCanvasStore } from '@/stores/canvasStore'
import { line } from '@/helpers/lineHelper'
import { circle } from '@/helpers/circleHelper'
import { rectangle } from '@/helpers/rectangleHelper'
import { star } from '@/helpers/starHelper'
import { polygon } from '@/helpers/polygonHelper'
import type { FigureCoordinates } from '@/types/index'

const canvasStore = useCanvasStore()

const canvas = ref<HTMLCanvasElement | null>(null)
const canvasOverlay = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const startX = ref(0)
const startY = ref(0)
const endX = ref(0)
const endY = ref(0)

const { pickedColor, choosenFigure, isFigureFilled, polygonVertex, starVertex, brushThickness } =
  storeToRefs(canvasStore)

const initializeCanvas = () => {
  if (!canvasOverlay.value) {
    return
  }
  const ctxO = canvasOverlay.value.getContext('2d')
  if (ctxO) {
    ctxO.lineWidth = brushThickness.value
    ctxO.lineCap = 'round'
    ctxO.strokeStyle = pickedColor.value
    ctxO.fillStyle = pickedColor.value
  }
}

const startDrawing = (event: MouseEvent) => {
  initializeCanvas()
  if (!canvasOverlay.value) {
    return
  }

  isDrawing.value = true
  startX.value = event.offsetX
  startY.value = event.offsetY
}

const drawCurve = (event: MouseEvent) => {
  if (!isDrawing.value || !canvasOverlay.value) {
    return
  }

  const ctxO = canvasOverlay.value.getContext('2d')
  if (ctxO) {
    ctxO.beginPath()
    ctxO.moveTo(startX.value, startY.value)
    ctxO.lineTo(event.offsetX, event.offsetY)
    ctxO.stroke()

    startX.value = event.offsetX
    startY.value = event.offsetY
  }
}

const stopDrawing = () => {
  const ctx = canvas.value?.getContext('2d')
  const ctxO = canvasOverlay.value?.getContext('2d')

  if (ctx && ctxO && canvasOverlay.value) {
    ctx.drawImage(ctxO.canvas, 0, 0)
    ctxO.clearRect(0, 0, canvasOverlay.value.width, canvasOverlay.value.height)
  }
  canvasStore.saveCanvasState(canvas.value)
  canvasStore.setCanvas(canvas.value)
  isDrawing.value = false
}

const figureDraw = (event: MouseEvent) => {
  if (!canvasOverlay.value || !isDrawing.value) {
    return
  }

  const ctxO = canvasOverlay.value.getContext('2d')
  if (ctxO) {
    ctxO.clearRect(0, 0, canvasOverlay.value.width, canvasOverlay.value.height)
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
        rectangle(ctxO, coordinates, isFigureFilled.value)
        break
      case 'circle':
        circle(ctxO, coordinates, isFigureFilled.value)
        break
      case 'line':
        line(ctxO, coordinates)
        break
      case 'polygon':
        polygon(ctxO, coordinates, isFigureFilled.value, polygonVertex.value)
        break
      case 'square':
        polygon(ctxO, coordinates, isFigureFilled.value, 4)
        break
      case 'triangle':
        polygon(ctxO, coordinates, isFigureFilled.value, 3)
        break
      case 'star':
        star(ctxO, coordinates, isFigureFilled.value, starVertex.value)
        break
      default:
        stopDrawing()
        break
    }
  }
}

const figureCheck = (event: MouseEvent) => {
  choosenFigure.value === '' ? drawCurve(event) : figureDraw(event)
}

const resizeCanvas = () => {
  if (!canvas.value) {
    return
  }
  const canvasWrapper = canvas.value.parentElement
  if (!canvasWrapper) {
    return
  }
  const width = canvasWrapper.clientWidth
  const height = canvasWrapper.clientHeight
  canvas.value.width = width
  canvas.value.height = height

  if (!canvasOverlay.value) {
    return
  }
  const canvasWrapperO = canvasOverlay.value.parentElement
  if (!canvasWrapperO) {
    return
  }
  const widthO = canvasWrapper.clientWidth
  const heightO = canvasWrapper.clientHeight
  canvasOverlay.value.width = widthO
  canvasOverlay.value.height = heightO
}

onMounted(() => {
  initializeCanvas()
  stopDrawing()
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  canvasStore.clearCanvasState()
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
