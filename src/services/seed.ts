import { Client } from "../../types/clients";
import { Contract } from "../../types/contract";
import { House } from "../../types/houses";
import { Payment } from "../../types/payments";
import { paletteColors } from "./colors/paletteColors";

const barrios = [
  "Centro",
  "La Paz",
  "San José",
  "Villa Nueva",
  "Los Álamos",
  "El Prado",
  "Santa Ana",
  "Bosques",
  "Las Flores",
  "Primavera",
];

const nombres = [
  "Ana",
  "Carlos",
  "María",
  "José",
  "Laura",
  "Pedro",
  "Carmen",
  "Luis",
  "Isabel",
  "Miguel",
  "Rosa",
  "Antonio",
  "Elena",
  "Francisco",
  "Lucía",
];

const apellidos = [
  "García",
  "Rodríguez",
  "González",
  "Fernández",
  "López",
  "Martínez",
  "Sánchez",
  "Pérez",
  "Gómez",
  "Martín",
  "Jiménez",
  "Ruiz",
  "Hernández",
];

const direcciones = [
  "Calle 1",
  "Calle 2",
  "Carrera 3",
  "Avenida 4",
  "Transversal 5",
  "Diagonal 6",
  "Calle 7",
  "Carrera 8",
  "Avenida 9",
  "Calle 10",
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toUTCString();
}

function generateHouse(): House {
  const house = {
    id: `h_${getRandomNumber(1, 99)}`,
    direction: `${getRandomElement(direcciones)} #${getRandomNumber(10, 99)}-${getRandomNumber(10, 99)}`,
    colorChip: getRandomElement(paletteColors),
    barrio: getRandomElement(barrios),
    description: `Casa ubicada en ${getRandomElement(barrios)}`,
  };
  return house;
}

function generateContract(clientId: string, houseId: string): Contract {
  const startDate = getRandomDate(new Date(2020, 0, 1), new Date(2023, 11, 31));
  const endDate = getRandomDate(new Date(startDate), new Date(2025, 11, 31));

  return {
    id: `contract_${Math.random().toString(36).substr(2, 9)}`,
    id_cliente: clientId,
    id_casa: houseId,
    createdAt: startDate,
    updatedAt: getRandomDate(new Date(startDate), new Date()),
    startDate,
    endDate,
    payday: getRandomNumber(1, 28), // day of the month for payment
    payday_due: getRandomNumber(1, 28), // day of the month when payment is due
    monthlyPayment: getRandomNumber(50000, 200000),
    state: getRandomElement(["Activo", "Inactivo"]),
    description: `Contrato de servicio de agua para casa ${houseId}`,
  };
}

function generatePayment(contractId: string): Payment {
  const monthlyPayment = getRandomNumber(50000, 200000);
  const reconnection = Math.random() > 0.8 ? getRandomNumber(10000, 30000) : 0;
  const enrollment = Math.random() > 0.9 ? getRandomNumber(20000, 50000) : 0;
  const lateFee = Math.random() > 0.7 ? getRandomNumber(5000, 15000) : 0;
  const otherCharges = Math.random() > 0.8 ? getRandomNumber(3000, 12000) : 0;

  const valueTotal = monthlyPayment + reconnection + enrollment + lateFee + otherCharges;

  return {
    id: `payment_${Math.random().toString(36).substr(2, 9)}`,
    id_contrato: contractId,
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    valueTotal,
    remaining_debt: Math.random() > 0.6 ? getRandomNumber(0, valueTotal) : 0,
    reconnection,
    enrollment,
    monthly_payment: monthlyPayment,
    payments: getRandomNumber(1, 12),
    late_fee: lateFee,
    other_charges: otherCharges,
    paymentState: getRandomElement(["PAGADO", "PENDIENTE", "ANULADO"]),
    description: `Pago de servicios mes ${getRandomNumber(1, 12)}/2024`,
  };
}

export const seedClients: Client[] = Array.from({ length: 50 }, (_, index) => {
  const clientId = `client_${(index + 1).toString().padStart(3, "0")}`;
  const housesCount = getRandomNumber(1, 3);
  const houses: House[] = Array.from({ length: housesCount }, () => generateHouse());

  const contracts: Contract[] = houses.map((house) => generateContract(clientId, house.id));

  const payments: Payment[] = contracts.flatMap((contract) => {
    const paymentsCount = getRandomNumber(1, 10);
    return Array.from({ length: paymentsCount }, () => generatePayment(contract.id));
  });

  const hasOverduePayments = payments.some((p) => p.paymentState === "PENDIENTE" && p.remaining_debt > 0);
  const hasActiveContracts = contracts.some((c) => c.state === "Activo");

  let clientState: "Desactivado" | "Al dia" | "En mora";
  if (!hasActiveContracts) {
    clientState = "Desactivado";
  } else if (hasOverduePayments) {
    clientState = "En mora";
  } else {
    clientState = "Al dia";
  }

  return {
    id: clientId,
    document: `${getRandomNumber(10000000, 99999999)}`,
    name: getRandomElement(nombres),
    lastname: getRandomElement(apellidos),
    state: clientState,
    gender: getRandomElement(["Masculino", "Femenino"]),
    created_at: getRandomDate(new Date(2020, 0, 1), new Date(2023, 0, 1)),
    updated_at: getRandomDate(new Date(2023, 0, 1), new Date()),
    houses,
    contracts,
    payments,
  };
});
