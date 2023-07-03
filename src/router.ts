import { createRouter, createWebHistory } from "vue-router";

import Main from "@/router/Main.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Main,
    },
    {
      path: "/search",
      component: Main,
    },
  ],
});

export default router;
