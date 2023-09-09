<script setup lang="ts">
import { ref } from "vue";

import { NModal } from "naive-ui";
import PuzzleCheckOutline from "vue-material-design-icons/PuzzleCheckOutline.vue";
import PuzzleMinusOutline from "vue-material-design-icons/PuzzleMinusOutline.vue";
import PuzzleRemoveOutline from "vue-material-design-icons/PuzzleRemoveOutline.vue";

import Load from "@/components/result-table/Load.vue";
import type { Results } from "@/types/results";

defineProps<{
  projectLink: string;
  result: Results[keyof Results];
  skipTest: boolean;
}>();

const showModal = ref(false);
</script>

<template>
  <div
    class="mr-[15px] flex justify-center align-middle cursor-pointer"
    @click="showModal = true"
  >
    <PuzzleMinusOutline
      v-if="skipTest"
      class="color-[#c4c4c4] text-[1.5em] flex justify-center align-middle"
    />
    <PuzzleCheckOutline
      v-else-if="result.results.load"
      class="color-[#18a058] text-[1.5em] flex justify-center align-middle"
    />
    <PuzzleRemoveOutline
      v-else
      class="color-[#d03050] text-[1.5em] flex justify-center align-middle"
    />
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
