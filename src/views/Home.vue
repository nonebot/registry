<script setup lang="ts">
import Table from "@/components/Table.vue";

defineProps<{ query?: string }>();
</script>

<template>
  <Table :search-keyword="query" />
</template>

<style scoped></style>
