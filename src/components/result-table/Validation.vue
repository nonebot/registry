<script setup lang="ts">
import { ref } from "vue";

import { NModal, NButton } from "naive-ui";
import CheckCircleOutline from "vue-material-design-icons/CheckCircleOutline.vue";
import CheckCloseOutline from "vue-material-design-icons/CloseCircleOutline.vue";

import { Results } from "@/types/results";

defineProps<{ projectLink: string; result: Results[keyof Results] }>();

const showModal = ref(false);
</script>

<template>
  <n-button text @click="showModal = true">
    <CheckCircleOutline v-if="result.results.validation" class="ok" />
    <CheckCloseOutline v-else class="err" />
  </n-button>
  <n-modal
    v-model:show="showModal"
    preset="card"
    class="max-w-3/4"
    :title="`${projectLink} 验证结果`"
  >
    <template #default>
      <pre class="max-h-[50vh] overflow-auto">{{
        result.outputs.validation
      }}</pre>
    </template>
  </n-modal>
</template>
