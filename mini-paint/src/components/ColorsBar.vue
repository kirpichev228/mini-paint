<template>
  <div class="colors-wrapper">
    <h3>Colors</h3>
    <div class="color-container"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.colors-wrapper {
  width: 100%;
}
.color-container {
  border: 1px solid var(--color-secondary);
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}
</style>
