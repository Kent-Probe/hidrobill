import { relaunch } from "@tauri-apps/plugin-process";
import { check } from "@tauri-apps/plugin-updater";
import { ref } from "vue";

export const useUpdater = () => {
  const isChecking = ref(false);
  const isDownloading = ref(false);
  const updateAvailable = ref(false);
  const currentVersion = ref("");
  const latestVersion = ref("");

  const checkForUpdates = async () => {
    try {
      isChecking.value = true;
      console.log("Verificando actualizaciones...");

      const update = await check();

      if (update) {
        updateAvailable.value = true;
        latestVersion.value = update.version;
        console.log(`Nueva versión disponible: ${update.version}`);
        return update;
      } else {
        console.log("No hay actualizaciones disponibles");
        return null;
      }
    } catch (error) {
      console.error("Error al verificar actualizaciones:", error);
      return null;
    } finally {
      isChecking.value = false;
    }
  };

  const downloadAndInstall = async (update: any) => {
    try {
      isDownloading.value = true;
      console.log("Descargando actualización...");

      await update.downloadAndInstall();

      console.log("Actualización instalada, reiniciando...");
      await relaunch();
    } catch (error) {
      console.error("Error al descargar/instalar actualización:", error);
      throw error;
    } finally {
      isDownloading.value = false;
    }
  };

  return {
    isChecking,
    isDownloading,
    updateAvailable,
    currentVersion,
    latestVersion,
    checkForUpdates,
    downloadAndInstall,
  };
};
