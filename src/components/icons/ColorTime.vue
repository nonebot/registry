<script setup lang="ts">
import { computed } from "vue";

import { NIcon, NText } from "naive-ui";
import ClockOutline from "vue-material-design-icons/ClockOutline.vue";

const props = defineProps<{ checkTime: string; nowTime: number }>();

function getTimeColor(timeDiff: number) {
  if (timeDiff <= 3600000) {
    // 1 小时内更新是红色
    return "error";
  } else if (timeDiff <= 3600000 * 3) {
    // 3 小时内更新是黄色
    return "warning";
  } else {
    // 3 小时以上更新是正常
    return "default";
  }
}

const timeType = computed(() =>
  getTimeColor(props.nowTime - Date.parse(props.checkTime)),
);
</script>

<template>
  <span>
    <n-icon>
      <ClockOutline />
    </n-icon>
    <n-text :type="timeType">
      {{ new Date(checkTime).toLocaleString() }}
    </n-text>
  </span>
</template>
