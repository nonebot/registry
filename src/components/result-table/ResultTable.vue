<script setup lang="ts">
import { computed, h, reactive } from "vue";

import { NDataTable } from "naive-ui";
import { TableColumns } from "naive-ui/es/data-table/src/interface";

import { usePageStore } from "@/stores/page";
import { Plugins } from "@/types/plugins";
import { Results } from "@/types/results";

import Author from "./Author.vue";
import ColorTime from "./ColorTime.vue";
import Load from "./Load.vue";
import Metadata from "./Metadata.vue";
import PluginLink from "./PluginLink.vue";
import Validation from "./Validation.vue";

const nowTime = new Date().getTime();

const store = usePageStore();

const props = defineProps<{
  plugins: Plugins;
  results: Results;
  searchKeyword: string;
}>();
const filteredPlugins = computed(() =>
  store.filterPlugins(props.searchKeyword),
);
const data = computed(() =>
  Object.keys(filteredPlugins.value).map((key) => {
    return {
      key,
      plugin: filteredPlugins.value[key],
      result: props.results[key],
    };
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

const columns: TableColumns<{
  plugin: Plugins[keyof Plugins];
  result: Results[keyof Results];
}> = [
  {
    title: "PyPI 项目名 / 模块名",
    key: "plugin.module_name",
    render: (rowData) =>
      h(PluginLink, {
        moduleName: rowData.plugin.module_name,
        projectLink: rowData.plugin.project_link,
        homepage: rowData.plugin.homepage,
      }),
    align: "left",
    titleAlign: "left",
    sorter(rowA, rowB) {
      return rowA.plugin.module_name.localeCompare(rowB.plugin.module_name);
    },
  },
  {
    title: "作者",
    key: "plugin.author",
    render: (rowData) =>
      h(Author, {
        author: rowData.plugin.author,
      }),
    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return rowA.plugin.author.localeCompare(rowB.plugin.author);
    },
  },
  {
    title: "验证结果",
    key: "result.results.validation",
    render: (rowData) =>
      h(Validation, {
        projectLink: rowData.plugin.project_link,
        result: rowData.result,
      }),
    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return (
        Number(rowA.result.results.validation) -
        Number(rowB.result.results.validation)
      );
    },
  },
  {
    title: "加载结果",
    key: "result.results.load",
    render: (rowData) =>
      h(Load, {
        projectLink: rowData.plugin.project_link,
        result: rowData.result,
      }),
    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return (
        Number(rowA.result.results.load) - Number(rowB.result.results.load)
      );
    },
  },
  {
    title: "元数据",
    key: "result.results.metadata",
    render: (rowData) =>
      h(Metadata, {
        projectLink: rowData.plugin.project_link,
        result: rowData.result,
      }),
    align: "center",
    titleAlign: "center",
    sorter(rowA, rowB) {
      return (
        Number(rowA.result.results.metadata) -
        Number(rowB.result.results.metadata)
      );
    },
  },
  {
    title: "测试时间",
    key: "result.time",
    align: "center",
    titleAlign: "center",
    render: (rowData) =>
      h(ColorTime, {
        checkTime: rowData.result.time,
        nowTime: nowTime,
      }),
    sorter(rowA, rowB) {
      return Date.parse(rowA.result.time) - Date.parse(rowB.result.time);
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
