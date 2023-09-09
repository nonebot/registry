<script setup lang="ts">
import { NAlert, NTag, NText } from "naive-ui";

import type { Plugin } from "@/types/plugins";
import type { ValidationResult } from "@/types/results";
import { pickTextColor } from "@/utils/color";

import HoverTooltip from "../HoverTooltip.vue";
import TagPill from "../TagPill.vue";

const props = defineProps<{
  validation: ValidationResult | null;
  plugin: Plugin;
}>();
</script>

<template>
  <div v-if="props.validation" class="xl:inline-flex">
    <n-alert
      v-for="(error, i) in props.validation.errors"
      :key="i"
      class="mb-2 mr-2"
      type="error"
    >
      <template #header>
        <HoverTooltip :source="error.loc.join('&')" :tip="error.type" />
      </template>
      <HoverTooltip :source="error.msg" :tip="JSON.stringify(error.ctx)" />
      <br />
    </n-alert>
  </div>
  <div v-else class="inline-block">
    <p>插件通过商店发布验证流程。</p>
    <TagPill
      v-for="(value, key) in props.plugin"
      :key="key"
      class="text-xs"
      :label="key"
    >
      <template #default>
        <n-text v-if="key == 'time'">
          {{ new Date(value as string).toLocaleString() }}
        </n-text>
        <n-text
          v-else-if="['string', 'boolean', 'number'].includes(typeof value)"
          >{{ value?.toString() }}</n-text
        >
        <n-tag
          v-for="(tag, index) in props.plugin.tags"
          v-else-if="key == 'tags'"
          :key="index"
          size="small"
          class="mr-1"
          :bordered="false"
          :color="{
            color: tag.color,
            textColor: pickTextColor(tag.color),
          }"
        >
          {{ tag.label }}
        </n-tag>
        <n-tag
          v-for="adapter in props.plugin.supported_adapters || ['所有/未标记']"
          v-else-if="key == 'supported_adapters'"
          :key="adapter"
          size="small"
          class="mr-1"
          type="success"
        >
          {{ adapter.replace("nonebot.adapters.", "") }}
        </n-tag>
        <n-text v-else>{{ JSON.stringify(value) }}</n-text>
      </template>
    </TagPill>
  </div>
</template>

<style scoped></style>
