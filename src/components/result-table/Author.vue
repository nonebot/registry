<script setup lang="ts">
import { NButton } from "naive-ui";

defineProps<{ author: string }>();
</script>

<template>
  <n-button
    text
    tag="a"
    :href="`https://github.com/${author}/`"
    target="_blank"
  >
    {{ author }}
  </n-button>
</template>
