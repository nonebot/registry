<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import { NButton, NLayout, NResult } from "naive-ui";

import NotFound from "@/router/NotFound.vue";
import { usePageStore } from "@/stores/page";
import { Plugins } from "@/types/plugins";

const store = usePageStore();

const props = defineProps({
  path: {
    type: String,
    required: true,
    default: "",
  },
});

const [pypi, module] = (() => {
  if (props.path) {
    return props.path.split(":");
  } else {
    return ["", ""];
  }
})();

const plugin = ref<Plugins[keyof Plugins]>({} as Plugins[keyof Plugins]);

onBeforeMount(async () => {
  await store.initDataSync();
  plugin.value = store.getPlugin(pypi, module);
});
</script>

<template>
  <div v-if="pypi && module && plugin">
    <h1>{{ pypi }},{{ module }}</h1>
    <h1>{{ plugin.name }}</h1>
    <h1>{{ plugin.desc }}</h1>
    <h1>{{ plugin }}</h1>
  </div>
  <div v-else-if="pypi && module">
    <n-layout class="m-3">
      <n-result
        status="404"
        title="插件不存在"
        :description="`${pypi}:${module} 不存在`"
      >
        <template #footer>
          <router-link to="/">
            <n-button size="large">返回主页</n-button>
          </router-link>
        </template>
      </n-result>
    </n-layout>
  </div>
  <NotFound v-else></NotFound>
</template>

<style scoped></style>
