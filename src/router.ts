import { createRouter, createWebHistory } from "vue-router";

import Home from "@/router/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/search",
      component: Home,
    },
  ],
});

export default router;
