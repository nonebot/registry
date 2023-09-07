<script setup lang="ts">
import { h } from "vue";

import { NDataTable, NTag, NCode, NTooltip, NText, NA } from "naive-ui";
import type { DataTableColumns } from "naive-ui";

import { Plugin } from "@/types/plugins";
import { ValidationError, ValidationResult } from "@/types/results";

const props = defineProps<{
  validation: ValidationResult | null;
  plugin: Plugin;
}>();

const errColumns: DataTableColumns<ValidationError> = [
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

const okColumns: DataTableColumns<{ key: string; value: unknown }> = [
  {
    title: "属性",
    key: "key",
    render(row) {
      return h(NText, { strong: true }, { default: () => row.key });
    },
  },
  {
    title: "内容",
    key: "value",
    render(row) {
      return h(
        NText,
        { copyable: true },
        { default: () => dispatchRender(row) },
      );
    },
  },
];
const pluginData = Object.entries(props.plugin).map(([key, value]) => ({
  key: key,
  value: value,
}));

const dispatchRender = (row: { key: string; value: unknown }) => {
  if (row.key === "supported_adapters") {
    return h(
      NTag,
      {
        type: "success",
        class: {
          "mr-1": true,
          "mb-1": true,
        },
      },
      {
        default: () =>
          ((row.value as string[]) ?? ["所有/未标记"]).map((adapter) =>
            adapter.replace("nonebot.adapters.", ""),
          ),
      },
    );
  }
  switch (typeof row.value) {
    case "string":
      if (row.key === "time") {
        return h(
          NText,
          {},
          { default: () => new Date(row.value as string).toLocaleString() },
        );
      } else if (row.key === "homepage") {
        return h(
          NA,
          {
            class: {
              "text-inherit": true,
              "hover:color-[#ea5252]": true,
              "no-underline": true,
            },
            href: row.value as string,
            target: "_blank",
          },
          { default: () => row.value },
        );
      }
      return h(NText, {}, { default: () => row.value });
    case "boolean":
      return h(
        NTag,
        { type: row ? "success" : "error" },
        { default: () => (row ? "True" : "False") },
      );
    case "number":
      return h(NText, {}, { default: () => row.value });
    case "object":
      if (row.key === "tags") {
        let tags = (row.value as { label: string; color: string }[]).map(
          (tag) =>
            h(
              NTag,
              {
                color: {
                  color: tag.color,
                  textColor: pickTextColor(tag.color),
                },
                class: {
                  "mr-1": true,
                  "mb-1": true,
                },
                bordered: false,
              },
              {
                default: () => tag.label,
              },
            ),
        );
        return tags;
      } else {
        return h(NText, {}, { default: () => JSON.stringify(row.value) });
      }
    default:
      return h(NText, {}, { default: () => JSON.stringify(row.value) });
  }
};

const pickTextColor = (bgColor: string): string => {
  let color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  let r = parseInt(color.substring(0, 2), 16); // hexToR
  let g = parseInt(color.substring(2, 4), 16); // hexToG
  let b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#fff";
};
</script>

<template>
  <div v-if="props.validation">
    <p>在商店发布验证流程中，该插件发生如下错误：</p>
    <n-data-table :columns="errColumns" :data="props.validation.errors" />
  </div>
  <div v-else>
    <p>插件通过商店发布验证流程。</p>
    <n-data-table :columns="okColumns" :data="pluginData" />
  </div>
</template>

<style scoped></style>
