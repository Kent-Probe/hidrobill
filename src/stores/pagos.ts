import { defineStore } from "pinia";
import { Payment } from "../models/payments";
import { getPayments } from "../services/payment/get";

export const usePagosStore = defineStore("pagos", {
  state: () => ({ pagos: [] as Payment[], cargando: false }),
  actions: {
    async uploadPayment() {
      this.cargando = true;
      this.pagos = getPayments();
      this.cargando = false;
    },
  },
});
