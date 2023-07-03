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
        processing
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

<script setup lang="ts">
import { ref } from "vue";

import { NProgress, NSpace, NEl, NIcon, NNumberAnimation } from "naive-ui";
import CheckAll from "vue-material-design-icons/CheckAll.vue";

const props = defineProps({
  totalCount: {
    type: Number,
    required: true,
  },
  passCount: {
    type: Number,
    required: true,
  },
  percentageList: {
    type: Array as () => number[],
    required: true,
  },
});

let colorList = ref(props.percentageList.map(getProgressColor));
let railColorList = ref(
  props.percentageList.map((percent) => {
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
