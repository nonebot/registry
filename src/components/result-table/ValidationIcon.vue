<script setup lang="ts">
import { ref } from "vue";

import { NModal } from "naive-ui";
import CheckCircleOutline from "vue-material-design-icons/CheckCircleOutline.vue";
import CheckCloseOutline from "vue-material-design-icons/CloseCircleOutline.vue";

import type { Results } from "@/types/results";

defineProps<{ projectLink: string; result: Results[keyof Results] }>();

const showModal = ref(false);
</script>

<template>
  <div
    class="mr-[15px] flex justify-center align-middle cursor-pointer"
    @click="showModal = true"
  >
    <CheckCircleOutline
      v-if="result.results.validation"
      class="ok flex justify-center align-middle"
    />
    <CheckCloseOutline v-else class="err flex justify-center align-middle" />
  </div>
  <n-modal
    v-model:show="showModal"
    preset="card"
    class="max-w-3/4"
    :title="`${projectLink} 验证结果`"
  >
    <template #default>
      <pre class="max-h-[50vh] overflow-auto font-mono">{{
        result.outputs.validation
      }}</pre>
    </template>
  </n-modal>
</template>
