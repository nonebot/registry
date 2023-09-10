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
        size="16"
        color="#66afd3"
        class="mr-1 overflow-hidden"
        :path="mdiPackageVariantClosedCheck"
      />
      <n-number-animation :from="0" :to="metadataCount" />
    </div>
    <n-divider vertical />
    <div class="w-[50px] inline-flex items-center align-middle">
      <Icon
        size="16"
        color="#5acea7"
        class="mr-1 overflow-hidden"
        :path="mdiPuzzleCheckOutline"
      />
      <n-number-animation :from="0" :to="loadCount" />
    </div>
  </n-space>
</template>
