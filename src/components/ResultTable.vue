<template>
  <n-data-table
    :data="
      Object.keys(results).map((name) => {
        return { name, ...results[name] };
      })
    "
    :pagination="pagination"
    :columns="columns"
  />
</template>

<script setup lang="ts">
import { h, ref } from "vue";

import { NDataTable } from "naive-ui";
import { TableColumns } from "naive-ui/es/data-table/src/interface";

import { Results } from "@/types/results";

import Load from "./icons/Load.vue";
import Metadata from "./icons/Metadata.vue";
import Validation from "./icons/Validation.vue";

defineProps<{
  results: Results;
}>();

const pagination = ref({ pageSize: 10 });
const columns: TableColumns<Results[keyof Results]> = [
  {
    title: "PyPI 项目名",
    key: "plugin.old.module_name",
    render: (rowData) =>
      h(
        "a",
        {
          target: "_blank",
          href: `https://pypi.org/project/${rowData.plugin.old.module_name}/`,
          class: "text-inherit no-underline",
        },
        rowData.plugin.old.module_name,
      ),

    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return rowA.plugin.old.module_name.localeCompare(
        rowB.plugin.old.module_name,
      );
    },
  },
  {
    title: "作者",
    key: "plugin.old.author",
    render: (rowData) =>
      h(
        "a",
        {
          target: "_blank",
          href: `https://github.com/${rowData.plugin.old.author}`,
          class: "text-inherit no-underline",
        },
        rowData.plugin.old.author,
      ),
    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return rowA.plugin.old.author.localeCompare(rowB.plugin.old.author);
    },
  },
  {
    title: "验证结果",
    key: "results.validation",
    render: (rowData) => h(Validation, { rowData }),
    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return Number(rowA.results.validation) - Number(rowB.results.validation);
    },
  },
  {
    title: "加载结果",
    key: "results.load",
    render: (rowData) => h(Load, { rowData }),
    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return Number(rowA.results.load) - Number(rowB.results.load);
    },
  },
  {
    title: "元数据",
    key: "results.metadata",
    render: (rowData) => h(Metadata, { rowData }),
    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return Number(rowA.results.metadata) - Number(rowB.results.metadata);
    },
  },
  {
    title: "测试时间",
    key: "time",
    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return Date.parse(rowA.time) - Date.parse(rowB.time);
    },
  },
];
</script>
