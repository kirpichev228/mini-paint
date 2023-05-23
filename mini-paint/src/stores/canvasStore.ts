import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

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
  // сейв неактивен пока сохраняется, удаление картинок своих, анду
  const getColors = computed(() => colors)
  const getFigures = computed(() => figures)
  const getPickedColor = computed(() => pickedColor)
  const getBrushThickness = computed(() => brushThickness)
  const getChoosenFigure = computed(() => choosenFigure)
  const getIsFigureFilled = computed(() => isFigureFilled)
  const getStarVertex = computed(() => starVertex)
  const getPolygonVertex = computed(() => polygonVertex)
  const getCanvas = computed(() => canvas)

  function setPickedColor(color: string) {
    if (pickedColor.value === color) {
      pickedColor.value = '#000000'
    } else {
      pickedColor.value = color
    }
  }
  function setBrushThikness(value: number) {
    brushThickness.value = value
  }
  function addColors(color: string) {
    if (!colors.value.includes(color)) {
      colors.value.push(color)
    }
  }
  function setFigure(figure: string) {
    if (choosenFigure.value === figure) {
      choosenFigure.value = ''
    } else {
      choosenFigure.value = figure
    }
  }
  function setFillState(state: boolean) {
    isFigureFilled.value = state
  }
  function setPolygonVertex(vertex: number) {
    polygonVertex.value = Math.floor(vertex)
  }
  function setStarVertex(vertex: number) {
    starVertex.value = Math.floor(vertex)
  }
  function setCanvas(data: HTMLCanvasElement | null) {
    canvas.value = data
  }
  function setCanvasImage(img: HTMLImageElement) {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    clearCanvas()
    ctx && ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height)
  }
  function clearCanvas() {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    ctx && ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  }
  function saveCanvas() {
    if (!canvas.value) return
    const dataUrl = canvas.value.toDataURL('image/png')
    return dataUrl
  }

  function saveCanvasState(state: HTMLCanvasElement | null) {
    if (!state) return
    const dataUrl = state.toDataURL('image/png')
    canvasState.value.push(dataUrl)
  }

  function loadCanvasState() {
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

  function clearCanvasState() {
    canvasState.value = []
  }

  return {
    getColors,
    getFigures,
    getPickedColor,
    getBrushThickness,
    getChoosenFigure,
    getIsFigureFilled,
    getPolygonVertex,
    getStarVertex,
    getCanvas,
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
