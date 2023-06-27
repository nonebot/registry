<script setup lang="ts">
import { NButton, darkTheme } from "naive-ui";
import { storeToRefs } from "pinia";

import { usePageStore } from "@/stores/page";

const store = usePageStore();
const { theme } = storeToRefs(store);
</script>

<template>
  <n-button @click="() => store.setTheme(theme === null ? darkTheme : null)">
    {{ theme === null ? "深色" : "浅色" }}
  </n-button>
</template>
