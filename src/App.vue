<script setup lang="ts"></script>

<template>
  <RouterView v-slot="{ Component, route }">
    <v-fade-transition :name="route.meta.layout ? '' : 'fade'" mode="out-in">
      <component :is="Component" :key="route.path" />
    </v-fade-transition>
  </RouterView>
</template>

<style>
:root {
  height: 100vh;
  overflow: hidden;
}

body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

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
