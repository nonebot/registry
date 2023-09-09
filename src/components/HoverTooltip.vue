<script setup lang="ts">
import { NTooltip } from "naive-ui";

defineProps<{
  source: string;
  tip: string;
}>();
</script>

<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      {{ source }}
    </template>
    {{ tip }}
  </n-tooltip>
</template>

<style scoped></style>
