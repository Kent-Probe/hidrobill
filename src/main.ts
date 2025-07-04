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

createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
