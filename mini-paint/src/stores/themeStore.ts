import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('themeStore', () => {
  const primaryColor = ref('#ffffff')
  const secondaryColor = ref('#000000')
  const backgroundColor = ref('#5f6461')
  const shadowColor = ref('#000000')

  const getPrimaryColor = computed(() => primaryColor.value)
  const getSecondaryColor = computed(() => secondaryColor.value)
  const getBackgroundColor = computed(() => backgroundColor.value)
  const getShadowColor = computed(() => shadowColor.value)

  function setPrimaryColor(color: string) {
    primaryColor.value = color
  }
  function setSecondaryColor(color: string) {
    secondaryColor.value = color
  }
  function setBackgroundColor(color: string) {
    backgroundColor.value = color
  }
  function setShadowColor(color: string) {
    shadowColor.value = color
  }

  return {
    getPrimaryColor,
    getSecondaryColor,
    getBackgroundColor,
    getShadowColor,
    setPrimaryColor,
    setSecondaryColor,
    setBackgroundColor,
    setShadowColor
  }
})
