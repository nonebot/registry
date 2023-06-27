<script setup lang="ts">
import { ref } from "vue";

import {
  NBackTop,
  NConfigProvider,
  NGi,
  NGrid,
  NInput,
  NLayout,
  NLayoutFooter,
  NLayoutHeader,
  NSpace,
  NText,
  dateZhCN,
  zhCN,
} from "naive-ui";
import { storeToRefs } from "pinia";

import { usePageStore } from "@/stores/page";

import GithubButton from "./components/GithubButton.vue";
import ResultTable from "./components/ResultTable.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

const store = usePageStore();
const { theme, results } = storeToRefs(store);
store.initResults();

const searchKeyword = ref("");
</script>

<template>
  <div class="antialiased mx-auto">
    <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
      <n-layout position="absolute">
        <n-layout-header class="p-4" bordered>
          <div class="mx-auto max-w-[90rem]">
            <n-grid class="" x-gap="12" :cols="4">
              <n-gi :span="2" class="flex items-center">
                <img
                  class="mr-1"
                  src="https://nonebot.dev/logo.png"
                  alt="Logo"
                  width="30"
                  height="30"
                />
                <span class="text-lg">商店测试结果</span>
              </n-gi>
              <n-gi class="justify-self-end" :span="2">
                <n-space>
                  <GithubButton />
                  <ThemeSwitcher />
                </n-space>
              </n-gi>
            </n-grid>
          </div>
        </n-layout-header>
        <n-layout class="my-3 max-w-[90rem] mx-auto flex justify-end">
          <n-input
            v-model:value="searchKeyword"
            class="min-w-1/4"
            type="text"
            placeholder="搜索"
        /></n-layout>
        <n-layout class="my-3 max-w-[90rem] mx-auto">
          <ResultTable :results="results" :search-keyword="searchKeyword" />
        </n-layout>
        <n-layout-footer bordered class="p-4">
          <div class="flex justify-center max-w-[90rem] mx-auto">
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
