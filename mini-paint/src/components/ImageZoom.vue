<template>
  <div class="zoom-wrapper" @click="$emit('zoomOut')">
    <img :src="imgURL" alt="zoomimg">
  </div>
</template>

<script setup lang="ts">
defineProps({
  imgURL: String
})
</script>

<style scoped>
.zoom-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
}

img {
  width: 80%;
  height: 80%;
  background: #fff;
}
</style>