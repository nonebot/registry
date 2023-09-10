<script setup lang="ts">
import { mdiPackage } from "@mdi/js";
import { NA } from "naive-ui";

import Icon from "../Icon.vue";
defineProps<{
  moduleName: string;
  projectLink: string;
  homepage: string;
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
    <Icon :path="mdiPackage" />
    {{ moduleName }}
  </n-a>
</template>
