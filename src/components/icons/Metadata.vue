<template>
  <div @click="showModal = true">
    <PackageVariant
      v-if="rowData.results.validation"
      style="color: rgb(42, 95, 243)"
    />
    <PackageVariantRemove v-else style="color: rgb(236, 194, 5)" />
  </div>
  <n-modal
    v-model:show="showModal"
    class="max-w-3/4"
    preset="card"
    :title="`${rowData.plugin.old.project_link} 元数据`"
  >
    <template #default>
      <hljsVuePlugin.component
        class="max-h-[50vh] overflow-auto"
        language="json"
        :autodetect="false"
        :code="JSON.stringify(props.rowData.outputs.metadata, null, 2)"
      />
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

import hljsVuePlugin from "@highlightjs/vue-plugin";
import { NModal } from "naive-ui";
import PackageVariant from "vue-material-design-icons/PackageVariant.vue";
import PackageVariantRemove from "vue-material-design-icons/PackageVariantRemove.vue";

import { Results } from "@/types/results";

const props = defineProps<{ rowData: Results[keyof Results] }>();

const showModal = ref(false);
</script>
