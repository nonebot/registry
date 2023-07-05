<script setup lang="ts">
import { computed, ComputedRef, h, reactive } from "vue";

import { NDataTable, NSpace, NSkeleton } from "naive-ui";
import { TableColumns } from "naive-ui/es/data-table/src/interface";

import Detail from "@/components/result-table/Detail.vue";
import { usePageStore } from "@/stores/page";
import { Plugins } from "@/types/plugins";
import { Results } from "@/types/results";
import { RowData } from "@/types/row";

import Author from "./Author.vue";
import ColorTime from "./ColorTime.vue";
import LoadIcon from "./LoadIcon.vue";
import LoadingCircle from "./LoadingCircle.vue";
import LoadingTime from "./LoadingTime.vue";
import MetadataIcon from "./MetadataIcon.vue";
import PluginLink from "./PluginLink.vue";
import ValidationIcon from "./ValidationIcon.vue";

const nowTime = new Date().getTime();

const store = usePageStore();

const props = defineProps<{
  plugins: Plugins;
  results: Results;
  searchKeyword: string;
}>();
const loading = computed(() => Object.keys(props.plugins).length === 0);
const loadingResults = computed(() => Object.keys(props.results).length === 0);
const filteredPlugins = computed(() =>
  store.filterPlugins(props.searchKeyword),
);

const data: ComputedRef<RowData[]> = computed(() =>
  Object.keys(filteredPlugins.value).map((key) => {
    return {
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

const columns: TableColumns = [
  {
    title: "PyPI 项目名 / 模块名",
    key: "plugin.module_name",
    render: (rowData: RowData) =>
      h(PluginLink, {
        moduleName: rowData.plugin.module_name,
        projectLink: rowData.plugin.project_link,
        homepage: rowData.plugin.homepage,
      }),
    align: "left",
    titleAlign: "left",
    sorter(rowA: RowData, rowB: RowData) {
      return rowA.plugin.module_name.localeCompare(rowB.plugin.module_name);
    },
  },
  {
    title: "作者",
    key: "plugin.author",
    render: (rowData: RowData) =>
      h(Author, {
        author: rowData.plugin.author,
      }),
    align: "center",
    titleAlign: "center",
    sorter(rowA: RowData, rowB: RowData) {
      return rowA.plugin.author.localeCompare(rowB.plugin.author);
    },
  },
  {
    title: "验证结果",
    key: "result.results.validation",
    render: (rowData: RowData) =>
      loadingResults.value
        ? h(LoadingCircle)
        : h(ValidationIcon, {
            projectLink: rowData.plugin.project_link,
            result: rowData.result,
          }),
    align: "center",
    titleAlign: "center",
    sorter(rowA: RowData, rowB: RowData) {
      if (loadingResults.value) return 0;
      return (
        Number(rowA.result.results.validation) -
        Number(rowB.result.results.validation)
      );
    },
  },
  {
    title: "加载结果",
    key: "result.results.load",
    render: (rowData: RowData) =>
      loadingResults.value
        ? h(LoadingCircle)
        : h(LoadIcon, {
            projectLink: rowData.plugin.project_link,
            result: rowData.result,
          }),
    align: "center",
    titleAlign: "center",
    sorter(rowA: RowData, rowB: RowData) {
      if (loadingResults.value) return 0;
      return (
        Number(rowA.result.results.load) - Number(rowB.result.results.load)
      );
    },
  },
  {
    title: "元数据",
    key: "result.results.metadata",
    render: (rowData: RowData) =>
      loadingResults.value
        ? h(LoadingCircle)
        : h(MetadataIcon, {
            projectLink: rowData.plugin.project_link,
            result: rowData.result,
          }),
    align: "center",
    titleAlign: "center",
    sorter(rowA: RowData, rowB: RowData) {
      if (loadingResults.value) return 0;
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
    render: (rowData: RowData) =>
      loadingResults.value
        ? h(LoadingTime)
        : h(ColorTime, {
            checkTime: rowData.result.time,
            nowTime: nowTime,
          }),
    sorter(rowA: RowData, rowB: RowData) {
      if (loadingResults.value) return 0;
      return Date.parse(rowA.result.time) - Date.parse(rowB.result.time);
    },
  },
  {
    title: "选项",
    key: "result.detail",
    align: "center",
    titleAlign: "center",
    render: (rowData: RowData) =>
      loadingResults.value
        ? h(LoadingTime)
        : h(Detail, {
            pypi: rowData.plugin.project_link,
            module: rowData.plugin.module_name,
          }),
  },
] as TableColumns<RowData>;
</script>

<template>
  <n-space v-if="loading" vertical>
    <n-skeleton height="48px" />
    <n-skeleton v-for="i in pagination.pageSize" :key="i" height="56px" />
  </n-space>
  <n-data-table
    v-else
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
