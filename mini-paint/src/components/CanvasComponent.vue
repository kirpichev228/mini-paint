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

    const centerX = (startX.value + endX.value) / 2
    const centerY = (startY.value + endY.value) / 2

    const radius = Math.sqrt(
      (endX.value - centerX) * (endX.value - centerX) +
        (endY.value - centerY) * (endY.value - centerY)
    )
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.stroke()

    if (isFilled.value) {
      ctx.fill()
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

function drawPolygon(event: MouseEvent, vertexAmount: number) {
  if (!canvas.value) {
    return
  }

  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    endX.value = event.offsetX
    endY.value = event.offsetY

    const centerX = (startX.value + endX.value) / 2
    const centerY = (startY.value + endY.value) / 2

    const radius = Math.sqrt(
      (endX.value - centerX) * (endX.value - centerX) +
        (endY.value - centerY) * (endY.value - centerY)
    )

    const angle = (Math.PI * 2) / vertexAmount

    ctx.beginPath()
    ctx.moveTo(centerX + radius * Math.cos(0), centerY + radius * Math.sin(0))

    for (let i = 1; i <= vertexAmount; i++) {
      const x = centerX + radius * Math.cos(i * angle)
      const y = centerY + radius * Math.sin(i * angle)
      ctx.lineTo(x, y)
    }

    ctx.stroke()

    if (isFilled.value) {
      ctx.fill()
    }
  }

  isDrawing.value = false
}

function drawStar(event: MouseEvent, vertexAmount: number) {
  if (!canvas.value) {
    return
  }

  const ctx = canvas.value.getContext('2d')
  if (ctx) {
    endX.value = event.offsetX
    endY.value = event.offsetY

    const centerX = (startX.value + endX.value) / 2
    const centerY = (startY.value + endY.value) / 2
    const radius = Math.sqrt((endX.value - centerX) ** 2 + (endY.value - centerY) ** 2)
    const innerRadius = radius / 2.5

    const points = []
    for (let i = 0; i < vertexAmount * 2; i++) {
      const angle = (Math.PI / vertexAmount) * i - Math.PI / 2
      const radiusAtAngle = i % 2 === 0 ? radius : innerRadius
      const x = centerX + radiusAtAngle * Math.cos(angle)
      const y = centerY + radiusAtAngle * Math.sin(angle)
      points.push({ x, y })
    }

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < vertexAmount * 2; i++) {
      const point = points[i % (vertexAmount * 2)]
      ctx.lineTo(point.x, point.y)
    }
    ctx.closePath()
    ctx.stroke()

    if (isFilled.value) {
      ctx.fill()
    }
  }

  isDrawing.value = false
}

function stopDrawing() {
  isDrawing.value = false
}

const figureCheck = (event: MouseEvent) => {
  choosenFigure.value === '' ? drawCurve(event) : null
}

const figureDraw = (event: MouseEvent) => {
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
    case 'polygon':
      drawPolygon(event, polygonVertex.value)
      break
    case 'square':
      drawPolygon(event, 4)
      break
    case 'triangle':
      drawPolygon(event, 3)
      break
    case 'star':
      drawStar(event, starVertex.value)
      break
    default:
      stopDrawing()
      break
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
