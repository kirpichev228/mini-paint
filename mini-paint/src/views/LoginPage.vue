<template>
  <div class="login-wrapper">
    <h2>Login</h2>
    <form class="form" @submit.prevent="null">
      <InputSample placeholder="Enter your email" type="email" v-model="loginForm.email">
        Username
      </InputSample>
      <InputSample placeholder="Enter your password" type="password" v-model="loginForm.password">
        Password
      </InputSample>
      <ButtonSample @click="login"> Login </ButtonSample>
    </form>
    <p>
      Have no account?
      <RouterLink class="link" to="/registration">Registration</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ButtonSample from '@/components/UI/ButtonSample.vue'
import InputSample from '@/components/UI/InputSample.vue'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'
import { useErrorStore } from '@/stores/errorStore'
import { useLoaderStore } from '@/stores/loaderStore'

interface LoginForm {
  email: string
  password: string
}

const authStore = useAuthStore()
const errorStore = useErrorStore()
const loaderStore = useLoaderStore()

const loginForm: LoginForm = reactive({
  email: '',
  password: ''
})

const login = async (): Promise<void> => {
  try {
    loaderStore.setLoaderStatus()
    await authStore.login(loginForm.email, loginForm.password)
    router.push('/')
  } catch (error: unknown) {
    errorStore.showErrorToast(String(error))
  } finally {
    loaderStore.setLoaderStatus()
  }
}
</script>

<style scoped>
.login-wrapper {
  margin: auto;
  padding: 20px;
  width: 700px;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.link {
  color: var(--color-secondary);
}
</style>
