import { defineStore } from "pinia";
import { House } from "../models/houses";
import { getHouses, searchHouses } from "../services/house/get";

export const useHousesStore = defineStore("houses", {
  state: () => ({
    houses: [] as House[],
    cargando: false,
    pageLength: 5,
    housesLimities: [] as House[], // Para almacenar las casas limitadas
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
    async searchHouses(search: string, hasFirstValue: boolean = true): Promise<void> {
      const firstValue = { header: true, id: "Selecciona o crea una casa" };
      this.cargando = true;
      try {
        this.housesLimities = await searchHouses(search);
        if (hasFirstValue) {
          this.housesLimities.unshift(firstValue);
        }
      } catch (error) {
        console.error("Error al buscar casas:", error);
        this.housesLimities = []; // En caso de error, asegúrate de que sea un array vacío
      } finally {
        this.cargando = false;
      }
    },
  },
});
