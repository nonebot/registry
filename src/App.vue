<script setup lang="ts">
import { reactive, provide, ref } from "vue";

import axios from "axios";
import type { GlobalTheme } from "naive-ui";
import { NConfigProvider, NCard, NBackTop } from "naive-ui";

import { Results } from "@/types/results";

import GithubButton from "./components/GithubButton.vue";
import ResultTable from "./components/ResultTable.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";

const state = reactive({
  results: {} as Results,
  theme: ref<GlobalTheme | null>(null),
});

axios
  .get("/results.json")
  .then((response) => {
    state.results = response.data;
  })
  .catch((error) => {
    console.error(error);
  });

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
  <div class="container">
    <n-config-provider :theme="state.theme">
      <n-card>
        <GithubButton />
        <ThemeSwitcher />
        <ResultTable :results="state.results" />
      </n-card>
      <n-back-top :right="100" />
    </n-config-provider>
  </div>
</template>

<style scoped></style>
