<template>
  <div class="figures-wrapper">
    <h3>Figures</h3>
    <div class="figures-container"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.figures-wrapper {
  width: 100%;
}
.figures-container {
  padding: 10px;
  margin-top: 10px;
  border: 1px solid var(--color-secondary);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
