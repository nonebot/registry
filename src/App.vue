<script setup lang="ts">
import { ref } from "vue";

import {
  GlobalThemeOverrides,
  NBackTop,
  NConfigProvider,
  NInput,
  NLayout,
  NLayoutFooter,
  NLayoutHeader,
  NText,
  dateZhCN,
  zhCN,
} from "naive-ui";
import { storeToRefs } from "pinia";

import { usePageStore } from "@/stores/page";

import GithubButton from "./components/GithubButton.vue";
import Statistic from "./components/Statistic.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import ResultTable from "./components/result-table/ResultTable.vue";

const store = usePageStore();
const { theme, plugins, results } = storeToRefs(store);
store.initData();

const searchKeyword = ref("");

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
        <n-layout-header class="py-4" bordered>
          <div class="mx-auto lg:max-w-[90rem] max-w-3xl">
            <div class="px-4 sm:px-6 md:px-8 flex items-center">
              <div class="flex-1 flex items-center">
                <img
                  class="mr-1"
                  src="https://nonebot.dev/logo.png"
                  alt="Logo"
                  width="30"
                  height="30"
                />
                <span class="text-lg">商店测试结果</span>
              </div>
              <div class="justify-self-end flex items-center" :span="1">
                <div class="flex items-center gap-3">
                  <GithubButton />
                  <Statistic />
                  <ThemeSwitcher />
                </div>
              </div>
            </div>
          </div>
        </n-layout-header>
        <n-layout
          class="my-3 lg:max-w-[90rem] max-w-3xl mx-auto flex justify-end px-4 sm:px-6 md:px-8"
        >
          <n-input
            v-model:value="searchKeyword"
            class="min-w-1/4"
            type="text"
            placeholder="搜索"
            clearable
        /></n-layout>
        <n-layout
          class="my-3 lg:max-w-[90rem] max-w-3xl mx-auto min-h-screen px-4 sm:px-6 md:px-8"
        >
          <ResultTable
            :plugins="plugins"
            :results="results"
            :search-keyword="searchKeyword"
          />
        </n-layout>
        <n-layout-footer bordered class="p-4">
          <div class="flex justify-center lg:max-w-[90rem] max-w-3xl mx-auto">
            <n-text
              >Copyright &copy; {{ new Date().getFullYear() }} NoneBot. All
              rights reserved.</n-text
            >
          </div>
        </n-layout-footer>
        <n-back-top :right="100" />
      </n-layout>
    </n-config-provider>
  </div>
</template>

<style scoped></style>
