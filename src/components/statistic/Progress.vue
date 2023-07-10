<script setup lang="ts">
import { computed, reactive } from "vue";

import { NEl, NIcon, NNumberAnimation, NProgress, NSpace } from "naive-ui";
import CheckAll from "vue-material-design-icons/CheckAll.vue";

const props = defineProps<{
  totalCount: number;
  passCount: number;
  percentageDict: {
    passPer: number;
    metaPer: number;
    loadPer: number;
  };
}>();

let tweened = reactive({
  passCount: 0,
  metaCount: 0,
  loadCount: 0,
});
setTimeout(() => {
  tweened.passCount = props.percentageDict.passPer;
  tweened.metaCount = props.percentageDict.metaPer;
  tweened.loadCount = props.percentageDict.loadPer;
}, 75);

function getProgressColor(percent: number) {
  if (percent < 25) {
    return "var(--error-color)";
  } else if (percent < 50) {
    return "var(--warning-color)";
  } else if (percent < 80) {
    return "var(--info-color)";
  } else {
    return "var(--success-color)";
  }
}

let percentageList = computed(() => [
  tweened.passCount,
  tweened.metaCount,
  tweened.loadCount,
]);
let colorList = computed(() =>
  percentageList.value.map((percent) => getProgressColor(percent)),
);
let railColorList = computed(() =>
  colorList.value.map((color) => ({ stroke: color, opacity: 0.3 })),
);
</script>
<template>
  <n-space vertical>
    <n-el style="justify-items: center">
      <n-progress
        style="width: 130px; margin: 5px"
        type="multiple-circle"
        :stroke-width="6"
        :circle-gap="0.5"
        :percentage="percentageList"
        :color="colorList"
        :rail-style="railColorList"
      >
        <div style="text-align: center">
          <n-icon color="var(--success-color)">
            <CheckAll />
          </n-icon>
          <br />
          <n-number-animation :from="0" :to="passCount" />/{{ totalCount }}
        </div>
      </n-progress>
    </n-el>
  </n-space>
</template>
