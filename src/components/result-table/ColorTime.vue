<script setup lang="ts">
import { computed, inject } from "vue";

import { NIcon, NText, NTime, NPopover } from "naive-ui";
import ClockOutline from "vue-material-design-icons/ClockOutline.vue";

import { CopyText } from "@/types/inject";

const copyText = inject(CopyText, () => undefined);

const props = defineProps<{ checkTime: string; nowTime: number }>();

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
  getTimeColor(props.nowTime - Date.parse(props.checkTime)),
);
</script>

<template>
  <span class="flex justify-center items-center align-middle mr-[15px]">
    <n-icon class="mr-1">
      <ClockOutline />
    </n-icon>
    <n-text
      :type="timeType"
      @contextmenu.prevent="copyText(new Date(checkTime).toLocaleString())"
    >
      <n-popover trigger="hover">
        <template #trigger>
          <n-time :time="new Date(checkTime)" :to="nowTime" type="relative" />
        </template>
        {{ new Date(checkTime).toLocaleString() }}
      </n-popover>
    </n-text>
  </span>
</template>
