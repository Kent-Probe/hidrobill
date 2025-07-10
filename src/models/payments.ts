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

export type PaymentWithDetails = {
  payment: Payment;
  house: {
    id: string;
    direction: string;
  };
  client: {
    name: string;
    lastname: string;
    document: string;
  };
};

/* 
id: cadena;
id_contrato: cadena;
fecha: cadena | Fecha;
valor_total: número;
deuda_restante: número;
reconexión: número;
inscripción: número;
pago_mensual: número;
pagos: número;
cargo_por_atraso: número;
otros_cargos: número;
estado_de_pago: "PAGADO" | "PENDIENTE" | "ANULADO";
descripción: cadena;
*/
