<script setup lang="ts">
import {
  NConfigProvider,
  NBackTop,
  NLayout,
  NLayoutHeader,
  NSpace,
  NGrid,
  NGi,
} from "naive-ui";
import { storeToRefs } from "pinia";

import { usePageStore } from "@/stores/page";

import GithubButton from "./components/GithubButton.vue";
import ResultTable from "./components/ResultTable.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

const store = usePageStore();
const { theme, results } = storeToRefs(store);
store.initResults();
</script>

<template>
  <div class="antialiased mx-auto">
    <n-config-provider :theme="theme">
      <n-layout position="absolute">
        <n-layout-header class="p-4 max-w-[90rem] mx-auto" bordered>
          <n-grid x-gap="12" :cols="4">
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
        </n-layout-header>
        <n-layout class="mt-2 max-w-[90rem] mx-auto">
          <ResultTable :results="results" />
        </n-layout>
      </n-layout>
      <n-back-top :right="100" />
    </n-config-provider>
  </div>
</template>

<style scoped></style>
