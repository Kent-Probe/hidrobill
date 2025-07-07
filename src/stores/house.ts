import { defineStore } from "pinia";
import { House } from "../models/houses";
import { getHouses } from "../services/house/get";

export const useHousesStore = defineStore("houses", {
  state: () => ({
    houses: [] as House[],
    cargando: false,
    pageLength: 5,
  }),
  actions: {
    async fetchHouses(limit: number = 5, page: number = 1): Promise<void> {
      this.cargando = true;
      try {
        this.houses = await getHouses(limit, page);
        if (this.houses.length < limit) {
          this.pageLength = page; // Si hay menos casas de las esperadas, no hay más páginas
        } else {
          this.pageLength = page + 1; // Si hay suficientes casas, incrementamos la página
        }
      } catch (error) {
        console.error("Error al cargar las casas:", error);
        this.houses = []; // En caso de error, asegúrate de que sea un array vacío
      } finally {
        this.cargando = false;
      }
    },
  },
});
