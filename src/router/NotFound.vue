<script setup lang="ts">
import { NResult, NButton, NLayout } from "naive-ui";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <n-layout class="m-3">
    <n-result status="404" title="404 页面不存在" :description="route.path">
      <template #footer>
        <router-link to="/">
          <n-button>返回主页</n-button>
        </router-link>
      </template>
    </n-result>
  </n-layout>
</template>

<style scoped></style>
