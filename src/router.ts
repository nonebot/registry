import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import NotFound from "@/views/NotFound.vue";
import PluginPage from "@/views/PluginPage.vue";
import Search from "@/views/Search.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/search",
    component: Search,
    props: (route: { query: { q: string } }) => ({ query: route.query.q }),
  },
  {
    path: "/plugin/:path",
    component: PluginPage,
    props: true,
  },
  {
    path: "/:pathMatched(.*)*",
    component: NotFound,
    props: (route: { params: { pathMatch: string } }) => ({
      query: route.params.pathMatch,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
