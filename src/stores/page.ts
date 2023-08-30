import { ref } from "vue";

import { useDark, useToggle } from "@vueuse/core";
import { darkTheme, type GlobalTheme } from "naive-ui";
import { defineStore } from "pinia";

import type { Plugins, PluginsResponse } from "@/types/plugins";
import type { Results } from "@/types/results";

export const usePageStore = defineStore("page", () => {
  const theme = ref<GlobalTheme | null>(null);
  const isDark = useDark({
    onChanged: function (dark: boolean) {
      theme.value = dark ? darkTheme : null;
      const el = document.querySelector("html");
      if (el && el.dataset) {
        el.dataset.hljsUseDark = dark ? "true" : "false";
      }
    },
  });
  const toggleDark = useToggle(isDark);
  const plugins = ref<Plugins>({});
  const results = ref<Results>({});
  const loading = ref(true);

  const initData = async () => {
    const pluginsData: PluginsResponse = await (
      await fetch("/plugins.json", { method: "GET" })
    ).json();
    results.value = await (
      await fetch("/results.json", { method: "GET" })
    ).json();
    plugins.value = pluginsData.reduce(
      (acc: Plugins, plugin: Plugins[keyof Plugins]) => {
        acc[`${plugin.project_link}:${plugin.module_name}`] = plugin;
        return acc;
      },
      {},
    );
    loading.value = false;
  };

  const filterPlugins = (keyword: string) => {
    return Object.entries(plugins.value).reduce(
      (acc: Plugins, [key, value]) => {
        if (
          key.toLowerCase().includes(keyword.toLowerCase()) ||
          value.author.toLowerCase().includes(keyword.toLowerCase())
        ) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
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
