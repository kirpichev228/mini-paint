<template>
  <aside>
    asd
    <ColorsBar> </ColorsBar>
    <FiguresBar />
  </aside>
</template>

<script setup lang="ts">
import ColorsBar from '@/components/ColorsBar.vue'
import FiguresBar from '@/components/FiguresBar.vue'
// import { useCanvasStore } from '@/stores/canvasStore';

// const canvasStore = useCanvasStore()

// const colors = canvasStore.getColors.value
</script>

<style scoped>
aside {
  height: 100%;
  width: 20vw;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--gap);
  align-items: flex-start;
}
</style>
