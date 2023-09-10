<script setup lang="ts">
import { mdiWeatherNight, mdiWeatherSunny } from "@mdi/js";
import { NButton } from "naive-ui";
import { storeToRefs } from "pinia";

import { usePageStore } from "@/stores/page";

import Icon from "./Icon.vue";

const store = usePageStore();
const { theme } = storeToRefs(store);
</script>

<template>
  <n-button text @click="store.toggleDark()">
    <Icon v-if="theme" :size="24" :path="mdiWeatherNight" />
    <Icon v-else :size="24" :path="mdiWeatherSunny" />
  </n-button>
</template>
