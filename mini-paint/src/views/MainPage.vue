<template>
  <div class="wrapper">
    <SideBar />
  </div>
</template>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
</script>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  gap: var(--gap);
}
</style>
