<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import Github from "vue-material-design-icons/Github.vue";
</script>

<template>
  <n-button
    style="font-size: 24px"
    tag="a"
    href="https://github.com/nonebot/registry"
    target="_blank"
  >
    <n-icon>
      <Github />
    </n-icon>
  </n-button>
</template>
