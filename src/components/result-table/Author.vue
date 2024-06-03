<script setup lang="ts">
import { NA } from "naive-ui";

defineProps<{ author: string; dense?: boolean }>();
</script>

<template>
  <n-a
    class="text-inherit no-underline hover:color-[#ea5252]"
    :class="{
      'mr-[15px]': dense,
    }"
    :href="`https://github.com/${author}/`"
    target="_blank"
  >
    {{ author }}
  </n-a>
</template>
