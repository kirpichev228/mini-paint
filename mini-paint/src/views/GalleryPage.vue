<template>
  <main class="gallery-wrapper">
    <h2 class="gallery-heading">Your works gallery</h2>
    <div class="works-containher"></div>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped>
.gallery-wrapper {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
}

.gallery-heading {
  font-size: 28px;
}

.works-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 1em;
  overflow-y: scroll;
}
</style>
