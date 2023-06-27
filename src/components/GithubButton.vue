<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import Github from "vue-material-design-icons/Github.vue";
</script>

<template>
  <n-button
    text
    tag="a"
    href="https://github.com/nonebot/registry"
    target="_blank"
  >
    <n-icon size="24">
      <Github />
    </n-icon>
  </n-button>
</template>
