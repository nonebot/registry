<script setup lang="ts">
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

const store = usePageStore();
const { theme } = storeToRefs(store);
store.initData();

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
    >
      <n-layout position="absolute">
        <Header></Header>
        <n-layout class="my-3 min-h-screen">
          <router-view></router-view>
        </n-layout>
        <Footer></Footer>
        <n-back-top :right="100" />
      </n-layout>
    </n-config-provider>
  </div>
</template>

<style scoped></style>
