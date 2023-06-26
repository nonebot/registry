<script setup lang="ts">
import { reactive, provide, ref } from "vue";

import type { GlobalTheme } from "naive-ui";
import {
  NConfigProvider,
  NBackTop,
  NLayout,
  NLayoutHeader,
  NSpace,
  NGrid,
  NGi,
} from "naive-ui";

import { Results } from "@/types/results";

import GithubButton from "./components/GithubButton.vue";
import ResultTable from "./components/ResultTable.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

const state = reactive({
  results: {} as Results,
  theme: ref<GlobalTheme | null>(null),
});

fetch("/results.json", { method: "GET" })
  .then((response) => response.json())
  .then((data: Results) => (state.results = data))
  .catch(console.error);

function setTheme(value: GlobalTheme | null) {
  console.log("setTheme", value);
  state.theme = value;
}

provide("theme", {
  theme: state.theme,
  setTheme: setTheme,
});
</script>

<template>
  <div class="antialiased mx-auto">
    <n-config-provider :theme="state.theme">
      <n-layout position="absolute">
        <n-layout-header class="p-4" bordered>
          <n-grid x-gap="12" :cols="4">
            <n-gi class="flex items-center">
              <img
                class="mr-1"
                src="https://nonebot.dev/logo.png"
                alt="Logo"
                width="30"
                height="30"
              />
              <span class="text-lg">商店测试结果</span>
            </n-gi>
            <n-gi class="justify-self-end" :offset="2">
              <n-space>
                <GithubButton />
                <ThemeSwitcher />
              </n-space>
            </n-gi>
          </n-grid>
        </n-layout-header>
        <n-layout class="p-4">
          <ResultTable :results="state.results" />
        </n-layout>
      </n-layout>
      <n-back-top :right="100" />
    </n-config-provider>
  </div>
</template>

<style scoped></style>
