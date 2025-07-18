<script setup lang="ts">
import { onMounted } from "vue";
import { useUpdater } from "./services/update/useUpdater";

const { checkForUpdates, downloadAndInstall, isChecking, isDownloading } = useUpdater();

onMounted(async () => {
  // Verificar actualizaciones automáticamente al abrir la app
  console.log("Verificando actualizaciones al iniciar...");

  const update = await checkForUpdates();

  if (update) {
    // Mostrar diálogo al usuario
    const userConfirmed = confirm(
      `¡Nueva versión ${update.version} disponible!\n\n¿Desea descargar e instalar la actualización ahora?`
    );

    if (userConfirmed) {
      await downloadAndInstall(update);
    }
  }
});
</script>
<template>
  <div>
    <!-- Mostrar indicador de carga si está verificando -->
    <div v-if="isChecking" class="update-status">Verificando actualizaciones...</div>

    <!-- Mostrar indicador de descarga -->
    <div v-if="isDownloading" class="update-status">Descargando actualización... Por favor espere.</div>

    <RouterView v-slot="{ Component, route }">
      <v-fade-transition :name="route.meta.layout ? '' : 'fade'" mode="out-in">
        <component :is="Component" :key="route.path" />
      </v-fade-transition>
    </RouterView>
  </div>
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

<style scoped>
.update-status {
  position: fixed;
  top: 10px;
  right: 10px;
  background: #2196f3;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  z-index: 1000;
}
</style>
