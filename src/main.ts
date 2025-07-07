import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";

/* PINIA */
import { createPinia } from "pinia";
const pinia = createPinia();

/* VUETIFY */
import "vuetify/styles";
import vuetify from "./plugins/vuetify";

/* ROUTER */
import router from "./routes";

import App from "./App.vue";

pinia.use(piniaPluginPersistedstate);

createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
