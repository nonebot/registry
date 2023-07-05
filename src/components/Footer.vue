<script setup lang="ts">
import { NLayoutFooter, NText } from "naive-ui";
</script>

<template>
  <n-layout-footer bordered class="p-4 mt-16">
    <div class="flex justify-center lg:max-w-[90rem] max-w-3xl mx-auto">
      <n-text>
        Copyright &copy; {{ new Date().getFullYear() }} NoneBot. All rights
        reserved.
      </n-text>
    </div>
  </n-layout-footer>
</template>

<style scoped></style>
