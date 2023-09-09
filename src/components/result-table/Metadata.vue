<script setup lang="ts">
import { h } from "vue";

import { NDataTable, DataTableColumns, NText } from "naive-ui";

import type { Results } from "@/types/results";

const props = defineProps<{
  result: Results[keyof Results];
  dense?: boolean;
}>();

const columns: DataTableColumns<{
  key: string;
  value: string | string[] | null;
}> = [
  {
    title: "字段",
    key: "key",
    minWidth: "100px",
    render(row) {
      return h(NText, { strong: true }, { default: () => row.key });
    },
  },
  {
    title: "值",
    key: "value",
    minWidth: "100px",
    render(row) {
      if (typeof row.value === "string") {
        return h(NText, {}, { default: () => row.value });
      }
      return JSON.stringify(row.value);
    },
  },
];
const data = props.result.outputs.metadata
  ? Object.entries(props.result.outputs.metadata).map(([key, value]) => ({
      key: key,
      value: value,
    }))
  : null;
</script>

<template>
  <n-data-table v-if="data" :columns="columns" :data="data" />
  <n-text v-else>无</n-text>
</template>

<style scoped></style>
