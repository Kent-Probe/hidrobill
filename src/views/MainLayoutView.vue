<script setup lang="ts">
import { mdiAccountGroup, mdiAccountStar, mdiCashClock, mdiHomeAccount, mdiMagnify } from "@mdi/js";
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item :prepend-icon="mdiAccountStar" subtitle="sandra_a88@gmailcom" title="Sandra Adams"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item :prepend-icon="mdiAccountGroup" title="Clientes" :to="{ name: 'Clients' }"></v-list-item>
          <v-list-item :prepend-icon="mdiHomeAccount" title="Casas" :to="{ name: 'Houses' }"></v-list-item>
          <v-list-item :prepend-icon="mdiCashClock" title="Pagos" :to="{ name: 'Payments' }"></v-list-item>
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
