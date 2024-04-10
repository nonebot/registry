<script setup lang="ts">
import { computed } from "vue";

import { mdiCheckCircle, mdiRocketLaunch } from "@mdi/js";
import {
  NA,
  NAlert,
  NButton,
  NCard,
  NH3,
  NLayout,
  NP,
  NPageHeader,
  NResult,
  NSkeleton,
  NTag,
  NText,
} from "naive-ui";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import Icon from "@/components/Icon.vue";
import Author from "@/components/result-table/Author.vue";
import Load from "@/components/result-table/Load.vue";
import Metadata from "@/components/result-table/Metadata.vue";
import Validation from "@/components/result-table/Validation.vue";
import { usePageStore } from "@/stores/page";
import { pickTextColor } from "@/utils/color";
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
</script>

<template>
  <n-skeleton v-if="loading" class="min-h-screen" width="100%" />
  <div v-else-if="pypi && module && plugin && result">
    <n-page-header @back="router.back()">
      <template #title>
        <h2 class="inline-flex items-center align-middle">
          {{ plugin.name }}
          <Icon
            v-if="plugin.is_official"
            :size="24"
            class="text-green-600 ml-2"
            :path="mdiCheckCircle"
          />
        </h2>
      </template>
    </n-page-header>
    <div class="flex flex-col-reverse xl:flex-row">
      <div class="flex-initial min-w-0 xl:max-w-3/4 xl:pr-32">
        <n-p>
          <n-h3>验证结果</n-h3>
          <Validation
            v-if="result.outputs.validation"
            :validation="result.outputs.validation"
            :plugin="plugin"
          />
          <n-alert
            v-else-if="plugin.skip_test"
            title="验证通过"
            type="info"
            class="w-[220px]"
          >
            <template #icon>
              <Icon :path="mdiRocketLaunch" />
            </template>
            <n-text>该插件经人工跳过了测试</n-text>
          </n-alert>
          <n-alert v-else title="验证通过" type="success" class="w-[140px]">
            <template #icon>
              <Icon :path="mdiRocketLaunch" />
            </template>
          </n-alert>
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
      <div class="pb-4 min-w-1/4">
        <n-h3>插件信息</n-h3>
        <n-p> 作者：<Author :author="plugin.author" /> </n-p>
        <n-p> 版本：{{ plugin.version }} </n-p>
        <n-p> 描述：{{ plugin.desc }} </n-p>
        <n-p>
          标签：<n-tag
            v-for="(tag, index) in plugin.tags"
            :key="index"
            class="mr-1 mb-1"
            :bordered="false"
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
          <n-a
            class="text-inherit hover:color-[#ea5252] no-underline"
            :href="`https://pypi.org/project/${plugin.project_link}/`"
            target="_blank"
          >
            {{ plugin.project_link }}
          </n-a>
        </n-p>
        <n-p
          >主页：
          <n-a
            class="text-inherit hover:color-[#ea5252] no-underline"
            :href="plugin.homepage"
            target="_blank"
          >
            {{ plugin.module_name }}
          </n-a>
        </n-p>
        <n-p
          >适配器支持：
          <n-tag
            v-for="(adapter, index) in plugin.supported_adapters || [
              '所有/未标记',
            ]"
            :key="index"
            class="mr-1 mb-1"
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
