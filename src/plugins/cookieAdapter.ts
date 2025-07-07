import Cookies from "js-cookie";
import { PersistedState } from "pinia-plugin-persistedstate";

// Este objeto implementa la interfaz que pinia-plugin-persistedstate espera.
export const cookieStorage: PersistedState["storage"] = {
  /**
   * Lee un valor de la cookie.
   * @param key La clave (nombre) de la cookie.
   * @returns El valor del estado o null si no se encuentra.
   */
  getItem: (key: string): string | null => {
    return Cookies.get(key) || null;
  },

  /**
   * Escribe un valor en la cookie.
   * @param key La clave (nombre) de la cookie.
   * @param value El estado (convertido a string) a guardar.
   */
  setItem: (key: string, value: string): void => {
    // Guarda la cookie por 7 días. Puedes ajustar esto.
    Cookies.set(key, value, { expires: 7, sameSite: "strict" });
  },

  /**
   * Elimina una cookie.
   * @param key La clave (nombre) de la cookie a eliminar.
   */
  removeItem: (key: string): void => {
    Cookies.remove(key);
  },
};
