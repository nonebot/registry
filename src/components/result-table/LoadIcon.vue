<script setup lang="ts">
import { ref } from "vue";

import {
  mdiPuzzleCheckOutline,
  mdiPuzzleMinusOutline,
  mdiPuzzleRemoveOutline,
} from "@mdi/js";
import { NEl, NModal } from "naive-ui";

import Load from "@/components/result-table/Load.vue";
import type { Results } from "@/types/results";

import Icon from "../Icon.vue";

const props = defineProps<{
  projectLink: string;
  result: Results[keyof Results];
  skipTest: boolean;
}>();

const showModal = ref(false);
const iconPath =
  (props.skipTest && mdiPuzzleMinusOutline) ||
  (props.result.results.load && mdiPuzzleCheckOutline) ||
  mdiPuzzleRemoveOutline;
</script>

<template>
  <n-el
    tag="div"
    class="mr-[15px] flex justify-center align-middle duration-300 cursor-pointer ease-[--cubic-bezier-ease-in-out]"
    @click="showModal = true"
  >
    <Icon
      :size="24"
      :path="iconPath"
      :class="[
        {
          'color-[#c4c4c4]': skipTest,
          'color-[--success-color]': result.results.load,
          'color-[--error-color]': !skipTest && !result.results.load,
        },
        'text-[1.5em] flex justify-center align-middle',
      ]"
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
