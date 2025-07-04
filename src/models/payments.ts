export type Payment = {
  id: string;
  id_contrato: string;
  date: string;
  valueTotal: number;
  remaining_debt: number;
  reconnection: number;
  enrollment: number;
  monthly_payment: number;
  payments: number;
  late_fee: number;
  other_charges: number;
  paymentState: "PAGADO" | "PENDIENTE" | "ANULADO";
  description: string;
};
