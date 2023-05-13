<template>
  <div class="theme-wrapper">
    <label>
      Primary
      <input type="color" :value="themeStore.getPrimaryColor" @change="setPrimary" />
    </label>
    <label>
      Secondary
      <input type="color" :value="themeStore.getSecondaryColor" @change="setSecondary" />
    </label>
    <label>
      Background
      <input type="color" :value="themeStore.getBackgroundColor" @change="setBackground" />
    </label>
    <label>
      Shadow
      <input type="color" :value="themeStore.getShadowColor" @change="setShadow" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/themeStore'

const themeStore = useThemeStore()

const setPrimary = (event: Event): void => {
  const target = event.target as HTMLInputElement
  themeStore.setPrimaryColor(target.value)
}

const setSecondary = (event: Event): void => {
  const target = event.target as HTMLInputElement
  themeStore.setSecondaryColor(target.value)
}

const setBackground = (event: Event): void => {
  const target = event.target as HTMLInputElement
  themeStore.setBackgroundColor(target.value)
}

const setShadow = (event: Event): void => {
  const target = event.target as HTMLInputElement
  themeStore.setShadowColor(target.value)
}
</script>

<style scoped>
.theme-wrapper {
  position: absolute;
  z-index: 2;
  top: 9.3%;
  left: 11%;
  width: 200px;
  height: 200px;
  padding: 20px;
  background: var(--color-primary);
  box-shadow: var(--color-shadow);
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

label {
  display: flex;
  justify-content: space-between;
}
</style>
