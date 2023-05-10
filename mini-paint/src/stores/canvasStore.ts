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
  const pickedColor = ref('')
  const brushThickness = ref('1')

  const getColors = computed(() => colors)
  const getPickedColor = computed(() => pickedColor)
  const getBrushThickness = computed(() => brushThickness)

  function setPickedColor(color: string) {
    pickedColor.value = color
  }
  function setBrushThikness(value: string) {
    brushThickness.value = value
  }
  function addColors(color: string) {
    if (!colors.value.includes(color)) {
      colors.value.push(color)
    }
  }

  return {
    getColors,
    getPickedColor,
    getBrushThickness,
    addColors,
    setPickedColor,
    setBrushThikness
  }
})
