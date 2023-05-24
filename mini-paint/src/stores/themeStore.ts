import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('themeStore', () => {
  const primaryColor = ref('#ffffff')
  const secondaryColor = ref('#000000')
  const backgroundColor = ref('#5f6461')
  const shadowColor = ref('#000000')

  const getPrimaryColor = computed<string>(() => primaryColor.value)
  const getSecondaryColor = computed<string>(() => secondaryColor.value)
  const getBackgroundColor = computed<string>(() => backgroundColor.value)
  const getShadowColor = computed<string>(() => shadowColor.value)

  function setPrimaryColor(color: string) {
    document.documentElement.style.setProperty('--color-primary', color)
    primaryColor.value = color
  }
  function setSecondaryColor(color: string) {
    document.documentElement.style.setProperty('--color-secondary', color)
    secondaryColor.value = color
  }
  function setBackgroundColor(color: string) {
    document.documentElement.style.setProperty('--color-background', color)
    backgroundColor.value = color
  }
  function setShadowColor(color: string) {
    document.documentElement.style.setProperty('--color-shadow', `0 0 15px ${color}`)
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
