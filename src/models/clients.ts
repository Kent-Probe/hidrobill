import { Contract } from "./contract";
import { House } from "./houses";
import { Payment } from "./payments";

export type Client = {
  id: string;
  document: string; // document number
  name: string;
  lastname: string;
  state: "Desactivado" | "Al dia" | "En mora";
  gender: "Masculino" | "Femenino";
  created_at: string;
  updated_at: string;
  houses: House[];
  contracts: Contract[];
  payments: Payment[];
};
