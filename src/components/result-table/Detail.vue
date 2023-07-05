<script setup lang="ts">
import { NButton } from "naive-ui";

defineProps<{ pypi: string; module: string }>();
</script>

<template>
  <router-link :to="`/plugin/${pypi}:${module}?loaded=true`">
    <n-button> 详情 </n-button>
  </router-link>
</template>
