<template>
  <n-popover trigger="manual" :show="showStat" style="width: 170px">
    <template #trigger>
      <n-button text @click="showStat = !showStat">
        <ChartDonutVariant />
      </n-button>
    </template>
    <template #header>
      <n-space justify="center">
        <n-text depth="3"> 检查统计 </n-text>
      </n-space>
    </template>
    <Progress
      :total-count="stat.totalCount"
      :pass-count="stat.passCount"
      :percentage-list="stat.percentageList"
    />
    <template #footer>
      <Details
        :load-count="stat.loadCount"
        :metadata-count="stat.metadataCount"
      />
    </template>
  </n-popover>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { NPopover, NButton, NText, NSpace } from "naive-ui";
import ChartDonutVariant from "vue-material-design-icons/ChartDonutVariant.vue";

import { usePageStore } from "@/stores/page";
import { Results } from "@/types/results";

import Details from "./Details.vue";
import Progress from "./Progress.vue";

let showStat = ref(false);

const store = usePageStore();

const stat = computed(() => {
  let results = store.results as Results;
  console.log(results);
  let totalCount = Object.keys(results).length;
  let passCount = Object.values(results).filter(
    (result) => result.results.validation,
  ).length;
  let loadCount = Object.values(results).filter(
    (result) => result.results.load,
  ).length;
  let metadataCount = Object.values(results).filter(
    (result) => result.results.metadata,
  ).length;

  let percentageList = [
    Math.round((passCount / totalCount) * 10000) / 100, // 目的是保留两位小数
    Math.round((metadataCount / totalCount) * 10000) / 100,
    Math.round((loadCount / totalCount) * 10000) / 100,
  ];

  return {
    totalCount,
    passCount,
    loadCount,
    metadataCount,
    percentageList,
  };
});
</script>
