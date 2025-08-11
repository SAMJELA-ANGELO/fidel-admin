import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { createHead } from "@vueuse/head";

const head = createHead();
const app = createApp(App).use(store).use(router).use(head);
app.mount("#app");
