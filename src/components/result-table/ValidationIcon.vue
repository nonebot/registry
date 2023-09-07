<script setup lang="ts">
import { computed, ref } from "vue";

import { NModal, NTag, NIcon } from "naive-ui";
import CheckCircleOutline from "vue-material-design-icons/CheckCircleOutline.vue";
import CheckCloseOutline from "vue-material-design-icons/CloseCircleOutline.vue";
import ProgressCheck from "vue-material-design-icons/ProgressCheck.vue";

import type { Plugin } from "@/types/plugins";
import type { Results } from "@/types/results";

import Validation from "./Validation.vue";

const props = defineProps<{
  result: Results[keyof Results];
  plugin: Plugin;
}>();

const showModal = ref(false);

const icon = computed(() => {
  if (props.plugin.skip_test) {
    return {
      show: ProgressCheck,
      color: {
        color: "#c4c4c411",
        textColor: "#6ae97b",
        borderColor: "#6ae97b55",
      },
    };
  } else if (props.result.results.validation) {
    return {
      show: CheckCircleOutline,
      color: {
        color: "#6ae97b11",
        textColor: "#6ae97b",
        borderColor: "#6ae97b55",
      },
    };
  } else {
    return {
      show: CheckCloseOutline,
      color: {
        color: "#ff6c6c11",
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
      {{ `v${plugin.version}` }}
      <template #icon>
        <n-icon :component="icon.show" />
      </template>
    </n-tag>
  </div>
  <n-modal
    v-model:show="showModal"
    preset="card"
    class="max-w-3/4"
    :title="`${plugin.project_link} 验证结果`"
  >
    <template #default>
      <Validation :validation="result.outputs.validation" :plugin="plugin" />
    </template>
  </n-modal>
</template>
