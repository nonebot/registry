<script setup lang="ts">
import { NA, NIcon } from "naive-ui";
import Package from "vue-material-design-icons/Package.vue";

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
    <n-icon>
      <Package />
    </n-icon>
    {{ moduleName }}
  </n-a>
</template>
