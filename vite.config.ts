import path from "path";

import transformerDirectives from "@unocss/transformer-directives";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      transformers: [transformerDirectives()],
    }),
    visualizer({ sourcemap: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/results.json": {
        target:
          "https://ghproxy.com/https://raw.githubusercontent.com/nonebot/registry/results/",
        changeOrigin: true,
      },
      "/plugins.json": {
        target:
          "https://ghproxy.com/https://raw.githubusercontent.com/nonebot/registry/results/",
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: true,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("naive-ui")) return "naive-ui";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
