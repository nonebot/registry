<script setup lang="ts">
import { ref } from "vue";

import { NInput, NLayout } from "naive-ui";
import { storeToRefs } from "pinia";

import ResultTable from "@/components/result-table/ResultTable.vue";
import { usePageStore } from "@/stores/page";

const props = defineProps<{ searchKeyword?: string }>();
const store = usePageStore();
const { plugins, results } = storeToRefs(store);

const searchKeyword = ref<string>(
  props.searchKeyword ? props.searchKeyword : "",
);
</script>

<template>
  <n-layout class="flex justify-end">
    <n-input
      v-model:value="searchKeyword"
      class="min-w-1/4"
      type="text"
      placeholder="搜索"
      clearable
    />
  </n-layout>
  <n-layout class="mt-3">
    <ResultTable
      :plugins="plugins"
      :results="results"
      :search-keyword="searchKeyword"
    />
  </n-layout>
</template>

<style scoped></style>
