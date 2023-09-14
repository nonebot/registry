import { createApp } from "vue";

import * as Sentry from "@sentry/vue";
import { createPinia } from "pinia";

import "virtual:uno.css";
import App from "./App.vue";
import router from "./router";
import "./scss/style.scss";

const pinia = createPinia();
const app = createApp(App);

if (import.meta.env.MODE == "production" && import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    app,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      // eslint-disable-next-line import/namespace
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      // eslint-disable-next-line import/namespace
      new Sentry.Replay(),
    ],

    // capture 50% of transactions for performance monitoring.
    tracesSampleRate: 0.5,

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    // /^\// means requests whose URL starts with a '/' (for example GET /api/v1/users).
    tracePropagationTargets: ["nonebot.dev", /^\//],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    /// / START: those errors are found at https://docs.sentry.io/platforms/javascript/#decluttering-sentry
    ignoreErrors: [
      // Random plugins/extensions
      "top.GLOBALS",
      // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
      "originalCreateNotification",
      "canvas.contentDocument",
      "MyApp_RemoveAllHighlights",
      "http://tt.epicplay.com",
      "Can't find variable: ZiteReader",
      "jigsaw is not defined",
      "ComboSearch is not defined",
      "http://loading.retry.widdit.com/",
      "atomicFindClose",
      // Facebook borked
      "fb_xd_fragment",
      // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
      // reduce this. (thanks @acdha)
      // See http://stackoverflow.com/questions/4113268
      "bmi_SafeAddOnload",
      "EBCallBackMessageReceived",
      // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
      "conduitPage",
      /// / END
    ],

    /// / START: those urls are found at https://docs.sentry.io/platforms/javascript/#decluttering-sentry
    denyUrls: [
      // Facebook flakiness
      /graph\.facebook\.com/i,
      // Facebook blocked
      /connect\.facebook\.net\/en_US\/all\.js/i,
      // Woopra flakiness
      /eatdifferent\.com\.woopra-ns\.com/i,
      /static\.woopra\.com\/js\/woopra\.js/i,
      // Chrome extensions
      /extensions\//i,
      /^chrome:\/\//i,
      /^chrome-extension:\/\//i,
      // Other plugins
      /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
      /webappstoolbarba\.texthelp\.com\//i,
      /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
      /// / END
    ],
  });
}

app.use(router);
app.use(pinia);
app.mount("#app");
