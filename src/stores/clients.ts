import { defineStore } from "pinia";
import { getClients } from "../services/clients/get";
import {
  activatedClient,
  createClient,
  createClientWithContracts,
  deactivateClient,
  updateClient,
} from "../services/clients/post";

export const useClientsStore = defineStore("clients", {
  state: () => ({ clients: [] as ClientWithInfo[], pageLength: 1, cargando: false }),
  actions: {
    async fetchClients(limit: number = 8, page: number = 1, search: string): Promise<void> {
      this.cargando = true;
      try {
        this.clients = await getClients(limit, page, search);
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

    async createClient(
      client: Omit<Client, "id" | "created_at" | "updated_at">
    ): Promise<{ success: boolean; message: string }> {
      this.cargando = true;
      try {
        const result = await createClient(client);
        if (result.success) {
          await this.fetchClients(); // Refresh the clients list
        }
        return result;
      } finally {
        this.cargando = false;
      }
    },

    async createClientWithContracts(
      clientWithInfo: Omit<ClientWithInfo, "id" | "created_at" | "updated_at">
    ): Promise<{ success: boolean; message: string }> {
      this.cargando = true;
      try {
        const result = await createClientWithContracts(clientWithInfo);
        return result;
      } finally {
        this.cargando = false;
      }
    },

    async updateClient(client: Client): Promise<{ success: boolean; message: string }> {
      this.cargando = true;
      try {
        const result = await updateClient(client);
        return result;
      } finally {
        this.cargando = false;
      }
    },

    async alterStateClient(
      clientId: string,
      activated: boolean = false
    ): Promise<{ success: boolean; message: string }> {
      this.cargando = true;
      try {
        let result = { success: false, message: "No se pudo iniciarlar los datos para el envio." };
        if (activated) {
          result = await deactivateClient(clientId);
        } else {
          result = await activatedClient(clientId);
        }
        if (result.success) {
          await this.fetchClients(); // Refresh the clients list
        }
        return result;
      } finally {
        this.cargando = false;
      }
    },
  },
});
