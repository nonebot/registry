<script setup lang="ts">
import { computed, ComputedRef, h, reactive } from "vue";

import type { DataTableColumns } from "naive-ui";
import { NDataTable, NSkeleton, NSpace } from "naive-ui";
import { storeToRefs } from "pinia";

import Detail from "@/components/result-table/Detail.vue";
import { usePageStore } from "@/stores/page";
import type { Plugins } from "@/types/plugins";
import type { Results } from "@/types/results";
import type { RowData } from "@/types/row";

import Author from "./Author.vue";
import ColorTime from "./ColorTime.vue";
import LoadIcon from "./LoadIcon.vue";
import MetadataIcon from "./MetadataIcon.vue";
import PluginLink from "./PluginLink.vue";
import ValidationIcon from "./ValidationIcon.vue";

const currentTime = new Date().getTime();

const store = usePageStore();
const { loading } = storeToRefs(store);

const props = defineProps<{
  plugins: Plugins;
  results: Results;
  searchKeyword: string;
}>();
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

const createColumnAlign = (align: "left" | "center" | "right") => {
  return {
    align: align,
    titleAlign: align,
  };
};

const localeCompareSorter = (field: "module_name" | "author") => {
  return (rowA: RowData, rowB: RowData) => {
    return rowA.plugin[field].localeCompare(rowB.plugin.module_name);
  };
};

const numberSorter = (field: "validation" | "load" | "metadata") => {
  return (rowA: RowData, rowB: RowData) => {
    return (
      Number(rowA.result.results[field]) - Number(rowB.result.results[field])
    );
  };
};

const timeSorter = (type: "plugin" | "result", field: "time") => {
  return (rowA: RowData, rowB: RowData) => {
    return Date.parse(rowA[type][field]) - Date.parse(rowB[type][field]);
  };
};

const columns: DataTableColumns<RowData> = [
  {
    title: "PyPI 项目名 / 模块名",
    key: "plugin.module_name",
    ...createColumnAlign("left"),
    render: (rowData: RowData) =>
      h(PluginLink, {
        moduleName: rowData.plugin.module_name,
        projectLink: rowData.plugin.project_link,
        homepage: rowData.plugin.homepage,
      }),
    sorter: localeCompareSorter("module_name"),
  },
  {
    title: "作者",
    key: "plugin.author",
    ...createColumnAlign("center"),
    render: (rowData: RowData) =>
      h(Author, {
        author: rowData.plugin.author,
        dense: true,
      }),
    sorter: localeCompareSorter("author"),
  },
  {
    title: "验证结果",
    key: "result.results.validation",
    ...createColumnAlign("center"),
    render: (rowData: RowData) =>
      h(ValidationIcon, {
        projectLink: rowData.plugin.project_link,
        result: rowData.result,
        skipTest: rowData.plugin.skip_test,
        version: rowData.plugin.version,
      }),
    sorter: numberSorter("validation"),
  },
  {
    title: "加载结果",
    key: "result.results.load",
    ...createColumnAlign("center"),
    render: (rowData: RowData) =>
      h(LoadIcon, {
        projectLink: rowData.plugin.project_link,
        result: rowData.result,
        skipTest: rowData.plugin.skip_test,
      }),
    sorter: numberSorter("load"),
  },
  {
    title: "元数据",
    key: "result.results.metadata",
    ...createColumnAlign("center"),
    render: (rowData: RowData) =>
      h(MetadataIcon, {
        projectLink: rowData.plugin.project_link,
        result: rowData.result,
        skipTest: rowData.plugin.skip_test,
      }),
    sorter: numberSorter("metadata"),
  },
  {
    title: "更新时间",
    key: "plugin.time",
    ...createColumnAlign("center"),
    defaultSortOrder: "descend",
    render: (rowData: RowData) =>
      h(ColorTime, {
        time: rowData.plugin.time,
        currentTime: currentTime,
      }),
    sorter: timeSorter("plugin", "time"),
  },
  {
    title: "测试时间",
    key: "result.time",
    ...createColumnAlign("center"),
    render: (rowData: RowData) =>
      h(ColorTime, {
        time: rowData.result.time,
        currentTime: currentTime,
      }),
    sorter: timeSorter("result", "time"),
  },
  {
    title: "选项",
    key: "result.detail",
    ...createColumnAlign("center"),
    render: (rowData: RowData) =>
      h(Detail, {
        pypi: rowData.plugin.project_link,
        module: rowData.plugin.module_name,
      }),
  },
];
</script>

<template>
  <n-space v-if="loading" vertical>
    <n-skeleton height="48px" />
    <n-skeleton v-for="i in pagination.pageSize" :key="i" height="62px" />
  </n-space>
  <n-data-table
    v-else
    class="overflow-auto whitespace-nowrap"
    :data="data"
    :pagination="pagination"
    :columns="columns"
  />
</template>

<style scoped>
.n-data-table :deep(.n-pagination) {
  @apply overflow-auto;
}
</style>
