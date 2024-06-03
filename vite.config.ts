import path from "node:path";

import { sentryVitePlugin } from "@sentry/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    visualizer({ sourcemap: true }),
    sentryVitePlugin({
      org: "nonebot",
      project: "registry",
      authToken: process.env.SENTRY_AUTH_TOKEN,
      telemetry: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/results.json": {
        target:
          "https://mirror.ghproxy.com/https://raw.githubusercontent.com/nonebot/registry/results/",
        changeOrigin: true,
      },
      "/plugins.json": {
        target:
          "https://mirror.ghproxy.com/https://raw.githubusercontent.com/nonebot/registry/results/",
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
          if (id.includes("sentry")) return "sentry";
          if (id.includes("gsap")) return "gsap";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
