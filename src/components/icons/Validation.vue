<template>
  <div @click="showModal = true">
    <CheckCircleOutline v-if="rowData.results.validation" class="ok" />
    <CheckCloseOutline v-else class="err" />
  </div>
  <n-modal
    v-model:show="showModal"
    preset="card"
    class="max-w-3/4"
    :title="`${rowData.plugin.old.project_link} 验证结果`"
  >
    <template #default>
      <pre class="max-h-[50vh] overflow-auto">{{
        rowData.outputs.validation
      }}</pre>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { NModal } from "naive-ui";
import CheckCircleOutline from "vue-material-design-icons/CheckCircleOutline.vue";
import CheckCloseOutline from "vue-material-design-icons/CloseCircleOutline.vue";

import { Results } from "@/types/results";

defineProps<{ rowData: Results[keyof Results] }>();

const showModal = ref(false);
</script>
