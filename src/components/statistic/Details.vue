<script setup lang="ts">
import { mdiPackageVariantClosedCheck, mdiPuzzleCheckOutline } from "@mdi/js";
import { NDivider, NNumberAnimation } from "naive-ui";

import Icon from "../Icon.vue";

defineProps<{ loadCount: number; metadataCount: number }>();
</script>

<template>
  <div class="flex items-center justify-between align-middle text-center">
    <div class="inline-flex items-center align-text-bottom text-sm">
      <Icon
        color="#66afd3"
        class="mx-1 overflow-hidden"
        :path="mdiPackageVariantClosedCheck"
      />
      <n-number-animation :from="0" :to="metadataCount" />
    </div>
    <n-divider vertical />
    <div class="inline-flex items-center align-text-bottom text-sm">
      <Icon
        color="#5acea7"
        class="mx-1 overflow-hidden"
        :path="mdiPuzzleCheckOutline"
      />
      <n-number-animation :from="0" :to="loadCount" />
    </div>
  </div>
</template>
