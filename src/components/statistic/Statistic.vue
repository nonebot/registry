<script setup lang="ts">
import { computed } from "vue";

import { NButton, NIcon, NPopover, NSpace, NText } from "naive-ui";
import ChartDonutVariant from "vue-material-design-icons/ChartDonutVariant.vue";

import { usePageStore } from "@/stores/page";

import Details from "./Details.vue";
import Progress from "./Progress.vue";

const store = usePageStore();

const stat = computed(() => {
  let results = store.results;
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

<template>
  <n-popover trigger="click" style="width: 170px">
    <template #trigger>
      <n-button text>
        <n-icon size="24">
          <ChartDonutVariant />
        </n-icon>
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
