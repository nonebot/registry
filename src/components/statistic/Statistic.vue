<template>
  <n-popover trigger="manual" :show="showStat">
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

    <Progress />
  </n-popover>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { NPopover, NButton, NText, NSpace } from "naive-ui";
import ChartDonutVariant from "vue-material-design-icons/ChartDonutVariant.vue";

import Progress from "./Progress.vue";

let showStat = ref(false);
</script>
