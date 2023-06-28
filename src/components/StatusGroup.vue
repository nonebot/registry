<script setup lang="ts">
import { Results } from "@/types/results";

import Load from "./icons/Load.vue";
import Metadata from "./icons/Metadata.vue";
import Validation from "./icons/Validation.vue";

defineProps<{ rowData: Results[keyof Results] }>();
</script>

<template>
  <Validation :row-data="rowData" />
  <Load :row-data="rowData" />
  <Metadata :row-data="rowData" />
</template>
