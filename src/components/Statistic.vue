<template>
  <n-dropdown trigger="hover" :options="options">
    <n-button text><ChartDonutVariant /></n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { h } from "vue";

import { NDropdown, NButton, NText, NAvatar } from "naive-ui";
import ChartBar from "vue-material-design-icons/ChartBar.vue";
import ChartDonutVariant from "vue-material-design-icons/ChartDonutVariant.vue";

function renderCustomHeader() {
  return h(
    "div",
    {
      style: "display: flex; align-items: center; padding: 8px 12px;",
    },
    [
      h(ChartBar, {
        style: "margin-right: 12px;",
      }),
      h("div", null, [
        h("div", null, [
          h(NText, { depth: 3 }, { default: () => "插件检查统计" }),
        ]),
      ]),
    ],
  );
}

let options = [
  {
    label: "插件检查统计",
    key: "registry-statistic",
    type: "render",
    render: renderCustomHeader,
  },
  {
    label: "布朗酒店，伦敦",
    key: "brown's hotel, london",
  },
  {
    label: "亚特兰蒂斯巴哈马，拿骚",
    key: "atlantis nahamas, nassau",
  },
  {
    label: "比佛利山庄酒店，洛杉矶",
    key: "the beverly hills hotel, los angeles",
  },
];
</script>
