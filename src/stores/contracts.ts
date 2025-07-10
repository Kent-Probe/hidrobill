import { defineStore } from "pinia";
import { Contract } from "../models/contract";
import { createContracts, deleteContract } from "../services/contracts/post";

export const useContractsStore = defineStore("contracts", {
  state: () => ({
    contracts: [] as Contract[],
    pageLength: 1,
    loading: false,
    constract: {} as Contract,
    results: {
      success: false,
      message: "Sin asignación",
    },
  }),
  actions: {
    async createContracts(contracts: Contract[]): Promise<{ success: boolean; message: string }> {
      this.loading = true;
      try {
        const result = await createContracts(contracts);
        this.results = {
          success: result.success,
          message: result.message,
        };
        return result;
      } catch (error) {
        const result = {
          success: false,
          message: error instanceof Error ? error.message : "Error desconocido",
        };
        this.results = result;
        return result;
      } finally {
        this.loading = false;
      }
    },
    async deleteContract(id: string): Promise<{ success: boolean; message: string }> {
      this.loading = true;
      try {
        const result = await deleteContract(id);
        this.results = {
          success: result.success,
          message: result.message,
        };
        return result;
      } catch (error) {
        const result = {
          success: false,
          message: error instanceof Error ? error.message : "Error desconocido",
        };
        this.results = result;
        return result;
      } finally {
        this.loading = false;
      }
    },
  },
});
