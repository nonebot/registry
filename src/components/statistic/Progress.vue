<template>
  <n-space vertical>
    <n-el>
      <n-progress
        style="width: 120px; margin: 5px"
        type="multiple-circle"
        :stroke-width="6"
        :circle-gap="0.5"
        :percentage="percentageList"
        :color="colorList"
        :rail-style="railColorList"
        processing
      >
        <div style="text-align: center">
          <n-icon color="var(--success-color)">
            <CheckAll />
          </n-icon>
          <n-number-animation :from="0" :to="passCount" />/{{ totalCount }}
        </div>
      </n-progress>
    </n-el>
    <n-space justify="center" inline>
      <div>
        <n-icon color="var(--success-color)">
          <PackageVariantClosedCheck />
        </n-icon>
        <n-number-animation :from="0" :to="metadataCount" />
      </div>
      <n-divider vertical />
      <div>
        <n-icon color="var(--success-color)">
          <PuzzleCheckOutline />
        </n-icon>
        <n-number-animation :from="0" :to="loadCount" />
      </div>
    </n-space>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from "vue";

import {
  NProgress,
  NSpace,
  NEl,
  NIcon,
  NNumberAnimation,
  NDivider,
} from "naive-ui";
import CheckAll from "vue-material-design-icons/CheckAll.vue";
import PackageVariantClosedCheck from "vue-material-design-icons/PackageVariantClosedCheck.vue";
import PuzzleCheckOutline from "vue-material-design-icons/PuzzleCheckOutline.vue";

import { usePageStore } from "@/stores/page";
import { Results } from "@/types/results";

const store = usePageStore();
let results = store.results as Results;

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

let percentageList = ref([
  Math.round((passCount / totalCount) * 100),
  Math.round((metadataCount / totalCount) * 100),
  Math.round((loadCount / totalCount) * 100),
]);

let colorList = ref(percentageList.value.map(getProgressColor));
let railColorList = ref(
  percentageList.value.map((percent) => {
    return {
      stroke: getProgressColor(percent),
      opacity: 0.3,
    };
  }),
);

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
