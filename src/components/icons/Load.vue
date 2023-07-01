<script setup lang="ts">
import { ref } from "vue";

import AnsiUp from "ansi_up";
import { NModal } from "naive-ui";
import PuzzleCheckOutline from "vue-material-design-icons/PuzzleCheckOutline.vue";
import PuzzleRemoveOutline from "vue-material-design-icons/PuzzleRemoveOutline.vue";

import { Results } from "@/types/results";

const ansi_up = new AnsiUp();

defineProps<{ rowData: Results[keyof Results] }>();

const showModal = ref(false);
</script>

<template>
  <div @click="showModal = true">
    <PuzzleCheckOutline v-if="rowData.results.load" class="ok" />
    <PuzzleRemoveOutline v-else class="err" />
  </div>
  <n-modal
    v-model:show="showModal"
    class="max-w-3/4"
    preset="card"
    :title="`${rowData.plugin.old.project_link} 加载日志`"
  >
    <template #default>
      <pre
        class="max-h-[50vh] overflow-auto"
        v-html="ansi_up.ansi_to_html(rowData.outputs.load)"
      ></pre>
    </template>
  </n-modal>
</template>
