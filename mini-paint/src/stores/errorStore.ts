import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useErrorStore = defineStore('errorStore', () => {
  const errorMessage = ref('')
  const errorToastStatus = ref(false)

  const getErrorMessage = computed(() => errorMessage)
  const getErrorModalStatus = computed(() => errorToastStatus)

  function showErrorToast (message: string) {
    errorMessage.value = message
    errorToastStatus.value = true
    setTimeout(() => {
      errorToastStatus.value = false
    }, 5000);
  }

  return { getErrorMessage, getErrorModalStatus, showErrorToast }
})