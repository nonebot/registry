<script setup lang="ts">
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
hljs.registerLanguage("json", json);
import {
  GlobalThemeOverrides,
  NBackTop,
  NConfigProvider,
  NLayout,
  dateZhCN,
  zhCN,
} from "naive-ui";
import { storeToRefs } from "pinia";
const store = usePageStore();
const { theme } = storeToRefs(store);
store.initData();

import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import { usePageStore } from "@/stores/page";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#ea5252",
    primaryColorHover: "#ea5252",
    primaryColorPressed: "#ea5252",
  },
};
</script>

<template>
  <div class="antialiased mx-auto">
    <n-config-provider
      :theme="theme"
      :theme-overrides="themeOverrides"
      :locale="zhCN"
      :date-locale="dateZhCN"
      :hljs="hljs"
    >
      <n-layout position="absolute" :native-scrollbar="false">
        <div class="min-h-screen flex flex-col">
          <Header></Header>
          <n-layout
            class="my-3 w-full lg:max-w-[90rem] max-w-3xl mx-auto px-4 sm:px-6 md:px-8"
          >
            <router-view></router-view>
          </n-layout>
          <Footer></Footer>
          <n-back-top />
        </div>
      </n-layout>
    </n-config-provider>
  </div>
</template>

<style scoped></style>
