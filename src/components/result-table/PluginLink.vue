<script setup lang="ts">
import { inject } from "vue";

import { NA, NIcon } from "naive-ui";
import FolderZip from "vue-material-design-icons/FolderZip.vue";
import HelpBox from "vue-material-design-icons/HelpBox.vue";
import Package from "vue-material-design-icons/Package.vue";

import { CopyText } from "@/types/inject";

const copyText = inject(CopyText, () => undefined);

defineProps<{
  moduleName: string;
  projectLink: string;
  homepage: string;
  pluginType?: string;
}>();
</script>

<template>
  <n-a
    class="text-inherit hover:color-[#ea5252] no-underline"
    :href="`https://pypi.org/project/${projectLink}/`"
    target="_blank"
  >
    {{ projectLink }}
  </n-a>
  <br />
  <n-a
    class="color-gray hover:color-[#ea5252] no-underline flex items-center"
    :href="homepage"
    target="_blank"
  >
    <n-icon @contextmenu.prevent="copyText(moduleName)">
      <Package v-if="pluginType == 'application'" />
      <FolderZip v-else-if="pluginType == 'library'" />
      <HelpBox v-else />
    </n-icon>
    {{ moduleName }}
  </n-a>
</template>
