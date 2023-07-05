<script setup lang="ts">
import Table from "@/components/Table.vue";

defineProps<{ query: string }>();
</script>

<template>
  <Table :search-keyword="query"></Table>
</template>

<style scoped></style>
