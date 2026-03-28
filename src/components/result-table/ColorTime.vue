<script setup lang="ts">
import { computed } from "vue";

import { mdiClockOutline } from "@mdi/js";
import { NPopover, NText, NTime } from "naive-ui";

import Icon from "../Icon.vue";

const props = defineProps<{ time: string; currentTime: number | Date }>();

function getTimeColor(timeDiff: number) {
  if (timeDiff <= 3_600_000 * 4) {
    // 4 小时内更新是绿色（活跃）
    return "success";
  } else if (timeDiff <= 3_600_000 * 24) {
    // 24 小时内更新是蓝色
    return "info";
  } else {
    // 24 小时以上更新是正常
    return "default";
  }
}

const currentMs = computed(() =>
  props.currentTime instanceof Date
    ? props.currentTime.getTime()
    : props.currentTime,
);
const timeType = computed(() =>
  getTimeColor(currentMs.value - Date.parse(props.time)),
);
</script>

<template>
  <span class="flex justify-center items-center align-middle mr-[15px]">
    <Icon class="mr-1" :path="mdiClockOutline" />
    <n-text :type="timeType">
      <n-popover trigger="hover">
        <template #trigger>
          <n-time :time="new Date(time)" :to="currentMs" type="relative" />
        </template>
        {{ new Date(time).toLocaleString() }}
      </n-popover>
    </n-text>
  </span>
</template>
