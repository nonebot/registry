<script setup lang="ts">
import { ref, Ref, onBeforeMount } from "vue";

import { NInput, NLayout } from "naive-ui";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import ResultTable from "@/components/result-table/ResultTable.vue";
import { usePageStore } from "@/stores/page";

const store = usePageStore();
const router = useRouter();

const { plugins, results } = storeToRefs(store);

onBeforeMount(() => {
  store.initData();
  router.push({ query: {} });
});

const props = defineProps({
  searchKeyword: {
    type: String,
    default: "",
  },
});

const searchKeyword = ref(props.searchKeyword) as Ref<string>;
</script>

<template>
  <n-layout class="mx-auto flex justify-end">
    <n-input
      v-model:value="searchKeyword"
      class="min-w-1/4"
      type="text"
      placeholder="搜索"
      clearable
    />
  </n-layout>
  <n-layout class="mt-3 mx-auto">
    <ResultTable
      :plugins="plugins"
      :results="results"
      :search-keyword="searchKeyword"
    />
  </n-layout>
</template>

<style scoped></style>
