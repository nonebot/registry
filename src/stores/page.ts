import { ref } from "vue";

import { useDark, useToggle } from "@vueuse/core";
import { darkTheme, type GlobalTheme } from "naive-ui";
import { defineStore } from "pinia";

import { Plugins } from "@/types/plugins";
import { Results } from "@/types/results";

export const usePageStore = defineStore("page", () => {
  const theme = ref(null as GlobalTheme | null);
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
  theme.value = (isDark.value ? darkTheme : null) as GlobalTheme | null;

  const plugins = ref<Plugins>({});
  const results = ref<Results>({});

  const initData = () => {
    fetch("/plugins.json", { method: "GET" })
      .then((response) => response.json())
      .then((data: Plugins[keyof Plugins][]) => {
        data.forEach((plugin) => {
          plugins.value[`${plugin.project_link}:${plugin.module_name}`] =
            plugin;
        });
      })
      .catch(console.error);

    fetch("/results.json", { method: "GET" })
      .then((response) => response.json())
      .then((data: Results) => (results.value = data))
      .catch(console.error);
  };

  const filterPlugins = (keyword: string) => {
    return Object.entries(plugins.value).reduce((acc, [key, value]) => {
      if (
        key.toLowerCase().includes(keyword.toLowerCase()) ||
        value.author.toLowerCase().includes(keyword.toLowerCase())
      ) {
        acc[key] = value;
      }
      return acc;
    }, {} as Plugins);
  };

  return {
    theme,
    plugins,
    results,
    initData,
    toggleDark,
    filterPlugins,
  };
});
