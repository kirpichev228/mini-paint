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

const { saveCanvasState, setCanvas, clearCanvasState } = useCanvasStore()

const canvas = ref<HTMLCanvasElement | null>(null)
const canvasOverlay = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null | undefined>(null)
const ctxO = ref<CanvasRenderingContext2D | null | undefined>(null)
const isDrawing = ref(false)
const startX = ref(0)
const startY = ref(0)
const endX = ref(0)
const endY = ref(0)

const { pickedColor, choosenFigure, isFigureFilled, polygonVertex, starVertex, brushThickness } =
  storeToRefs(useCanvasStore())

const initializeCanvas = () => {
  if (!canvasOverlay.value) {
    return
  }
  if (ctxO.value) {
    ctxO.value.lineWidth = brushThickness.value
    ctxO.value.lineCap = 'round'
    ctxO.value.strokeStyle = pickedColor.value
    ctxO.value.fillStyle = pickedColor.value
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

  if (ctxO.value) {
    ctxO.value.beginPath()
    ctxO.value.moveTo(startX.value, startY.value)
    ctxO.value.lineTo(event.offsetX, event.offsetY)
    ctxO.value.stroke()

    startX.value = event.offsetX
    startY.value = event.offsetY
  }
}

const stopDrawing = () => {
  if (ctx.value && ctxO.value && canvasOverlay.value) {
    ctx.value.drawImage(ctxO.value.canvas, 0, 0)
    ctxO.value.clearRect(0, 0, canvasOverlay.value.width, canvasOverlay.value.height)
  }
  saveCanvasState(canvas.value)
  setCanvas(canvas.value)
  isDrawing.value = false
}

const figureDraw = (event: MouseEvent) => {
  if (!canvasOverlay.value || !isDrawing.value) {
    return
  }

  if (ctxO.value) {
    ctxO.value.clearRect(0, 0, canvasOverlay.value.width, canvasOverlay.value.height)
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
        rectangle(ctxO.value, coordinates, isFigureFilled.value)
        break
      case 'circle':
        circle(ctxO.value, coordinates, isFigureFilled.value)
        break
      case 'line':
        line(ctxO.value, coordinates)
        break
      case 'polygon':
        polygon(ctxO.value, coordinates, isFigureFilled.value, polygonVertex.value)
        break
      case 'square':
        polygon(ctxO.value, coordinates, isFigureFilled.value, 4)
        break
      case 'triangle':
        polygon(ctxO.value, coordinates, isFigureFilled.value, 3)
        break
      case 'star':
        star(ctxO.value, coordinates, isFigureFilled.value, starVertex.value)
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
  ctxO.value = canvasOverlay.value?.getContext('2d')
  ctx.value = canvas.value?.getContext('2d')
  initializeCanvas()
  stopDrawing()
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  clearCanvasState()
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
