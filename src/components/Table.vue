<script setup lang="ts">
import { nextTick, ref, watch } from "vue";

import { NInput, NLayout, type InputInst } from "naive-ui";
import { storeToRefs } from "pinia";

import ResultTable from "@/components/result-table/ResultTable.vue";
import { usePageStore } from "@/stores/page";
import { debounce } from "@/utils/wrapper";

const props = defineProps<{ searchKeyword?: string }>();
const store = usePageStore();
const { plugins, results } = storeToRefs(store);

const searchKeyword = ref<string>(props.searchKeyword || "");
const inputInstRef = ref<InputInst | null>(null);

if (props.searchKeyword) {
  nextTick(() => inputInstRef.value?.focus());
}

const handleSearch = debounce((v: string) => {
  const url = new URL("/search", window.location.toString());
  url.searchParams.set("q", v);
  history.pushState({}, "", url);
}, 300);

watch(searchKeyword, async (newValue) => {
  handleSearch(newValue);
});
</script>

<template>
  <n-layout class="flex justify-end">
    <n-input
      ref="inputInstRef"
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
