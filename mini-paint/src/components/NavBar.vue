<template>
  <header>
    <div class="logo">
      <h1>Mini paint</h1>
    </div>
    <ButtonSample v-if="userStore.getAuthorizationStatus.value" @click="galleryRedirect">
      Works gallery
    </ButtonSample>
    <div v-if="userStore.getAuthorizationStatus.value" class="user-area">
      <h3 class="user-mail">sample@mail.com</h3>
      <ButtonSample @click="logOut"> Log Out </ButtonSample>
    </div>
  </header>
</template>

<script setup lang="ts">
import router from '@/router'
import ButtonSample from '@/components/UI/ButtonSample.vue'
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

const authStore = useAuthStore()
const userStore = useUserStore()

const logOut = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.log(error)
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

.user-area {
  display: flex;
  gap: var(--gap);
  align-items: center;
}
</style>
