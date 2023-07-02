<script setup lang="ts">
import { ref } from "vue";

import hljsVuePlugin from "@highlightjs/vue-plugin";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import { NModal, NButton } from "naive-ui";
import PackageVariant from "vue-material-design-icons/PackageVariant.vue";
import PackageVariantRemove from "vue-material-design-icons/PackageVariantRemove.vue";

import { Results } from "@/types/results";

hljs.registerLanguage("json", json);

const props = defineProps<{
  projectLink: string;
  result: Results[keyof Results];
}>();
const showModal = ref(false);
</script>

<template>
  <n-button text @click="showModal = true">
    <PackageVariant
      v-if="result.results.metadata"
      style="color: rgb(42, 95, 243)"
    />
    <PackageVariantRemove v-else style="color: rgb(236, 194, 5)" />
  </n-button>
  <n-modal
    v-model:show="showModal"
    class="max-w-3/4"
    preset="card"
    :title="`${projectLink} 元数据`"
  >
    <template #default>
      <hljsVuePlugin.component
        class="max-h-[50vh] overflow-auto"
        language="json"
        :autodetect="false"
        :code="JSON.stringify(props.result.outputs.metadata, null, 2)"
      />
    </template>
  </n-modal>
</template>
