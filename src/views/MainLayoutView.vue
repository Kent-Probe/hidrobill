<script setup lang="ts">
import { mdiAccountGroup, mdiAccountStar, mdiCashClock, mdiHomeAccount, mdiLogout, mdiMagnify } from "@mdi/js";
import { storeToRefs } from "pinia";
import { cookieStorage } from "../plugins/cookieAdapter";
import router from "../routes";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const { getUser } = storeToRefs(authStore);
const { logout } = authStore;

const logoutUser = () => {
  logout();
  cookieStorage.removeItem("auth");
  router.push({ name: "Login" });
};
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item :prepend-icon="mdiAccountStar" :subtitle="getUser.username" :title="getUser.name"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item :prepend-icon="mdiAccountGroup" title="Clientes" :to="{ name: 'Clients' }"></v-list-item>
          <v-list-item :prepend-icon="mdiHomeAccount" title="Casas" :to="{ name: 'Houses' }"></v-list-item>
          <v-list-item :prepend-icon="mdiCashClock" title="Pagos" :to="{ name: 'Payments' }"></v-list-item>
          <v-list-item :prepend-icon="mdiAccountStar" title="Usuarios" :to="{ name: 'Users' }"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item :prepend-icon="mdiLogout" title="Cerrar Sesión" @click="logoutUser"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 100vh">
        <v-app-bar :elevation="3">
          <v-app-bar-title :text="$route.meta.name" />

          <template v-slot:append>
            <v-btn :icon="mdiMagnify"></v-btn>
          </template>
        </v-app-bar>
        <v-container style="overflow: auto !important; height: calc(100vh - 64px)">
          <RouterView v-slot="{ Component, route }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" :key="route.path" />
            </Transition>
          </RouterView>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<style scoped>
/* FADE TRANSITION */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
