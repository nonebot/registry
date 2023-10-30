<script setup lang="ts">
import { ref } from "vue";

import { NInput, NLayout } from "naive-ui";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import ResultTable from "@/components/result-table/ResultTable.vue";
import { usePageStore } from "@/stores/page";
import { debounce } from "@/utils/wrapper";

const props = defineProps<{ searchKeyword?: string }>();
const router = useRouter();
const store = usePageStore();
const { plugins, results } = storeToRefs(store);

const searchKeyword = ref<string>(
  props.searchKeyword ? props.searchKeyword : "",
);

const handleSearch = debounce((v: string) => {
  router.push({ path: "/search", query: { q: v } });
}, 600);
</script>

<template>
  <n-layout class="flex justify-end">
    <n-input
      v-model:value="searchKeyword"
      class="min-w-1/4"
      type="text"
      placeholder="搜索"
      clearable
      @input="handleSearch"
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
