import { createRouter, createWebHistory } from "vue-router";

import Home from "@/router/Home.vue";
import NotFound from "@/router/NotFound.vue";

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
    {
      path: "/:notFound",
      component: NotFound,
    },
  ],
});

export default router;
