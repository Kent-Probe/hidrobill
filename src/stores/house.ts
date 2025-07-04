import { defineStore } from "pinia";
import { House } from "../models/houses";
import { getHouses } from "../services/house/get";

export const useHousesStore = defineStore("houses", {
  state: () => ({
    houses: [] as House[],
    cargando: false,
  }),
  actions: {
    async fetchHouses() {
      this.cargando = true;
      try {
        this.houses = await getHouses();
      } catch (error) {
        console.error("Error al cargar las casas:", error);
        this.houses = []; // En caso de error, asegúrate de que sea un array vacío
      } finally {
        this.cargando = false;
      }
    },
  },
});
