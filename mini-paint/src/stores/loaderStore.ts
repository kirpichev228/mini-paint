import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoaderStore = defineStore('loaderStore', () => {
  const isLoaderVisible = ref(false)

  function setLoaderStatus() {
    isLoaderVisible.value = !isLoaderVisible.value
  }

  return { isLoaderVisible, setLoaderStatus }
})
