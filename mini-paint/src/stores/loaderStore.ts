import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useLoaderStore = defineStore('loaderStore', () => {
  const isLoaderVisible = ref(false)

  const getLoaderStatus = computed<Ref<boolean>>(() => isLoaderVisible)

  function setLoaderStatus() {
    isLoaderVisible.value = !isLoaderVisible.value
  }

  return { getLoaderStatus, setLoaderStatus }
})
