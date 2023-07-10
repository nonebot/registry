<script setup lang="ts">
import { reactive, computed, PropType } from "vue";

import { gsap } from "gsap";
import { NProgress, NSpace, NEl, NIcon, NNumberAnimation } from "naive-ui";
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

gsap.to(tweened, {
  duration: 1.1,
  ease: "steps(25)",
  passCount: props.percentageDict.passPer,
  metaCount: props.percentageDict.metaPer,
  loadCount: props.percentageDict.loadPer,
});

let percentageList = computed(() => {
  let plist = [tweened.passCount, tweened.metaCount, tweened.loadCount];
  return plist;
});

let colorList = computed(() => {
  let clist = [
    getProgressColor(tweened.passCount),
    getProgressColor(tweened.metaCount),
    getProgressColor(tweened.loadCount),
  ];
  return clist;
});

let railColorList = computed(() => {
  let rlist = [
    { stroke: getProgressColor(tweened.passCount), opacity: 0.3 },
    { stroke: getProgressColor(tweened.metaCount), opacity: 0.3 },
    { stroke: getProgressColor(tweened.loadCount), opacity: 0.3 },
  ];
  return rlist;
});

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