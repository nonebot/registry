<script setup lang="ts">
import { inject } from "vue";

import type { GlobalTheme } from "naive-ui";
import { NButton, darkTheme, lightTheme } from "naive-ui";

const { setTheme } = inject("theme") as {
  setTheme: (value: GlobalTheme | null) => void;
};
</script>

<template>
  <n-button @click="setTheme(darkTheme)"> 深色 </n-button>
  <n-button @click="setTheme(lightTheme)"> 浅色 </n-button>
</template>
