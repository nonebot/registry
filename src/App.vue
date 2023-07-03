<script setup lang="ts">
import { usePageStore } from "@/stores/page";

const store = usePageStore();
store.initData();
</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
