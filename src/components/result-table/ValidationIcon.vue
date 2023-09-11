<script setup lang="ts">
import { computed, ref } from "vue";

import {
  mdiCheckCircleOutline,
  mdiCloseCircleOutline,
  mdiProgressCheck,
} from "@mdi/js";
import { NModal, NTag } from "naive-ui";

import type { Plugin } from "@/types/plugins";
import type { Results } from "@/types/results";

import Icon from "../Icon.vue";

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
const tagPath = computed(
  () =>
    (props.plugin.skip_test && mdiProgressCheck) ||
    (props.result.results.validation && mdiCheckCircleOutline) ||
    mdiCloseCircleOutline,
);
</script>

<template>
  <div
    class="mr-[15px] flex justify-center align-middle cursor-pointer"
    @click="showModal = true"
  >
    <n-tag round :type="getTagType()">
      {{ `v${plugin.version}` }}
      <template #icon>
        <Icon :path="tagPath" />
      </template>
    </n-tag>
  </div>
  <n-modal
    v-model:show="showModal"
    preset="card"
    class="lg:max-w-1/2"
    :title="`${plugin.project_link} 验证结果`"
  >
    <template #default>
      <Validation :validation="result.outputs.validation" :plugin="plugin" />
    </template>
  </n-modal>
</template>
