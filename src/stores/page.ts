import { ref } from "vue";

import { useDark, useToggle } from "@vueuse/core";
import { darkTheme, type GlobalTheme } from "naive-ui";
import { defineStore } from "pinia";

import { Results } from "@/types/results";

export const usePageStore = defineStore("page", () => {
  const theme = ref(null as GlobalTheme | null);
  const isDark = useDark({
    onChanged(dark: boolean) {
      theme.value = dark ? darkTheme : null;
    },
  });
  const toggleDark = useToggle(isDark);
  theme.value = (isDark.value ? darkTheme : null) as GlobalTheme | null;

  const results = ref({} as Results);
  function initResults() {
    fetch("/results.json", { method: "GET" })
      .then((response) => response.json())
      .then((data: Results) => (results.value = data))
      .catch(console.error);
  }

  function filterResults(keyword: string) {
    return Object.entries(results.value).reduce((acc, [key, value]) => {
      if (
        key.toLowerCase().includes(keyword.toLowerCase()) ||
        value.plugin.old.author.toLowerCase().includes(keyword.toLowerCase())
      ) {
        acc[key] = value;
      }
      return acc;
    }, {} as Results);
  }

  return { theme, results, initResults, toggleDark, filterResults };
});
