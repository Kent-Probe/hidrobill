import { defineStore } from "pinia";
import { Payment, PaymentWithDetails } from "../models/payments";
import { getPayments, getPaymentWithDetails } from "../services/payment/get";
import { createPayment, updatePaymentStatus } from "../services/payment/post";

export const usePaymetsStore = defineStore("pagos", {
  state: () => ({
    pagos: [] as Payment[],
    pago: null as PaymentWithDetails | null,
    pageLength: 5,
    cargando: false,
    result: { success: false, message: "", id_payment: "" },
  }),
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
    async createPayment(
      payment: Omit<Payment, "id" | "created_at" | "updated_at">
    ): Promise<{ success: boolean; message: string; id_payment: string }> {
      this.cargando = true;
      try {
        const resultPayment = await createPayment(payment);
        this.result = {
          success: resultPayment.success,
          message: resultPayment.message,
          id_payment: resultPayment.id_payment || "",
        };
        return resultPayment;
      } catch (error) {
        const result = {
          success: false,
          message: error instanceof Error ? error.message : "Error desconocido",
          id_payment: "",
        };
        this.result = result;
        return result;
      } finally {
        this.cargando = false;
      }
    },
    async fetchPaymentWithDetails(paymentId: string): Promise<boolean> {
      this.cargando = true;
      this.pago = null;
      try {
        const paymentDetails = await getPaymentWithDetails(paymentId);
        if (paymentDetails) {
          this.pago = paymentDetails;
          this.result = {
            success: true,
            message: "Detalles del pago cargados exitosamente",
            id_payment: paymentDetails.payment.id,
          };
          return true;
        } else {
          this.pago = {} as PaymentWithDetails; // Aseguramos que sea un objeto vacío si no se encuentra el pago
          this.result = {
            success: false,
            message: "No se encontró el pago con el ID proporcionado",
            id_payment: "",
          };
          throw new Error("No se encontró el pago con el ID proporcionado");
        }
      } catch (error) {
        console.error("Error al cargar los detalles del pago:", error);
        this.pago = {} as PaymentWithDetails; // En caso de error, aseguramos que sea un objeto vacío
        this.result = {
          success: false,
          message: error instanceof Error ? error.message : "Error desconocido",
          id_payment: "",
        };
        return false;
      } finally {
        this.cargando = false;
      }
    },
    async updatePaymentStatus(
      paymentId: string,
      status: "PAGADO" | "PENDIENTE" | "ANULADO"
    ): Promise<{ success: boolean; message: string }> {
      this.cargando = true;
      try {
        const result = await updatePaymentStatus(paymentId, status);
        this.result = {
          success: result.success,
          message: result.message,
          id_payment: paymentId,
        };
        return result;
      } catch (error) {
        console.error("Error al actualizar el estado del pago:", error);
        this.result = {
          success: false,
          message: error instanceof Error ? error.message : "Error desconocido",
          id_payment: paymentId,
        };
        return {
          success: false,
          message: error instanceof Error ? error.message : "Error desconocido",
        };
      } finally {
        this.cargando = false;
      }
    },
  },
});
