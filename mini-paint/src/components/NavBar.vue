<template>
  <header>
    <div class="logo">
      <h1>Mini paint</h1>
      <ButtonSample @click="modalStatus = !modalStatus"> Change theme </ButtonSample>
      <Transition name="modal">
        <ThemeModal v-if="modalStatus" />
      </Transition>
      <RouterLink class="link" v-if="userStore.getAuthorizationStatus.value" to="/gallery">
        Gallery
      </RouterLink>
      <RouterLink class="link" v-if="userStore.getAuthorizationStatus.value" to="/">
        Draw page
      </RouterLink>
    </div>
    <LoaderComponent v-if="loaderStore.getLoaderStatus.value" />
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
import { useLoaderStore } from '@/stores/loaderStore'
import LoaderComponent from '@/components/UI/LoaderComponent.vue'

const authStore = useAuthStore()
const userStore = useUserStore()
const errorStore = useErrorStore()
const loaderStore = useLoaderStore()

const modalStatus = ref(false)

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
