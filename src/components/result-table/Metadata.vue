<script setup lang="ts">
import { NCode } from "naive-ui";

import type { Results } from "@/types/results";

const props = defineProps<{
  result: Results[keyof Results];
  dense?: boolean;
}>();
</script>

<template>
  <n-code
    class="overflow-auto"
    :class="{
      'max-h-[50vh]': dense,
    }"
    :code="JSON.stringify(props.result.outputs.metadata, null, 2)"
    language="json"
    word-wrap
  />
</template>

<style scoped></style>
