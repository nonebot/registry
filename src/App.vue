<script setup lang="ts">
import { reactive } from "vue";

import axios from "axios";

import { Results } from "@/types/results";

import GithubButton from "./components/GithubButton.vue";
import ResultTable from "./components/ResultTable.vue";
const state = reactive({
  results: {} as Results,
});

axios
  .get("/results.json")
  .then((response) => {
    state.results = response.data;
  })
  .catch((error) => {
    console.error(error);
  });
</script>

<template>
  <GithubButton />
  <ResultTable :results="state.results" />
</template>

<style scoped></style>
