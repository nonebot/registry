<script setup lang="ts">
import { NA, useMessage } from "naive-ui";
import useClipboard from "vue-clipboard3";

defineProps<{ author: string; dense?: boolean }>();

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
    :class="{
      'mr-[15px]': dense,
    }"
    :href="`https://github.com/${author}/`"
    target="_blank"
    @contextmenu.prevent="copyText(author)"
  >
    {{ author }}
  </n-a>
</template>
