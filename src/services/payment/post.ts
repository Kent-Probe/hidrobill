import Database from "@tauri-apps/plugin-sql";
import { Payment } from "../../models/payments";

export async function createPayment(
  payment: Payment
): Promise<{ success: boolean; message: string; id_payment: string }> {
  try {
    console.log(payment);
    const db = await Database.load("sqlite:hidrobill.db");

    const paymentRows = await db.execute(
      `INSERT INTO payment (
                  id_contract, date, value_total, remaining_debt, 
                  reconnection, enrollment, monthly_payment, payments, 
                  late_fee, other_charges, payment_state, description, amount_monthly,
                    monthly_type_amount, date_payment
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
      [
        payment.id_contract,
        payment.date,
        payment.value_total,
        payment.remaining_debt,
        payment.reconnection,
        payment.enrollment,
        payment.monthly_payment,
        payment.payments,
        payment.late_fee,
        payment.other_charges,
        payment.payment_state,
        payment.description,
        payment.amount_monthly,
        payment.monthly_type_amount,
        payment.date_payment,
      ]
    );

    const idPayment = paymentRows.lastInsertId;

    return {
      success: true,
      message: "Pago creado exitosamente",
      id_payment: idPayment.toString(),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
      id_payment: "",
    };
  }
}
export async function updatePaymentStatus(
  paymentId: string,
  newStatus: "PAGADO" | "PENDIENTE" | "ANULADO"
): Promise<{ success: boolean; message: string }> {
  try {
    const db = await Database.load("sqlite:hidrobill.db");

    const result = await db.execute(`UPDATE payment SET payment_state = ? WHERE id = ?`, [newStatus, paymentId]);

    if (result.rowsAffected === 0) {
      return {
        success: false,
        message: "No se encontró el pago con el ID especificado",
      };
    }

    return {
      success: true,
      message: "Estado del pago actualizado exitosamente",
    };
  } catch (error) {
    console.error("Error updating payment status:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
