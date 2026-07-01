import { ref } from "vue";

import { useDark, useToggle } from "@vueuse/core";
import { darkTheme, type GlobalTheme } from "naive-ui";
import { defineStore } from "pinia";

import type { Plugins, PluginsResponse } from "@/types/plugins";
import type { Results } from "@/types/results";

export const usePageStore = defineStore("page", () => {
  const theme = ref<GlobalTheme | null>(null);
  const isDark = useDark({
    onChanged(isDark: boolean) {
      theme.value = isDark ? darkTheme : null;
      const el = document.querySelector("html");
      if (el && el.dataset) {
        el.dataset.hljsUseDark = isDark ? "true" : "false";
      }
    },
  });
  const toggleDark = useToggle(isDark);
  const plugins = ref<Plugins>({});
  const results = ref<Results>({});
  const loading = ref(true);

  const initData = async () => {
    const [pluginsResponse, resultsResponse] = await Promise.all([
      fetch("/plugins.json", { method: "GET" }),
      fetch("/results.json", { method: "GET" }),
    ]);
    const [pluginsData, resultsData] = await Promise.all([
      pluginsResponse.json() as Promise<PluginsResponse>,
      resultsResponse.json() as Promise<Results>,
    ]);

    const nextPlugins: Plugins = {};
    for (const plugin of pluginsData) {
      nextPlugins[`${plugin.project_link}:${plugin.module_name}`] = plugin;
    }

    plugins.value = nextPlugins;
    results.value = resultsData;
    loading.value = false;
  };

  const filterPlugins = (keyword: string) => {
    const kw = keyword.toLowerCase();
    const filteredPlugins: Plugins = {};

    for (const [key, value] of Object.entries(plugins.value)) {
      if (
        key.toLowerCase().includes(kw) ||
        value.author.toLowerCase().includes(kw) ||
        value.desc.toLowerCase().includes(kw) ||
        value.tags.some((tag) => tag.label.toLowerCase().includes(kw))
      ) {
        filteredPlugins[key] = value;
      }
    }

    return filteredPlugins;
  };

  const getPlugin = (pypi: string, module: string) => {
    return plugins.value[`${pypi}:${module}`];
  };

  const getResult = (pypi: string, module: string) => {
    return results.value[`${pypi}:${module}`];
  };

  return {
    theme,
    plugins,
    results,
    loading,
    toggleDark,
    initData,
    filterPlugins,
    getPlugin,
    getResult,
  };
});
