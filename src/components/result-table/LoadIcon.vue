<script setup lang="ts">
import { ref } from "vue";

import { NModal } from "naive-ui";
import PuzzleCheckOutline from "vue-material-design-icons/PuzzleCheckOutline.vue";
import PuzzleRemoveOutline from "vue-material-design-icons/PuzzleRemoveOutline.vue";

import Load from "@/components/result-table/Load.vue";
import type { Results } from "@/types/results";

defineProps<{ projectLink: string; result: Results[keyof Results] }>();

const showModal = ref(false);
</script>

<template>
  <div
    class="mr-[15px] flex justify-center align-middle cursor-pointer"
    @click="showModal = true"
  >
    <PuzzleCheckOutline
      v-if="result.results.load"
      class="ok flex justify-center align-middle"
    />
    <PuzzleRemoveOutline v-else class="err flex justify-center align-middle" />
  </div>
  <n-modal
    v-model:show="showModal"
    class="max-w-3/4"
    preset="card"
    :title="`${projectLink} 加载日志`"
  >
    <template #default>
      <Load :result="result" dense />
    </template>
  </n-modal>
</template>
