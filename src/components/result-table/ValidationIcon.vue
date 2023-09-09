<script setup lang="ts">
import { ref } from "vue";

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

const getTagType = () => {
  if (props.plugin.skip_test) return "default";
  return props.result.results.validation ? "success" : "error";
};

const getTagComponent = () => {
  if (props.plugin.skip_test) {
    return ProgressCheck;
  } else if (props.result.results.validation) {
    return CheckCircleOutline;
  } else {
    return CheckCloseOutline;
  }
};
</script>

<template>
  <div
    class="mr-[15px] flex justify-center align-middle cursor-pointer"
    @click="showModal = true"
  >
    <n-tag round :type="getTagType()">
      {{ `v${plugin.version}` }}
      <template #icon>
        <n-icon :component="getTagComponent()" />
      </template>
    </n-tag>
  </div>
  <n-modal
    v-model:show="showModal"
    preset="card"
    class="max-w-1/2"
    :title="`${plugin.project_link} 验证结果`"
  >
    <template #default>
      <Validation :validation="result.outputs.validation" :plugin="plugin" />
    </template>
  </n-modal>
</template>
