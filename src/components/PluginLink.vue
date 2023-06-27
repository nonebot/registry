<script setup lang="ts">
defineProps<{ moduleName: string; projectLink: string }>();
</script>

<template>
  <a
    target="_blank"
    :href="`https://pypi.org/project/${projectLink}/`"
    class="text-inherit no-underline"
    >{{ projectLink }}</a
  >
  <span> / </span>
  <a
    target="_blank"
    :href="`https://pypi.org/project/${moduleName}/`"
    class="text-inherit no-underline"
  >
    {{ moduleName }}</a
  >
</template>
