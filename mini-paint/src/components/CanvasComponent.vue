<template>
  <div class="canvas-wrapper">
    <canvas
      ref="canvas"
      width="700"
      height="700"
      @mousedown="startDrawing"
      @mousemove="jopa1"
      @mouseup="jopa2"
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
const endX = ref(0)
const endY = ref(0)
const width = canvasStore.getBrushThickness
const color = canvasStore.getPickedColor
const choosenFigure = canvasStore.getChoosenFigure
const isFilled = canvasStore.getIsFigureFilled

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

function drawRect(event: MouseEvent) {
  if (!isDrawing.value || !canvas.value) {
    return
  }

  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    endX.value = event.offsetX
    endY.value = event.offsetY

    ctx.strokeRect(startX.value, startY.value, endX.value - startX.value, endY.value - startY.value)
    isFilled.value &&
      ctx.fillRect(startX.value, startY.value, endX.value - startX.value, endY.value - startY.value)
  }

  isDrawing.value = false
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

function drawCircle(event: MouseEvent) {
  if (!canvas.value) {
    return
  }

  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    endX.value = event.offsetX
    endY.value = event.offsetY

    const centerX = (startX.value + endX.value)/2
    const centerY = (startY.value + endY.value)/2 
    
    const radius = Math.sqrt(
      (endX.value - centerX) * (endX.value - centerX) +
      (endY.value - centerY) * (endY.value - centerY)
    );
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    if (isFilled.value) {
      ctx.fill();
    }
  }

  isDrawing.value = false

}

function drawLine(event: MouseEvent) {
  if (!isDrawing.value || !canvas.value) {
    return
  }

  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    endX.value = event.offsetX
    endY.value = event.offsetY

    ctx.beginPath()
    ctx.moveTo(startX.value, startY.value)
    ctx.lineTo(endX.value, endY.value)
    ctx.stroke()
  }
}


function stopDrawing() {
  isDrawing.value = false
}

const jopa1 = (event: MouseEvent) => {
  choosenFigure.value === '' ? drawCurve(event) : null
}

const jopa2 = (event: MouseEvent) => {
  switch (choosenFigure.value) {
    case 'rectangle':
      drawRect(event)
      break
    case 'circle':
      drawCircle(event)
      break
    case 'line':
      drawLine(event)
      break
    default:
      stopDrawing()
      break
  }
}
</script>
    // ctx.arc(startX.value, startY.value, endX.value - startX.value, endY.value - startY.value, 2*Math.PI, 2*Math.PI)
    // isFilled.value && ctx.fillRect(startX.value, startY.value, endX.value - startX.value, endY.value - startY.value)
    // https://www.w3schools.com/tags/canvas_arc.asp
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
