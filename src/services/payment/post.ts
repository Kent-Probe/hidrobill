import Database from "@tauri-apps/plugin-sql";
import { Payment } from "../../types/payments";

export async function createPayment(
  payment: Payment
): Promise<{ success: boolean; message: string; id_payment: string }> {
  try {
    const db = await Database.load("sqlite:hidrobill.db");

    const paymentRows = await db.execute(
      `INSERT INTO payment (
                  id_contract, date, value_total, remaining_debt, 
                  reconnection, enrollment, monthly_payment, payments, 
                  late_fee, other_charges, payment_state, description
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
