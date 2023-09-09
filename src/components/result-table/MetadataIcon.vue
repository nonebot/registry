<script setup lang="ts">
import { ref } from "vue";

import { NModal } from "naive-ui";
import PackageVariant from "vue-material-design-icons/PackageVariant.vue";
import PackageVariantMinus from "vue-material-design-icons/PackageVariantMinus.vue";
import PackageVariantRemove from "vue-material-design-icons/PackageVariantRemove.vue";

import Metadata from "@/components/result-table/Metadata.vue";
import type { Results } from "@/types/results";

const props = defineProps<{
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
    <PackageVariantMinus
      v-if="skipTest"
      class="flex justify-center align-middle color-[#c4c4c4]"
    />
    <PackageVariant
      v-else-if="result.results.metadata"
      class="flex justify-center align-middle color-[#2080f0]"
    />
    <PackageVariantRemove
      v-else
      class="flex justify-center align-middle color-[#f0a020]"
    />
  </div>
  <n-modal
    v-model:show="showModal"
    class="max-w-3/4"
    preset="card"
    :title="`${projectLink} 元数据`"
  >
    <template #default>
      <Metadata :result="props.result" dense />
    </template>
  </n-modal>
</template>
