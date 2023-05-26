<template>
  <div class="modal-wrapper">
    <form class="modal-window" @submit.prevent="savePic">
      <InputSample
        type="text"
        placeholder="Give a name for your masterpiece"
        length="20"
        v-model="picName"
      >
        Name
      </InputSample>
      <ButtonSample type="submit" class="button" :disabled="!picName.length || disability">
        Save
      </ButtonSample>
    </form>
  </div>
</template>

<script setup lang="ts">
import ButtonSample from './ButtonSample.vue';
import InputSample from './InputSample.vue';
import { ref, defineEmits, defineProps } from 'vue'

defineProps({
  disability: {
    type: Boolean,
    defalult: false
  }
})
const emit = defineEmits(['save'])

const picName = ref('')

const savePic = () => {
  emit('save', picName.value)
}
</script>

<style scoped>
  .modal-wrapper {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
    z-index: 20;
  }

  .modal-window {
    box-shadow: var(--color-shadow);
    display: flex;
    flex-direction: column;
    background-color: var(--color-primary);
    padding: var(--gap);
    width: 30vw;
    gap: var(--gap);
  }

  .button {
    align-self: flex-end;
  }
</style>