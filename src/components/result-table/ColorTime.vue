<script setup lang="ts">
import { computed } from "vue";

import { NIcon, NPopover, NText, NTime } from "naive-ui";
import ClockOutline from "vue-material-design-icons/ClockOutline.vue";

const props = defineProps<{ time: string; currentTime: number }>();

function getTimeColor(timeDiff: number) {
  if (timeDiff <= 3600000 * 4) {
    // 4 小时内更新是红色
    return "error";
  } else if (timeDiff <= 3600000 * 24) {
    // 24 小时内更新是黄色
    return "warning";
  } else {
    // 24 小时以上更新是正常
    return "default";
  }
}

const timeType = computed(() =>
  getTimeColor(props.currentTime - Date.parse(props.time)),
);
</script>

<template>
  <span class="flex justify-center items-center align-middle mr-[15px]">
    <n-icon class="mr-1">
      <ClockOutline />
    </n-icon>
    <n-text :type="timeType">
      <n-popover trigger="hover">
        <template #trigger>
          <n-time :time="new Date(time)" :to="currentTime" type="relative" />
        </template>
        {{ new Date(time).toLocaleString() }}
      </n-popover>
    </n-text>
  </span>
</template>
