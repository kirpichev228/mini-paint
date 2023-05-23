<template>
  <main class="wrapper">
    <SideBar />
    <CanvasComponent />
  </main>
</template>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
import CanvasComponent from '@/components/CanvasComponent.vue'
</script>

<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  gap: var(--gap);
}
</style>
