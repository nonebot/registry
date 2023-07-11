<script setup lang="ts">
import { ref, inject } from "vue";

import { NModal, NButton, NIcon } from "naive-ui";
import CameraOutline from "vue-material-design-icons/CameraOutline.vue";
import FileDocument from "vue-material-design-icons/FileDocument.vue";
import PuzzleCheckOutline from "vue-material-design-icons/PuzzleCheckOutline.vue";
import PuzzleRemoveOutline from "vue-material-design-icons/PuzzleRemoveOutline.vue";

import Load from "@/components/result-table/Load.vue";
import { CopyText, CopyImage } from "@/types/inject";
import type { Results } from "@/types/results";

const props = defineProps<{
  projectLink: string;
  result: Results[keyof Results];
}>();

const showModal = ref(false);

const copyText = inject(CopyText, () => undefined);
const screenshotLoadArea = ref<HTMLElement | null>(null);
const copyImage = inject(CopyImage, () => undefined);

const copyTrimLog = () => {
  if (screenshotLoadArea.value) {
    copyText(screenshotLoadArea.value.innerText, "加载日志");
  } else {
    // eslint-disable-next-line no-control-regex
    let regex = /\x1b\[\d+(;\d+)?m/g;
    let trimLog = props.result.outputs.load.replace(regex, "");
    copyText(trimLog, "加载日志");
  }
};
</script>

<template>
  <div
    class="mr-[15px] flex justify-center align-middle cursor-pointer"
    @click="showModal = true"
    @contextmenu.prevent="copyTrimLog"
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
    <template #header-extra>
      <n-button
        size="small"
        type="tertiary"
        class="mr-[10px]"
        @click="copyImage(screenshotLoadArea, '加载日志')"
      >
        <n-icon>
          <CameraOutline />
        </n-icon>
      </n-button>
      <n-button
        size="small"
        type="tertiary"
        class="mr-[10px]"
        @click="copyTrimLog"
      >
        <n-icon>
          <FileDocument />
        </n-icon>
      </n-button>
    </template>
    <template #default>
      <div ref="screenshotLoadArea">
        <Load :result="result" dense />
      </div>
    </template>
  </n-modal>
</template>
