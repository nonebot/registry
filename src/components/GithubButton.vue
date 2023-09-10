<script setup lang="ts">
import { mdiGithub } from "@mdi/js";
import { NButton } from "naive-ui";

import Icon from "./Icon.vue";
</script>

<template>
  <n-button
    text
    tag="a"
    href="https://github.com/nonebot/registry"
    target="_blank"
  >
    <Icon :size="24" :path="mdiGithub" />
  </n-button>
</template>
