<template>
  <aside>
    <BrushRange />
    <ColorsBar />
    <CustomColor />
    <FiguresBar />
    <ButtonSample> Save in gallery </ButtonSample>
  </aside>
</template>

<script setup lang="ts">
import ColorsBar from '@/components/ColorsBar.vue'
import FiguresBar from '@/components/FiguresBar.vue'
import BrushRange from '@/components/UI/BrushRange.vue'
import CustomColor from './UI/CustomColor.vue'
import ButtonSample from './UI/ButtonSample.vue'
</script>

<style scoped>
aside {
  max-height: 90vh;
  width: 20vw;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--gap);
  align-items: flex-start;
  overflow-y: scroll;
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
