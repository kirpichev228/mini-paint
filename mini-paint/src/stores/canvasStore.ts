import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCanvasStore = defineStore('canvasStore', () => {
  const colors = ref([
    '#f40000',
    '#00ff01',
    '#ffff11',
    '#ff6400',
    '#0000ee',
    '#ff00fe',
    '#632a9f',
    '#000000',
    '#652700'
  ])
  const figures = ref(['line', 'circle', 'rectangle', 'star', 'polygon', 'square', 'triangle'])
  const pickedColor = ref('#000000')
  const brushThickness = ref(1)
  const choosenFigure = ref('')
  const isFigureFilled = ref(false)
  const starVertex = ref(5)
  const polygonVertex = ref(5)
  const canvas = ref<HTMLCanvasElement | null>(null)
  const canvasState = ref<string[]>([])

  function setPickedColor(color: string): void {
    if (pickedColor.value === color) {
      pickedColor.value = '#000000'
    } else {
      pickedColor.value = color
    }
  }
  function setBrushThikness(value: number): void {
    brushThickness.value = value
  }
  function addColors(color: string): void {
    if (!colors.value.includes(color)) {
      colors.value.push(color)
    }
  }
  function setFigure(figure: string): void {
    if (choosenFigure.value === figure) {
      choosenFigure.value = ''
    } else {
      choosenFigure.value = figure
    }
  }
  function setFillState(state: boolean): void {
    isFigureFilled.value = state
  }
  function setPolygonVertex(vertex: number): void {
    polygonVertex.value = Math.floor(vertex)
  }
  function setStarVertex(vertex: number): void {
    starVertex.value = Math.floor(vertex)
  }
  function setCanvas(data: HTMLCanvasElement | null): void {
    canvas.value = data
  }
  function setCanvasImage(img: HTMLImageElement): void {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    clearCanvas()
    ctx && ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
  }
  function clearCanvas(): void {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    ctx && ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  }
  function saveCanvas(): string | undefined {
    if (!canvas.value) return
    const dataUrl = canvas.value.toDataURL('image/png')
    return dataUrl
  }

  function saveCanvasState(state: HTMLCanvasElement | null): void {
    if (!state) return
    const dataUrl = state.toDataURL('image/png')
    canvasState.value.push(dataUrl)
  }

  function loadCanvasState(): void {
    if (canvasState.value.length === 0) return
    canvasState.value.pop()!
    const previousState = canvasState.value[canvasState.value.length - 1]
    const img = new Image()
    img.onload = () => {
      if (!canvas.value) return
      const ctx = canvas.value.getContext('2d')
      clearCanvas()
      ctx && ctx.drawImage(img, 0, 0)
    }
    img.src = previousState
  }

  function clearCanvasState(): void {
    canvasState.value = []
  }

  return {
    colors,
    figures,
    pickedColor,
    brushThickness,
    choosenFigure,
    isFigureFilled,
    starVertex,
    polygonVertex,
    canvas,
    canvasState,
    addColors,
    setPickedColor,
    setBrushThikness,
    setFigure,
    setFillState,
    setStarVertex,
    setPolygonVertex,
    setCanvas,
    clearCanvas,
    setCanvasImage,
    saveCanvas,
    saveCanvasState,
    loadCanvasState,
    clearCanvasState
  }
})
