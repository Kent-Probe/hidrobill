import { House } from "./houses";
import { Payment } from "./payments";

export type Contract = {
  id: string;
  id_client: string; // client id
  id_house: string; // house id
  start_date: string; // contract start date
  end_date: string; // contract end date
  monthlyPayment: number; // monthly payment amount
  payday: number; // day of the month when payment
  payday_due: number; // day of the month when payment is due
  state: "Activo" | "Inactivo"; // contract state
  description: string; // description of the contract
  created_at: string; // creation date
  updated_at: string; // last update date

  house: House | null;
  payments: Payment[] | null;
};
