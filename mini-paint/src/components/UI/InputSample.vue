<template>
  <label>
    <slot></slot>
    <input
      :type="type"
      :placeholder="placeholder"
      :maxlength="length"
      :value="modelValue"
      @input="handleInput"
      required
    >
  </label>
</template>

<script setup lang="ts">

defineProps({
  type: String,
  length: String,
  placeholder: String,
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
label {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
input {
  outline: none;
  width: 80%;
  height: 30px;
  padding: 5px;
  font-size: 18px;
}
</style>