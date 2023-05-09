<template>
  <div class="registration-wrapper">
    <h2>Registration</h2>
    <form class="form" @submit.prevent="null">
      <InputSample placeholder="Enter your email" type="email" v-model="registrationForm.email">
        Username
      </InputSample>
      <InputSample
        placeholder="Enter your password"
        type="password"
        v-model="registrationForm.password"
      >
        Password
      </InputSample>
      <InputSample
        placeholder="Confirm your password"
        type="password"
        v-model="registrationForm.confirm"
      >
        Confirm
      </InputSample>
      <ButtonSample :disabled="isPassIncorrect" @click="register">
        {{ isPassIncorrect ? 'Passwords didnt match' : 'Register' }}
      </ButtonSample>
    </form>
    <p>
      Already have an account?
      <RouterLink class="link" to="/login">Login</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import ButtonSample from '@/components/UI/ButtonSample.vue'
import InputSample from '@/components/UI/InputSample.vue'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

const authStore = useAuthStore()

interface RegisterForm {
  email: string
  password: string
  confirm: string
}

const registrationForm: RegisterForm = reactive({
  email: '',
  password: '',
  confirm: ''
})

const isPassIncorrect = computed(
  (): boolean => registrationForm.confirm !== registrationForm.password
)

const register = async () => {
  try {
    await authStore.registration(registrationForm.email, registrationForm.password)
    router.push('/')
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.registration-wrapper {
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
