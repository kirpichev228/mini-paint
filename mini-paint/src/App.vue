<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="app-wrapper">
    <NavBar />
    <RouterView />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');

:root {
  --color-primary: #fff;
  --color-secondary: #000;
  --color-shadow: 0 0 15px black;
  --color-background: #5f6461;
  --gap: 15px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Josefin Sans', sans-serif;
  transition-duration: 0.3s;
}

.app-wrapper {
  background: var(--color-background);
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
