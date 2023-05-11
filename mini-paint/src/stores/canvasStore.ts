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
  const figures = ref(['line', 'circle', 'rectangle', 'star', 'polygon'])
  const pickedColor = ref('#000000')
  const brushThickness = ref(1)
  const choosenFigure = ref('')

  const getColors = computed(() => colors)
  const getFigures = computed(() => figures)
  const getPickedColor = computed(() => pickedColor)
  const getBrushThickness = computed(() => brushThickness)
  const getChoosenFigure = computed(() => choosenFigure)

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

  return {
    getColors,
    getFigures,
    getPickedColor,
    getBrushThickness,
    getChoosenFigure,
    addColors,
    setPickedColor,
    setBrushThikness,
    setFigure
  }
})
