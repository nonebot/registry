import { ref } from "vue";

import { useDark, useToggle } from "@vueuse/core";
import { darkTheme, type GlobalTheme } from "naive-ui";
import { defineStore } from "pinia";

import type { Plugins } from "@/types/plugins";
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

  const initData = () => {
    Promise.all([
      fetch("/plugins.json", { method: "GET" })
        .then((response) => response.json())
        .then((data: Plugins[keyof Plugins][]) => {
          data.forEach((plugin) => {
            plugins.value[`${plugin.project_link}:${plugin.module_name}`] =
              plugin;
          });
        })
        .catch(console.error),
      fetch("/results.json", { method: "GET" })
        .then((response) => response.json())
        .then((data: Results) => (results.value = data))
        .catch(console.error),
    ]).then(() => {
      loading.value = false;
    });
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
