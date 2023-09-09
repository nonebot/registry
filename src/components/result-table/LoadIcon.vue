<script setup lang="ts">
import { ref } from "vue";

import { NEl, NModal } from "naive-ui";
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
  <n-el
    tag="div"
    class="mr-[15px] flex justify-center align-middle duration-300 cursor-pointer ease-[--cubic-bezier-ease-in-out]"
    @click="showModal = true"
  >
    <PuzzleMinusOutline
      v-if="skipTest"
      class="color-[#c4c4c4] text-[1.5em] flex justify-center align-middle"
    />
    <PuzzleCheckOutline
      v-else-if="result.results.load"
      class="color-[--success-color] text-[1.5em] flex justify-center align-middle"
    />
    <PuzzleRemoveOutline
      v-else
      class="color-[--error-color] text-[1.5em] flex justify-center align-middle"
    />
  </n-el>
  <n-modal
    v-model:show="showModal"
    class="lg:max-w-1/2"
    preset="card"
    :title="`${projectLink} 加载日志`"
  >
    <template #default>
      <Load :result="result" dense />
    </template>
  </n-modal>
</template>
