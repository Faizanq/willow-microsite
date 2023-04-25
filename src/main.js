import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import GlobalLayout from "@/layout/layout.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)


app.component("GlobalLayout", GlobalLayout);

app.use(pinia);

app.mount("#app");
