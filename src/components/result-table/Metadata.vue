<script setup lang="ts">
import { defineComponent } from "vue";

import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

import type { Results } from "@/types/results";

hljs.registerLanguage("json", json);

const highlightjs = defineComponent(hljsVuePlugin.component);

const props = defineProps<{
  result: Results[keyof Results];
}>();
</script>

<template>
  <highlightjs
    class="max-h-[50vh] overflow-auto"
    language="json"
    ignore-illegals
    :autodetect="false"
    :code="JSON.stringify(props.result.outputs.metadata, null, 2)"
  />
</template>

<style scoped></style>
