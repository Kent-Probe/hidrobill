import { Contract } from "./contract";

export type Client = {
  id: string;
  document: string; // document number
  name: string;
  lastname: string;
  state: "Desactivado" | "Al dia" | "En mora";
  gender: "Masculino" | "Femenino";
  created_at: string;
  updated_at: string;
};

export type ClientWithInfo = {
  id: string;
  document: string; // document number
  name: string;
  lastname: string;
  state: "Desactivado" | "Al dia" | "En mora";
  gender: "Masculino" | "Femenino";
  created_at: string;
  updated_at: string;
  contracts: Contract[] | null;
};
