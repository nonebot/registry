<script setup lang="ts">
import { computed, ref } from "vue";

import {
  mdiPackageVariant,
  mdiPackageVariantMinus,
  mdiPackageVariantRemove,
} from "@mdi/js";
import { NEl, NModal } from "naive-ui";

import Metadata from "@/components/result-table/Metadata.vue";
import type { Results } from "@/types/results";

import Icon from "../Icon.vue";

const props = defineProps<{
  projectLink: string;
  result: Results[keyof Results];
  skipTest: boolean;
}>();

const showModal = ref(false);
const iconPath = computed(
  () =>
    (props.skipTest && mdiPackageVariantMinus) ||
    (props.result.results.metadata && mdiPackageVariant) ||
    mdiPackageVariantRemove,
);
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
          'color-[--info-color]': result.results.metadata,
          'color-[--warning-color]': !skipTest && !result.results.metadata,
        },
        'text-[1.5em] flex justify-center align-middle',
      ]"
    />
  </n-el>
  <n-modal
    v-model:show="showModal"
    class="lg:max-w-1/2"
    preset="card"
    :title="`${projectLink} 元数据`"
  >
    <template #default>
      <Metadata :result="props.result" />
    </template>
  </n-modal>
</template>
