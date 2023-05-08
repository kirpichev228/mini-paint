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

button:hover {
  background-color: #000;
  color: #fff;
}
</style>
