<script setup lang="ts">
import { inject } from "vue";

import { NA } from "naive-ui";

import { CopyText } from "@/types/inject";

defineProps<{ author: string; dense?: boolean }>();

const copyText = inject(CopyText, () => undefined);
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
