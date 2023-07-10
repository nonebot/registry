<script setup lang="ts">
import { NA, NIcon, useMessage } from "naive-ui";
import useClipboard from "vue-clipboard3";
import FolderZip from "vue-material-design-icons/FolderZip.vue";
import HelpBox from "vue-material-design-icons/HelpBox.vue";
import Package from "vue-material-design-icons/Package.vue";

defineProps<{
  moduleName: string;
  projectLink: string;
  homepage: string;
  pluginType?: string;
}>();

const { toClipboard } = useClipboard();
const message = useMessage();

const copyText = (text: string) => {
  toClipboard(text);
  message.success(`已复制: ${text}`);
};
</script>

<template>
  <n-a
    class="text-inherit hover:color-[#ea5252] no-underline"
    :href="`https://pypi.org/project/${projectLink}/`"
    target="_blank"
    @contextmenu.prevent="copyText(projectLink)"
  >
    {{ projectLink }}
  </n-a>
  <br />
  <n-a
    class="color-gray hover:color-[#ea5252] no-underline flex items-center"
    :href="homepage"
    target="_blank"
    @contextmenu.prevent="copyText(moduleName)"
  >
    <n-icon>
      <Package v-if="pluginType == 'application'" />
      <FolderZip v-else-if="pluginType == 'library'" />
      <HelpBox v-else />
    </n-icon>
    {{ moduleName }}
  </n-a>
</template>
