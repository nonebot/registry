import { ref } from "vue";

import { useDark, useToggle } from "@vueuse/core";
import { darkTheme, type GlobalTheme } from "naive-ui";
import { defineStore } from "pinia";

import { Results } from "@/types/results";

export const usePageStore = defineStore("page", () => {
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
  const theme = ref((isDark.value ? darkTheme : null) as GlobalTheme | null);

  const results = ref({} as Results);
  function initResults() {
    fetch("/results.json", { method: "GET" })
      .then((response) => response.json())
      .then((data: Results) => (results.value = data))
      .catch(console.error);
  }

  function setTheme(toTheme: GlobalTheme | null) {
    theme.value = toTheme;
    toggleDark();
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

  return { theme, results, initResults, setTheme, filterResults };
});
