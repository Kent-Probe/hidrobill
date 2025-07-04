export type Contract = {
  id: string;
  id_cliente: string; // client id
  id_casa: string; // house id
  createdAt: string; // creation date
  updatedAt: string; // last update date
  startDate: string; // contract start date
  endDate: string; // contract end date
  monthlyPayment: number; // monthly payment amount
  payday: number; // day of the month when payment
  payday_due: number; // day of the month when payment is due
  state: "Activo" | "Inactivo"; // contract state
  description: string; // description of the contract
};
