import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/search",
    component: () => import("@/views/Home.vue"),
    props: (route: { query: { q: string } }) => ({ query: route.query.q }),
  },
  {
    path: "/plugin/:path",
    component: () => import("@/views/PluginPage.vue"),
    props: true,
  },
  {
    path: "/:pathMatched(.*)*",
    component: () => import("@/views/NotFound.vue"),
    props: (route: { params: { pathMatched: string } }) => ({
      pathMatched: `/${route.params.pathMatched}`,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
