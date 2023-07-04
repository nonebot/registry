import { createRouter, createWebHistory } from "vue-router";

import Home from "@/router/Home.vue";
import NotFound from "@/router/NotFound.vue";
import PluginPage from "@/router/PluginPage.vue";
import Search from "@/router/Search.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/search",
      component: Search,
    },
    {
      path: "/plugin/:path",
      component: PluginPage,
      props: true,
    },
    {
      path: "/:notFound(.*)*",
      component: NotFound,
    },
  ],
});

export default router;
