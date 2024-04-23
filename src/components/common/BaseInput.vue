<template>
  <input
    :type="type"
    :placeholder="placeholder"
    class="input"
    v-model="model"
    ref="inputRef"
  />
</template>

<script setup>
import { defineProps, defineModel, ref, defineExpose } from "vue";

const model = defineModel();
const inputRef = ref(null);

defineProps({
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
});

defineExpose({
  focus() {
    inputRef.value.focus();
  },
});
</script>

<style lang="scss" scoped>
.input {
  border: 1px solid #ccc;
  font-size: 16px;
  padding: 10px 8px;
  border-radius: 3px;
  outline: none;
  width: 100%;
}
</style>
