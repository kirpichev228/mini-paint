<template>
  <div class="zoom-wrapper" @click="$emit('zoomOut')">
    <h2>
      {{ imgName }}
    </h2>
    <img :src="imgURL" alt="zoomimg" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  imgURL: String,
  imgName: String
})
</script>

<style scoped>
.zoom-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
  gap: var(--gap);
}

img {
  width: 80%;
  height: 80%;
  background: #fff;
}

h2 {
  position: absolute;
  top: 13%;
  background: var(--color-primary);
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  padding: 5px 15px;
  font-size: 20px;
}
</style>
