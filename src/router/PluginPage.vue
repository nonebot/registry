<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import {
  NButton,
  NLayout,
  NResult,
  NCard,
  NTag,
  NPageHeader,
  NSkeleton,
} from "naive-ui";
import CheckCircle from "vue-material-design-icons/CheckCircle.vue";
import { useRouter } from "vue-router";

import Author from "@/components/result-table/Author.vue";
import Load from "@/components/result-table/Load.vue";
import Metadata from "@/components/result-table/Metadata.vue";
import NotFound from "@/router/NotFound.vue";
import { usePageStore } from "@/stores/page";
import { Plugins } from "@/types/plugins";
import { Results } from "@/types/results";

const store = usePageStore();
const router = useRouter();

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
const result = ref<Results[keyof Results]>({} as Results[keyof Results]);
const loading = ref(true);

onBeforeMount(async () => {
  await (async () => {
    await store.initDataSync();
    plugin.value = store.getPlugin(pypi, module);
    result.value = store.getResult(pypi, module);
    loading.value = false;
  })().finally(() => {
    loading.value = false;
  });
});

function pickTextColor(bgColor: string): string {
  let color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  let r = parseInt(color.substring(0, 2), 16); // hexToR
  let g = parseInt(color.substring(2, 4), 16); // hexToG
  let b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#fff";
}
</script>

<template>
  <n-skeleton v-if="loading" class="min-h-screen" width="100%" />
  <div v-else-if="pypi && module && plugin && result">
    <n-page-header @back="router.back()">
      <template #title>
        <h1>
          {{ plugin.name }}
          <CheckCircle v-if="plugin.is_official" class="text-green-600" />
        </h1>
      </template>
    </n-page-header>
    <n-card title="基础信息" size="huge" hoverable>
      <n-card
        title="作者："
        :bordered="false"
        size="small"
        hoverable
        class="mb-1"
      >
        <Author :author="plugin.author" />
      </n-card>
      <n-card
        title="描述："
        :bordered="false"
        size="small"
        hoverable
        class="mb-1"
      >
        <n-button text>
          {{ plugin.desc }}
        </n-button>
      </n-card>
      <n-card
        title="标签："
        :bordered="false"
        size="small"
        hoverable
        class="mb-1"
      >
        <n-tag
          v-for="(tag, index) in plugin.tags"
          :key="index"
          class="mr-1"
          :color="{
            color: tag.color,
            textColor: pickTextColor(tag.color),
          }"
        >
          {{ tag.label }}
        </n-tag>
        <n-button v-if="plugin.tags.length === 0" text>无</n-button>
      </n-card>
      <n-card
        title="类型："
        :bordered="false"
        size="small"
        hoverable
        class="mb-1"
      >
        {{ plugin.type || "未标记" }}
      </n-card>
      <n-card
        title="pypi："
        :bordered="false"
        size="small"
        hoverable
        class="mb-1"
      >
        <n-button
          text
          tag="a"
          :href="`https://pypi.org/project/${plugin.project_link}/`"
          target="_blank"
        >
          {{ plugin.project_link }}
        </n-button>
      </n-card>
      <n-card
        title="主页："
        :bordered="false"
        size="small"
        hoverable
        class="mb-1"
      >
        <n-button text tag="a" :href="plugin.homepage" target="_blank">
          {{ plugin.module_name }}
        </n-button>
      </n-card>
      <n-card
        title="适配器支持："
        :bordered="false"
        size="small"
        hoverable
        class="mb-1"
      >
        <n-tag
          v-for="(adapter, index) in plugin.supported_adapters || [
            '所有/未标记',
          ]"
          :key="index"
          class="mr-1"
          type="success"
        >
          {{ adapter.replace("nonebot.adapters.", "") }}
        </n-tag>
      </n-card>
      <n-card
        title="验证时间："
        :bordered="false"
        size="small"
        hoverable
        class="mb-1"
      >
        {{ new Date(plugin.time).toLocaleString() }}
      </n-card>
    </n-card>
    <n-card title="验证结果" size="huge" hoverable>
      <pre class="max-h-[50vh] overflow-auto">{{
        result.outputs.validation
      }}</pre>
    </n-card>
    <n-card title="元数据" size="huge" hoverable>
      <Metadata :result="result" />
    </n-card>
    <n-card title="加载结果" size="huge" hoverable>
      <Load :result="result" />
    </n-card>
  </div>
  <div v-else-if="pypi && module">
    <n-layout class="m-3">
      <n-card>
        <n-result
          status="404"
          title="数据未加载/插件不存在"
          :description="`${pypi}:${module} 不存在`"
        >
          <template #footer>
            <router-link to="/">
              <n-button size="large">返回主页</n-button>
            </router-link>
          </template>
        </n-result>
      </n-card>
    </n-layout>
  </div>
  <NotFound v-else></NotFound>
</template>

<style scoped></style>
