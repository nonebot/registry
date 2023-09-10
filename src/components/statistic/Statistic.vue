<script setup lang="ts">
import { computed } from "vue";

import { mdiChartDonutVariant } from "@mdi/js";
import { NButton, NPopover, NSpace, NText } from "naive-ui";

import { usePageStore } from "@/stores/page";

import Icon from "../Icon.vue";

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

  let percentageDict = {
    passPer: Math.round((passCount / totalCount) * 10000) / 100, // 目的是保留两位小数
    metaPer: Math.round((metadataCount / totalCount) * 10000) / 100,
    loadPer: Math.round((loadCount / totalCount) * 10000) / 100,
  };

  return {
    totalCount,
    passCount,
    loadCount,
    metadataCount,
    percentageDict,
  };
});
</script>

<template>
  <n-popover trigger="click" class="w-[170px]">
    <template #trigger>
      <n-button text>
        <Icon size="24" :path="mdiChartDonutVariant" />
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
      :percentage-dict="stat.percentageDict"
    />
    <template #footer>
      <Details
        :load-count="stat.loadCount"
        :metadata-count="stat.metadataCount"
      />
    </template>
  </n-popover>
</template>
