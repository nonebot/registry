<script setup lang="ts">
import { NButton, NLayout, NResult } from "naive-ui";

defineProps<{ pathMatched?: string }>();
</script>

<template>
  <n-layout class="m-3">
    <n-result status="404" title="404 页面不存在" :description="pathMatched">
      <template #footer>
        <router-link to="/">
          <n-button size="large">返回主页</n-button>
        </router-link>
      </template>
    </n-result>
  </n-layout>
</template>

<style scoped></style>
