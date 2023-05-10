import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLoaderStore = defineStore('loaderStore', () => {
  const isLoaderVisible = ref(false)

  const getLoaderStatus = computed(() => isLoaderVisible)

  function setLoaderStatus() {
    isLoaderVisible.value = !isLoaderVisible.value
  }

  return { getLoaderStatus, setLoaderStatus }
})
