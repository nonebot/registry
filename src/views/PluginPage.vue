<script setup lang="ts">
import { computed } from "vue";

import {
  NButton,
  NCard,
  NH3,
  NLayout,
  NP,
  NPageHeader,
  NResult,
  NSkeleton,
  NTabPane,
  NTabs,
  NTag,
} from "naive-ui";
import { storeToRefs } from "pinia";
import CheckCircle from "vue-material-design-icons/CheckCircle.vue";
import { useRouter } from "vue-router";

import Author from "@/components/result-table/Author.vue";
import Load from "@/components/result-table/Load.vue";
import Metadata from "@/components/result-table/Metadata.vue";
import { usePageStore } from "@/stores/page";
import NotFound from "@/views/NotFound.vue";

const props = defineProps<{ path: string }>();

const router = useRouter();
const store = usePageStore();
const { loading } = storeToRefs(store);

const [pypi, module] = props.path
  ? props.path.split(":")
  : new Array<string>(2).fill("");

const plugin = computed(() => !loading.value && store.getPlugin(pypi, module));
const result = computed(() => !loading.value && store.getResult(pypi, module));

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
        <h2>
          {{ plugin.name }}
          <CheckCircle v-if="plugin.is_official" class="text-green-600" />
        </h2>
      </template>
    </n-page-header>
    <n-tabs animated>
      <n-tab-pane name="overview" tab="总览">
        <div class="flex flex-col-reverse xl:flex-row">
          <div>
            <n-p>
              <n-h3>验证结果</n-h3>
              <pre class="max-h-[50vh] overflow-auto">{{
                result.outputs.validation
              }}</pre>
            </n-p>
            <n-p>
              <n-h3>元数据</n-h3>
              <Metadata :result="result" />
            </n-p>
            <n-p
              ><n-h3>加载结果</n-h3>
              <Load :result="result" />
            </n-p>
          </div>
          <div class="xl:pl-5 pb-5">
            <n-h3>其他信息</n-h3>
            <n-p> 作者：<Author :author="plugin.author" /> </n-p>
            <n-p> 描述：{{ plugin.desc }} </n-p>
            <n-p>
              标签：<n-tag
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
            </n-p>
            <n-p> 类型：{{ plugin.type || "未标记" }} </n-p>
            <n-p
              >pypi：
              <n-button
                text
                tag="a"
                :href="`https://pypi.org/project/${plugin.project_link}/`"
                target="_blank"
              >
                {{ plugin.project_link }}
              </n-button>
            </n-p>
            <n-p
              >主页：
              <n-button text tag="a" :href="plugin.homepage" target="_blank">
                {{ plugin.module_name }}
              </n-button>
            </n-p>
            <n-p
              >适配器支持：
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
            </n-p>
            <n-p
              >验证时间：
              {{ new Date(plugin.time).toLocaleString() }}
            </n-p>
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
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
