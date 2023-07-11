<script setup lang="ts">
import { inject } from "vue";

import { NA, NIcon } from "naive-ui";
import Author from "vue-material-design-icons/AccountOutline.vue";

import { CopyText } from "@/types/inject";

defineProps<{ author: string; dense?: boolean }>();

const copyText = inject(CopyText, () => undefined);
</script>

<template>
  <n-a
    class="text-inherit hover:color-[#ea5252] no-underline flex items-center"
    :class="{
      'mr-[15px]': dense,
    }"
    :href="`https://github.com/${author}/`"
    target="_blank"
  >
    <n-icon @contextmenu.prevent="copyText(author)">
      <Author />
    </n-icon>
    {{ author }}
  </n-a>
</template>
