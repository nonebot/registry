<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { NInput, NLayout } from "naive-ui";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import ResultTable from "@/components/result-table/ResultTable.vue";
import { usePageStore } from "@/stores/page";

const route = useRoute();
const store = usePageStore();
const { plugins, results } = storeToRefs(store);

const searchKeyword = ref("");
onBeforeMount(() => {
  if (route.query.q) {
    searchKeyword.value = route.query.q as string;
  }
});
</script>

<template>
  <n-layout
    class="lg:max-w-[90rem] max-w-3xl mx-auto flex justify-end px-4 sm:px-6 md:px-8"
  >
    <n-input
      v-model:value="searchKeyword"
      class="min-w-1/4"
      type="text"
      placeholder="搜索"
      clearable
    />
  </n-layout>
  <n-layout
    class="mt-3 lg:max-w-[90rem] max-w-3xl mx-auto px-4 sm:px-6 md:px-8"
  >
    <ResultTable
      :plugins="plugins"
      :results="results"
      :search-keyword="searchKeyword"
    />
  </n-layout>
</template>

<style scoped></style>
