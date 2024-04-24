<template>
  <button class="button" :class="{ [props.variant]: props.variant }">
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  variant: {
    validator(value) {
      return ["primary", "danger", "success"].includes(value);
    },
    default: "primary",
  },
});
</script>

<style lang="scss" scoped>
.button {
  min-width: 60px;
  cursor: pointer;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 3px;
  padding: 4px;
  transition: opacity linear 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.primary {
  background-color: #a500ed;
}

.danger {
  background-color: red;
}

.success {
  background-color: green;
}
</style>
