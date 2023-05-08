<template>
  <div class="login-wrapper">
    <h2>Login</h2>
    <InputSample
      placeholder="Enter your email"
      type="email"
      v-model="loginForm.email"
    >
      Username
    </InputSample>
    <InputSample
      placeholder="Enter your password"
      type="password"
      v-model="loginForm.password"
      >
      Password
    </InputSample>
    <ButtonSample>
      Login
    </ButtonSample>
    <p>
      Have no account? 
      <RouterLink class="link" to="/registration">Registration</RouterLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ButtonSample from '@/components/UI/ButtonSample.vue';
import InputSample from '@/components/UI/InputSample.vue';

interface LoginForm {
  email: string,
  password: string,
}

const loginForm: LoginForm = reactive({
  email: '',
  password: ''
})
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

.link {
  color: var(--color-secondary);
}

</style>