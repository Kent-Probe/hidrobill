import { defineStore } from "pinia";
import { House } from "../models/houses";
import { getHouses, searchHouses } from "../services/house/get";
import { updateHouse } from "../services/house/post";

export const useHousesStore = defineStore("houses", {
  state: () => ({
    houses: [] as House[],
    cargando: false,
    pageLength: 5,
    housesLimities: [] as House[], // Para almacenar las casas limitadas
    result: {
      success: false,
      message: "",
    },
  }),
  actions: {
    async fetchHouses(limit: number = 5, page: number = 1, search: string = ""): Promise<void> {
      this.cargando = true;
      try {
        this.houses = await getHouses(limit, page, search);
        if (this.houses.length < limit) {
          this.pageLength = page;
        } else {
          this.pageLength = page + 1;
        }
      } catch (error) {
        console.error("Error al cargar las casas:", error);
        this.houses = [];
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
        this.housesLimities = [];
      } finally {
        this.cargando = false;
      }
    },
    async updateHouse(house: House): Promise<{ success: boolean; message: string }> {
      this.cargando = true;
      try {
        const { id, ...cleanHouse } = house;
        const result = await updateHouse(id, cleanHouse);
        this.result = {
          success: result.success,
          message: result.message,
        };
        return { success: result.success, message: result.message };
      } catch (error) {
        const result = {
          success: false,
          message: error instanceof Error ? error.message : "Error desconocido",
        };
        this.result = result;
        return result;
      } finally {
        this.cargando = false;
      }
    },
  },
});
