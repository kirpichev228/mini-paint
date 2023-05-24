<template>
  <header>
    <div class="logo">
      <h1>Mini paint</h1>
      <ButtonSample @click="modalStatus = !modalStatus"> Change theme </ButtonSample>
      <Transition name="modal">
        <ThemeModal v-if="modalStatus" />
      </Transition>
      <ButtonSample @click="loadImage" v-if="authStatus"
        >Open File</ButtonSample
      >
      <RouterLink class="link" v-if="userStore.isAuthorized" to="/">
        Gallery
      </RouterLink>
      <RouterLink class="link" v-if="userStore.isAuthorized" to="/draw">
        Draw page
      </RouterLink>
    </div>
    <LoaderComponent v-if="loaderStore.isLoaderVisible" />
    <div v-if="userStore.isAuthorized" class="user-area">
      <h3 class="user-mail">
        {{ userStore.user.email }}
      </h3>
      <ButtonSample @click="logOut"> Log Out </ButtonSample>
    </div>
  </header>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref, computed } from 'vue'
import ButtonSample from '@/components/UI/ButtonSample.vue'
import ThemeModal from '@/components/ThemeModal.vue'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import { useErrorStore } from '@/stores/errorStore'
import { useLoaderStore } from '@/stores/loaderStore'
import { useCanvasStore } from '@/stores/canvasStore'

import LoaderComponent from '@/components/UI/LoaderComponent.vue'

const authStore = useAuthStore()
const userStore = useUserStore()
const errorStore = useErrorStore()
const loaderStore = useLoaderStore()
const canvasStore = useCanvasStore()

const modalStatus = ref(false)
const authStatus = computed(() => userStore.isAuthorized)

const logOut = async () => {
  try {
    loaderStore.setLoaderStatus()
    await authStore.logout()
    router.push('/login')
  } catch (error: unknown) {
    errorStore.showErrorToast(String(error))
  } finally {
    loaderStore.setLoaderStatus()
  }
}

const loadImage = (): void => {
  const input: HTMLInputElement = document.createElement('input')
  input.type = 'file'
  input.addEventListener('change', (event: Event) => {
    const file: File | undefined = (event.target as HTMLInputElement)?.files?.[0]
    if (!file) {
      return
    }
    const reader: FileReader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      const img: HTMLImageElement = new Image()
      img.addEventListener('load', () => {
        canvasStore.setCanvasImage(img)
      })
      if (!reader.result) {
        return
      }
      img.src = reader.result.toString()
    })
  })

  input.click()
}
</script>

<style scoped>
header {
  width: 100%;
  min-height: 5vh;
  padding: 5px 20px;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 20px;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translateY(-430px);
}

.link {
  color: black;
}

.user-area {
  display: flex;
  gap: var(--gap);
  align-items: center;
}
</style>
