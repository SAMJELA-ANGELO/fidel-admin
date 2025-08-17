import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Vuetify setup
const app = createApp(App).use(store).use(router);

// The SEO management is now handled by the useSeo composable in App.vue
// This provides better performance and more comprehensive SEO features

app.mount("#app");
