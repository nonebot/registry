<script setup lang="ts">
import { NEl } from "naive-ui";

defineProps<{
  label?: string;
  value?: string;
}>();
</script>

<template>
  <n-el
    tag="div"
    class="justify-center items-center inline-flex border border-solid border-[--border-color] mr-2 mb-2 rounded align-middle"
  >
    <span class="py-1 px-2 whitespace-nowrap">
      <div v-if="label">{{ label }}</div>
      <slot v-else name="label"></slot>
    </span>
    <span
      class="py-1 px-2 rounded bg-[--n-color-embedded] border-l border-l-solid border-l-[--border-color] rounded-l-unset"
    >
      <div v-if="value">{{ value }}</div>
      <slot v-else></slot>
    </span>
  </n-el>
</template>

<style scoped></style>
