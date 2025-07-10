import Database from "@tauri-apps/plugin-sql";
import { Payment, PaymentWithDetails } from "../../models/payments";

export async function getPayments(limit: number, page: number): Promise<Payment[]> {
  const offset = (page - 1) * limit;
  const db = await Database.load("sqlite:hidrobill.db");
  const paymentsResult = await db.select("SELECT * FROM payment limit $1 offset $2", [limit, offset]);
  const payments: Payment[] = paymentsResult.map((row) => {
    return {
      ...row,
    } as Payment;
  });
  return payments;
}
export async function getPaymentWithDetails(paymentId: string): Promise<PaymentWithDetails | null> {
  const db = await Database.load("sqlite:hidrobill.db");
  const result = await db.select(
    `
    SELECT 
      p.*,
      h.id as house_id,
      h.direction as house_direction,
      c.names as client_name,
      c.lastnames as client_lastname,
      c.document as client_document
    FROM payment p
    INNER JOIN contract ct ON p.id_contract = ct.id
    INNER JOIN house h ON ct.id_house = h.id
    INNER JOIN client c ON ct.id_client = c.id
    WHERE p.id = $1
  `,
    [paymentId]
  );

  if (result.length === 0) {
    throw new Error("No se encontró el pago con el ID proporcionado");
  }

  const row = result[0];
  return {
    payment: {
      id: row.id,
      id_contract: row.id_contract,
      date: row.date,
      value_total: row.value_total,
      remaining_debt: row.remaining_debt,
      reconnection: row.reconnection,
      enrollment: row.enrollment,
      monthly_payment: row.monthly_payment,
      payments: row.payments,
      late_fee: row.late_fee,
      other_charges: row.other_charges,
      payment_state: row.payment_state,
      description: row.description,
      amount_monthly: row.amount_monthly,
      monthly_type_amount: row.monthly_type_amount,
    },
    house: {
      id: row.house_id,
      direction: row.house_direction,
    },
    client: {
      name: row.client_name,
      lastname: row.client_lastname,
      document: row.client_document,
    },
  };
}
