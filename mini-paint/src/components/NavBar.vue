<template>
  <header>
    <div class="logo">
      <h1>Mini paint</h1>
      <ButtonSample
        v-if="userStore.getAuthorizationStatus.value"
        @click="modalStatus = !modalStatus"
      >
        Change theme
      </ButtonSample>
      <Transition name="modal">
        <ThemeModal v-if="modalStatus" />
      </Transition>
    </div>
    <ButtonSample v-if="userStore.getAuthorizationStatus.value" @click="galleryRedirect">
      Works gallery
    </ButtonSample>
    <div v-if="userStore.getAuthorizationStatus.value" class="user-area">
      <h3 class="user-mail">
        {{ userStore.getUser.value.email }}
      </h3>
      <ButtonSample @click="logOut"> Log Out </ButtonSample>
    </div>
  </header>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import ButtonSample from '@/components/UI/ButtonSample.vue'
import ThemeModal from '@/components/ThemeModal.vue'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'
import { useErrorStore } from '@/stores/errorStore'

const authStore = useAuthStore()
const userStore = useUserStore()
const errorStore = useErrorStore()

const modalStatus = ref(false)

const logOut = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    errorStore.showErrorToast(error)
  }
}

const galleryRedirect = (): void => {
  router.push('/gallery')
}
</script>

<style scoped>
header {
  width: 100%;
  height: 7vh;
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

.user-area {
  display: flex;
  gap: var(--gap);
  align-items: center;
}
</style>
