import { createApp } from "vue";

import { createPinia } from "pinia";

import "highlight.js";

import App from "./App.vue";
import router from "./router";
import "./scss/style.scss";
import "virtual:uno.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
