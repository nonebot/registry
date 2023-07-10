<script setup lang="ts">
import { NSpace, NIcon, NNumberAnimation, NDivider } from "naive-ui";
import PackageVariantClosedCheck from "vue-material-design-icons/PackageVariantClosedCheck.vue";
import PuzzleCheckOutline from "vue-material-design-icons/PuzzleCheckOutline.vue";

defineProps<{ loadCount: number; metadataCount: number }>();
</script>

<template>
  <n-space justify="space-around" inline>
    <div class="w-[50px]">
      <n-icon color="#66afd3" class="mr-[3px] overflow-hidden">
        <PackageVariantClosedCheck />
      </n-icon>
      <n-number-animation :from="0" :to="metadataCount" />
    </div>
    <n-divider vertical />
    <div class="w-[50px]">
      <n-icon color="#5acea7" class="mr-[3px] overflow-hidden">
        <PuzzleCheckOutline />
      </n-icon>
      <n-number-animation :from="0" :to="loadCount" />
    </div>
  </n-space>
</template>
