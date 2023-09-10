<script setup lang="ts">
import { NIcon } from "naive-ui";

withDefaults(
  defineProps<{
    size?: number | string;
    viewBox?: string;
    color?: string;
    path: string;
  }>(),
  {
    size: undefined,
    color: undefined,
    viewBox: "0 0 24 24",
  },
);
</script>

<template>
  <n-icon :size="size" :color="color">
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="viewBox">
      <path :d="path" />
    </svg>
  </n-icon>
</template>

<style scoped></style>
