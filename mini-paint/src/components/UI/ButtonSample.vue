<template>
  <button>
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
button {
  background: none;
  border: 1px solid #000;
  padding: 5px 10px;
  font-size: 17px;
  cursor: pointer;
}

button:disabled {
  color: #ced3d8;
}

button:disabled:hover {
  background-color: var(--color-primary);
  color: #ced3d8;
  cursor: not-allowed;
}

button:hover {
  background-color: #000;
  color: #fff;
}
</style>
