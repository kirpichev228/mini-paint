<template>
  <header>
    <div class="logo">
      <h1>Mini paint</h1>
    </div>
    <ButtonSample> Works gallery </ButtonSample>
    <div class="user-area">
      <h3 class="user-mail">sample@mail.com</h3>
      <ButtonSample> Log Out </ButtonSample>
    </div>
  </header>
</template>

<script setup lang="ts">
import ButtonSample from '@/components/UI/ButtonSample.vue'
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
