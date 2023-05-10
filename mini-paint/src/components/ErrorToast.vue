<template>
  <div class="toastWrapper">
    {{ errorStore.getErrorMessage.value }}
  </div>
</template>

<script setup lang="ts">
import { useErrorStore } from '@/stores/errorStore'

const errorStore = useErrorStore()
</script>

<style scoped>
.toastWrapper {
  width: 300px;
  min-height: 100px;
  padding: 10px;
  border: 1px solid var(--color-secondary);
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
  position: absolute;
  bottom: 50px;
  right: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
