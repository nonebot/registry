<script setup lang="ts">
import { computed, h, reactive } from "vue";

import { NDataTable } from "naive-ui";
import { TableColumns } from "naive-ui/es/data-table/src/interface";

import { usePageStore } from "@/stores/page";
import { Results } from "@/types/results";

import PluginLink from "./PluginLink.vue";
import Load from "./icons/Load.vue";
import Metadata from "./icons/Metadata.vue";
import Validation from "./icons/Validation.vue";

const store = usePageStore();

const props = defineProps<{
  results: Results;
  searchKeyword: string;
}>();
const filteredResults = computed(() =>
  store.filterResults(props.searchKeyword),
);
const data = computed(() =>
  Object.keys(filteredResults.value).map((name) => {
    return { name, ...filteredResults.value[name] };
  }),
);
const pagination = reactive({
  page: 1,
  pageSize: 10,
  pageSizes: [10, 25, 50, 100],
  showSizePicker: true,
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  },
});
const columns: TableColumns<Results[keyof Results]> = [
  {
    title: "PyPI 项目名 / 模块名",
    key: "plugin.old.module_name",
    render: (rowData) =>
      h(PluginLink, {
        moduleName: rowData.plugin.old.module_name,
        projectLink: rowData.plugin.old.project_link,
        homepage: rowData.plugin.old.homepage,
      }),
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
    render: (rowData) => new Date(rowData.time).toLocaleString(),
    sorter(rowA, rowB) {
      return Date.parse(rowA.time) - Date.parse(rowB.time);
    },
  },
];
</script>

<template>
  <n-data-table
    class="overflow-auto whitespace-nowrap"
    :data="data"
    :pagination="pagination"
    :columns="columns"
  />
</template>

<style>
.n-data-table .n-pagination {
  @apply overflow-auto;
}
</style>
