<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import Package from "vue-material-design-icons/Package.vue";

defineProps<{
  moduleName: string;
  projectLink: string;
  homepage: string;
}>();
</script>

<template>
  <n-button
    text
    tag="a"
    :href="`https://pypi.org/project/${projectLink}/`"
    target="_blank"
  >
    {{ projectLink }}
  </n-button>
  <br />
  <n-button
    color="#959595"
    size="tiny"
    text
    tag="a"
    :href="homepage"
    target="_blank"
  >
    <n-icon>
      <Package />
    </n-icon>
    {{ moduleName }}
  </n-button>
</template>
