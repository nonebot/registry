<script setup lang="ts">
import { ref } from "vue";

import { NModal } from "naive-ui";
import PackageVariant from "vue-material-design-icons/PackageVariant.vue";
import PackageVariantRemove from "vue-material-design-icons/PackageVariantRemove.vue";

import Metadata from "@/components/result-table/Metadata.vue";
import type { Results } from "@/types/results";

const props = defineProps<{
  projectLink: string;
  result: Results[keyof Results];
}>();
const showModal = ref(false);
</script>

<template>
  <div
    class="mr-[15px] flex justify-center align-middle cursor-pointer"
    @click="showModal = true"
  >
    <PackageVariant
      v-if="result.results.metadata"
      class="flex justify-center align-middle"
      style="color: rgb(42, 95, 243)"
    />
    <PackageVariantRemove
      v-else
      class="flex justify-center align-middle"
      style="color: rgb(236, 194, 5)"
    />
  </div>
  <n-modal
    v-model:show="showModal"
    class="max-w-3/4"
    preset="card"
    :title="`${projectLink} 元数据`"
  >
    <template #default>
      <Metadata :result="props.result" />
    </template>
  </n-modal>
</template>
