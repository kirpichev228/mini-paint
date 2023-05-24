import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useErrorStore = defineStore('errorStore', () => {
  const errorMessage = ref('')
  const errorToastStatus = ref(false)

  function showErrorToast(message: string) {
    errorMessage.value = message
    errorToastStatus.value = true
    setTimeout(() => {
      errorToastStatus.value = false
    }, 5000)
  }

  return { errorMessage, errorToastStatus, showErrorToast }
})
