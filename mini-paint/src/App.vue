<script setup lang="ts">
import { onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { useUserStore } from '@/stores/userStore'
import ErrorToast from './components/ErrorToast.vue'
import { useErrorStore } from './stores/errorStore'

const userStore = useUserStore()
const errorStore = useErrorStore()

onMounted(() => {
  userStore.setUser()
})
</script>

<template>
  <div class="app-wrapper">
    <NavBar />
    <RouterView />
    <Transition name="error">
      <ErrorToast v-if="errorStore.getErrorModalStatus.value" />
    </Transition>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');

:root {
  --color-primary: #fff;
  --color-secondary: #000;
  --color-shadow: 0 0 15px black;
  --color-background: #5f6461;
  --gap: 15px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Josefin Sans', sans-serif;
  transition-duration: 0.3s;
}

.app-wrapper {
  background: var(--color-background);
  width: 100vw;
  height: 100vh;
  padding: var(--gap);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  overflow: hidden;
}

.error-enter-active,
.error-leave-active {
  transition: all 0.5s ease;
}
.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-background);
  border-radius: 10px;
}
</style>
