<script setup lang="ts">
import { computed, reactive } from "vue";

import { mdiCheckAll } from "@mdi/js";
import { gsap } from "gsap";
import { NEl, NNumberAnimation, NProgress, NSpace } from "naive-ui";

import Icon from "../Icon.vue";

const props = defineProps<{
  totalCount: number;
  passCount: number;
  percentageDict: {
    passPer: number;
    metaPer: number;
    loadPer: number;
  };
}>();

const tweened = reactive({
  passCount: 0,
  metaCount: 0,
  loadCount: 0,
});

gsap.to(tweened, {
  duration: 1.5,
  ease: "power3.out",
  passCount: props.percentageDict.passPer,
  metaCount: props.percentageDict.metaPer,
  loadCount: props.percentageDict.loadPer,
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

const percentageList = computed(() => [
  tweened.passCount,
  tweened.metaCount,
  tweened.loadCount,
]);
const colorList = computed(() =>
  percentageList.value.map((percent) => getProgressColor(percent)),
);
const railColorList = computed(() =>
  colorList.value.map((color) => ({ stroke: color, opacity: 0.3 })),
);
</script>

<template>
  <n-space vertical>
    <n-el class="justify-items-center">
      <n-progress
        class="max-w-[130px] m-[5px]"
        type="multiple-circle"
        :stroke-width="6"
        :circle-gap="0.5"
        :percentage="percentageList"
        :color="colorList"
        :rail-style="railColorList"
      >
        <div class="text-center">
          <Icon color="var(--success-color)" :path="mdiCheckAll" />
          <br />
          <n-number-animation :from="0" :to="passCount" />/{{ totalCount }}
        </div>
      </n-progress>
    </n-el>
  </n-space>
</template>

<style scoped>
.n-progress
  :deep(
    .n-progress-graph .n-progress-graph-circle .n-progress-graph-circle-fill
  ) {
  @apply transition-none!;
}
</style>
