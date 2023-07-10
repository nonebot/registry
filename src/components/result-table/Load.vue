<script setup lang="ts">
import AnsiUp from "ansi_up";

import type { Results } from "@/types/results";

defineProps<{ result: Results[keyof Results]; dense?: boolean }>();
const ansi_up = new AnsiUp();
</script>

<template>
  <pre
    class="overflow-auto font-mono"
    :class="{
      'max-h-[50vh]': dense,
    }"
    v-html="ansi_up.ansi_to_html(result.outputs.load)"
  ></pre>
</template>

<style scoped></style>
