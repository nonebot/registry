<script setup lang="ts">
import { ref, inject } from "vue";

import { NModal, NButton, NIcon } from "naive-ui";
import FileDocument from "vue-material-design-icons/FileDocument.vue";
import PackageVariant from "vue-material-design-icons/PackageVariant.vue";
import PackageVariantRemove from "vue-material-design-icons/PackageVariantRemove.vue";

import Metadata from "@/components/result-table/Metadata.vue";
import { CopyText } from "@/types/inject";
import type { Results } from "@/types/results";

const props = defineProps<{
  projectLink: string;
  result: Results[keyof Results];
}>();
const showModal = ref(false);

const copyText = inject(CopyText, () => undefined);
</script>

<template>
  <div
    class="mr-[15px] flex justify-center align-middle cursor-pointer"
    @click="showModal = true"
    @contextmenu.prevent="
      copyText(JSON.stringify(props.result.outputs.metadata, null, 2), '元数据')
    "
  >
    <PackageVariant
      v-if="result.results.metadata"
      class="flex justify-center align-middle color-[#5784ff]"
    />
    <PackageVariantRemove
      v-else
      class="flex justify-center align-middle color-[#ffcc66]"
    />
  </div>
  <n-modal
    v-model:show="showModal"
    class="max-w-3/4"
    preset="card"
    :title="`${projectLink} 元数据`"
  >
    <template #header-extra>
      <n-button
        size="small"
        type="tertiary"
        class="mr-[10px]"
        @click="
          copyText(
            JSON.stringify(props.result.outputs.metadata, null, 2),
            '元数据',
          )
        "
      >
        <n-icon>
          <FileDocument />
        </n-icon>
      </n-button>
    </template>
    <template #default>
      <div ref="screenshotMetadataArea">
        <Metadata :result="props.result" dense />
      </div>
    </template>
  </n-modal>
</template>
