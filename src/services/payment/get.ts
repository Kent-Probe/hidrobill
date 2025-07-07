import Database from "@tauri-apps/plugin-sql";
import { Payment } from "../../models/payments";

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
