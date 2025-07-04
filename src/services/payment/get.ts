import { invoke } from "@tauri-apps/api/core";
import { Payment } from "../../models/payments";

export async function getPayments(): Promise<Payment[]> {
  return await invoke("getPayments");
}
