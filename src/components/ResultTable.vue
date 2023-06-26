<template>
  <n-data-table
    :data="
      Object.keys(results).map((name) => {
        return { name, ...results[name] };
      })
    "
    :columns="columns"
  />
</template>

<script setup lang="ts">
import { h } from "vue";

import { NDataTable } from "naive-ui";
import { TableColumns } from "naive-ui/es/data-table/src/interface";

import { Results } from "@/types/results";

import Load from "./icons/Load.vue";
import Metadata from "./icons/Metadata.vue";
import Validation from "./icons/Validation.vue";

defineProps<{
  results: Results;
}>();

const columns: TableColumns<Results[keyof Results]> = [
  {
    title: "PyPI 项目名",
    key: "plugin.old.module_name",
    align: "center",
    titleAlign: "center",
  },
  {
    title: "作者",
    key: "plugin.old.author",
    align: "center",
    titleAlign: "center",
  },
  {
    title: "验证结果",
    key: "results.validation",
    render: (rowData) => h(Validation, { rowData }),
    align: "center",
    titleAlign: "center",
  },
  {
    title: "加载结果",
    key: "results.load",
    render: (rowData) => h(Load, { rowData }),
    align: "center",
    titleAlign: "center",
  },
  {
    title: "元数据",
    key: "results.metadata",
    render: (rowData) => h(Metadata, { rowData }),
    align: "center",
    titleAlign: "center",
  },
  { title: "测试时间", key: "time", align: "center", titleAlign: "center" },
];
</script>
