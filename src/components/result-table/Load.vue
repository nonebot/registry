<script setup lang="ts">
import AnsiUp from "ansi_up";

import { Results } from "@/types/results";

defineProps<{ result: Results[keyof Results] }>();
const ansi_up = new AnsiUp();
</script>

<template>
  <pre
    class="max-h-[50vh] overflow-auto"
    v-html="ansi_up.ansi_to_html(result.outputs.load)"
  ></pre>
</template>

<style scoped></style>
