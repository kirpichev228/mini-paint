import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('themeStore', () => {
  const primaryColor = ref('#ffffff')
  const secondaryColor = ref('#000000')
  const backgroundColor = ref('#5f6461')
  const shadowColor = ref('#000000')

  function setPrimaryColor(color: string): void {
    document.documentElement.style.setProperty('--color-primary', color)
    primaryColor.value = color
  }
  function setSecondaryColor(color: string): void {
    document.documentElement.style.setProperty('--color-secondary', color)
    secondaryColor.value = color
  }
  function setBackgroundColor(color: string): void {
    document.documentElement.style.setProperty('--color-background', color)
    backgroundColor.value = color
  }
  function setShadowColor(color: string): void {
    document.documentElement.style.setProperty('--color-shadow', `0 0 15px ${color}`)
    shadowColor.value = color
  }

  return {
    primaryColor,
    secondaryColor,
    backgroundColor,
    shadowColor,
    setPrimaryColor,
    setSecondaryColor,
    setBackgroundColor,
    setShadowColor
  }
})
