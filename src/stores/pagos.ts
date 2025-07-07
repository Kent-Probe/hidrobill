import { defineStore } from "pinia";
import { Payment } from "../models/payments";
import { getPayments } from "../services/payment/get";

export const usePaymetsStore = defineStore("pagos", {
  state: () => ({ pagos: [] as Payment[], pageLength: 5, cargando: false }),
  actions: {
    async fetchPayments(limit: number = 5, page: number = 1): Promise<void> {
      this.cargando = true;
      try {
        this.pagos = await getPayments(limit, page);
        if (this.pagos.length < limit) {
          this.pageLength = page; // Si hay menos pagos de los esperados, no hay más páginas
        } else {
          this.pageLength = page + 1; // Si hay suficientes pagos, incrementamos la página
        }
      } catch (error) {
        console.error("Error al cargar los pagos:", error);
        this.pagos = []; // En caso de error, asegúrate de que sea un array vacío
      } finally {
        this.cargando = false;
      }
    },
  },
});
