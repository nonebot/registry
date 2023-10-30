<script setup lang="ts">
import { onMounted } from "vue";

import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import {
  GlobalThemeOverrides,
  NBackTop,
  NConfigProvider,
  NLayout,
  dateZhCN,
  zhCN,
} from "naive-ui";
import { storeToRefs } from "pinia";

import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { usePageStore } from "@/stores/page";

hljs.registerLanguage("json", json);
const store = usePageStore();
const { theme } = storeToRefs(store);

onMounted(async () => {
  await store.initData();
});

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#ea5252",
    primaryColorHover: "#ea5252",
    primaryColorPressed: "#ea5252",
  },
};
</script>

<template>
  <n-config-provider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :hljs="hljs"
  >
    <div class="antialiased mx-auto">
      <n-layout position="absolute" :native-scrollbar="false">
        <div class="min-h-screen flex flex-col">
          <Header></Header>
          <n-layout
            class="my-3 w-full lg:max-w-[90rem] max-w-3xl mx-auto px-4 sm:px-6 md:px-8"
          >
            <router-view :key="$route.fullPath"></router-view>
          </n-layout>
          <Footer></Footer>
          <n-back-top />
        </div>
      </n-layout>
    </div>
  </n-config-provider>
</template>

<style scoped></style>
