<template>
  <n-popover trigger="manual" :show="showStat">
    <template #trigger>
      <n-button text @click="showStat = !showStat">
        <ChartDonutVariant />
      </n-button>
    </template>
    <template #header>
      <div id="stat-head">
        <n-icon size="24" style="margin-right: 12px">
          <ChartBar />
        </n-icon>
        <div>
          <n-text depth="3"> 检查统计 </n-text>
        </div>
      </div>
    </template>

    <Progress />
  </n-popover>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { NPopover, NButton, NIcon, NText } from "naive-ui";
import ChartBar from "vue-material-design-icons/ChartBar.vue";
import ChartDonutVariant from "vue-material-design-icons/ChartDonutVariant.vue";

import Progress from "./Progress.vue";

let showStat = ref(false);
</script>

<style scoped>
#stat-head {
  display: flex;
  align-items: center;
  padding: 8px 4px;
}
</style>
