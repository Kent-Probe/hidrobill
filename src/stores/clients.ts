import { defineStore } from "pinia";
import { getClients } from "../services/clients/get";

export const useClientsStore = defineStore("clients", {
  state: () => ({ clients: [] as ClientWithInfo[], pageLength: 1, cargando: false }),
  actions: {
    async fetchClients(limit: number = 8, page: number = 1): Promise<void> {
      this.cargando = true;
      try {
        this.clients = await getClients(limit, page);
        if (this.clients.length < limit) {
          this.pageLength = page;
        } else {
          this.pageLength = page + 1;
        }
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
        this.clients = []; // En caso de error, asegúrate de que sea un array vacío
      } finally {
        this.cargando = false;
      }
    },
  },
});
