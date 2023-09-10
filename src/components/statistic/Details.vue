<script setup lang="ts">
import { mdiPackageVariantClosedCheck, mdiPuzzleCheckOutline } from "@mdi/js";
import { NDivider, NNumberAnimation, NSpace } from "naive-ui";

import Icon from "../Icon.vue";

defineProps<{ loadCount: number; metadataCount: number }>();
</script>

<template>
  <n-space justify="space-around" inline>
    <div class="w-[50px] inline-flex items-center align-middle">
      <Icon
        size="14"
        color="#66afd3"
        class="mr-1 overflow-hidden"
        :path="mdiPackageVariantClosedCheck"
      />
      <span class="inline-flex items-center align-middle text-sm!">
        <n-number-animation class="text-xs!" :from="0" :to="metadataCount" />
      </span>
    </div>
    <n-divider vertical />
    <div class="w-[50px] inline-flex items-center align-middle">
      <Icon
        size="14"
        color="#5acea7"
        class="mr-1 overflow-hidden"
        :path="mdiPuzzleCheckOutline"
      />
      <span class="inline-flex items-center align-middle text-sm!">
        <n-number-animation :from="0" :to="loadCount" />
      </span>
    </div>
  </n-space>
</template>
