<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <h1>404 NotFound界面:{{ route.path }}</h1>
</template>

<style scoped></style>
