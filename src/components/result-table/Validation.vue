<script setup lang="ts">
import { h } from "vue";

import { NDataTable, NTag, NCode, NTooltip } from "naive-ui";
import type { DataTableColumns } from "naive-ui";

import { ValidationError, ValidationResult } from "@/types/results";

const props = defineProps<{ validation: ValidationResult | null }>();

const columns: DataTableColumns<ValidationError> = [
  {
    title: "属性",
    key: "loc",
    render(row) {
      const tags = row.loc.map((tagKey) => {
        return h(
          NTooltip,
          {
            trigger: "hover",
          },
          {
            default: () => row.type,
            trigger: () =>
              h(
                NTag,
                {
                  style: {
                    marginRight: "6px",
                  },
                  type: "error",
                  bordered: false,
                },
                {
                  default: () => tagKey,
                },
              ),
          },
        );
      });
      return tags;
    },
  },
  {
    title: "信息",
    key: "msg",
    render(row) {
      return h(
        NTooltip,
        {
          trigger: "hover",
        },
        {
          default: () =>
            h(NCode, { code: JSON.stringify(row.ctx), wordWrap: true }),
          trigger: () => h("span", row.msg),
        },
      );
    },
  },
];
</script>

<template>
  <div v-if="props.validation">
    <p>在商店发布验证流程中，该插件发生如下错误：</p>
    <n-data-table :columns="columns" :data="props.validation.errors" />
  </div>
  <div v-else>
    <p>插件通过商店发布验证流程。</p>
  </div>
</template>

<style scoped></style>
