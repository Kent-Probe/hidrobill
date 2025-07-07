export type Payment = {
  id: string;
  id_contract: string;
  date: string | Date;
  value_total: number;
  remaining_debt: number;
  reconnection: number;
  enrollment: number;
  monthly_payment: number;
  payments: number;
  late_fee: number;
  other_charges: number;
  payment_state: "PAGADO" | "PENDIENTE" | "ANULADO";
  description: string;
};
