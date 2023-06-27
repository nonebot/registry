<script setup lang="ts">
import { NButton } from "naive-ui";
import { storeToRefs } from "pinia";
import WeatherNight from "vue-material-design-icons/WeatherNight.vue";
import WeatherSunny from "vue-material-design-icons/WeatherSunny.vue";

import { usePageStore } from "@/stores/page";

const store = usePageStore();
const { theme } = storeToRefs(store);
</script>

<template>
  <n-button text @click="() => store.toggleDark()">
    <WeatherSunny v-if="theme === null" />
    <WeatherNight v-else />
  </n-button>
</template>
