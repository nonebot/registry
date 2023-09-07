<script setup lang="ts">
import { computed, ref } from "vue";

import { NModal, NTag, NIcon } from "naive-ui";
import CheckCircleOutline from "vue-material-design-icons/CheckCircleOutline.vue";
import CheckCloseOutline from "vue-material-design-icons/CloseCircleOutline.vue";
import ProgressCheck from "vue-material-design-icons/ProgressCheck.vue";

import type { Results } from "@/types/results";

import Validation from "./Validation.vue";

const props = defineProps<{
  projectLink: string;
  result: Results[keyof Results];
  skipTest: boolean;
  version: string;
}>();

const showModal = ref(false);

const icon = computed(() => {
  if (props.skipTest) {
    return {
      show: ProgressCheck,
      color: {
        textColor: "#6ae97b",
        borderColor: "#6ae97b55",
      },
    };
  } else if (props.result.results.validation) {
    return {
      show: CheckCircleOutline,
      color: {
        textColor: "#6ae97b",
        borderColor: "#6ae97b55",
      },
    };
  } else {
    return {
      show: CheckCloseOutline,
      color: {
        textColor: "#ff6c6c",
        borderColor: "#ff6c6c55",
      },
    };
  }
});
</script>

<template>
  <div
    class="mr-[15px] flex justify-center align-middle cursor-pointer"
    @click="showModal = true"
  >
    <n-tag round :color="icon.color">
      {{ `v${version}` }}
      <template #icon>
        <n-icon :component="icon.show" />
      </template>
    </n-tag>
  </div>
  <n-modal
    v-model:show="showModal"
    preset="card"
    class="max-w-3/4"
    :title="`${projectLink} 验证结果`"
  >
    <template #default>
      <Validation :validation="result.outputs.validation" />
    </template>
  </n-modal>
</template>
