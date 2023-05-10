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
    '#ffffff',
    '#652700'
  ])
  const pickedColor = ref('')

  const getColors = computed(() => colors)
  const getPickedColor = computed(() => pickedColor)

  function setPickedColor(color: string) {
    pickedColor.value = color
  }

  return { getColors, getPickedColor, setPickedColor }
})
