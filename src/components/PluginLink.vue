<script setup lang="ts">
import { NButton, NIcon } from "naive-ui";
import Package from "vue-material-design-icons/Package.vue";

defineProps<{
  author: string;
  moduleName: string;
  projectLink: string;
  homepage: string;
}>();
</script>

<template>
  <n-button text tag="a" :herf="`https://pypi.org/project/${projectLink}/`">
    {{ projectLink }}
  </n-button>
  <br />
  <n-button color="#959595" size="tiny" text tag="a" :href="homepage">
    <n-icon>
      <Package />
    </n-icon>
    {{ moduleName }}
  </n-button>
</template>
