import { defineStore } from "pinia";
import { Client } from "../models/clients";
import { getClients } from "../services/clients/get";

export const useClientsStore = defineStore("clients", {
  state: () => ({ clients: [] as Client[], cargando: false }),
  actions: {
    async fetchClients() {
      this.cargando = true;
      try {
        this.clients = await getClients();
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
        this.clients = []; // En caso de error, asegúrate de que sea un array vacío
      } finally {
        this.cargando = false;
      }
    },
  },
});
