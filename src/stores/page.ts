import { ref } from "vue";

import type { GlobalTheme } from "naive-ui";
import { lightTheme } from "naive-ui";
import { defineStore } from "pinia";

import { Results } from "@/types/results";

export const usePageStore = defineStore("page", () => {
  const theme = ref(lightTheme as GlobalTheme);
  const results = ref({} as Results);
  function initResults() {
    fetch("/results.json", { method: "GET" })
      .then((response) => response.json())
      .then((data: Results) => (results.value = data))
      .catch(console.error);
  }
  function setTheme(toTheme: GlobalTheme) {
    theme.value = toTheme;
  }

  return { theme, results, initResults, setTheme };
});
