<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { useRoute, useRouter } from "vue-router";

import Table from "@/components/Table.vue";

const route = useRoute();
const router = useRouter();

const searchKeyword = ref("");
onBeforeMount(() => {
  if (route.query.q) {
    searchKeyword.value = route.query.q as string;
  }
  router.push({ query: {} });
});
</script>

<template>
  <Table :search-keyword="searchKeyword"></Table>
</template>

<style scoped></style>
