<template>
  <aside>
    <BrushRange />
    <ColorsBar />
    <FiguresBar />
  </aside>
</template>

<script setup lang="ts">
import ColorsBar from '@/components/ColorsBar.vue'
import FiguresBar from '@/components/FiguresBar.vue'
import BrushRange from '@/components/UI/BrushRange.vue'
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
