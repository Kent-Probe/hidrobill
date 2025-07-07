import Database from "@tauri-apps/plugin-sql";
import { Client, ClientWithInfo } from "../../models/clients";
import { House } from "../../models/houses";

export async function getClients(limit: number, page: number): Promise<Client[]> {
  // Simula una llamada a la API
  const offset = (page - 1) * limit;
  const db = await Database.load("sqlite:hidrobill.db");
  const clientsResult = await db.select("SELECT * FROM client limit $1 offset $2", [limit, offset]);

  const clientIds = clientsResult.map((c) => c.id);

  // --- PASO 2: Obtener los CONTRATOS para esos clientes ---
  const contractPlaceholders = clientIds.map(() => "?").join(",");
  const contractsResult: any[] = await db.select(
    `SELECT * FROM contract WHERE id_client IN (${contractPlaceholders})`,
    clientIds
  );

  if (contractsResult.length === 0) {
    const clients: ClientWithInfo[] = clientsResult.map((row) => {
      return {
        id: row.id,
        document: row.document,
        name: row.names,
        lastname: row.lastnames,
        state: row.state,
        gender: row.gender,
        created_at: row.created_at,
        updated_at: row.updated_at,
        contracts: [],
      };
    }) as ClientWithInfo[];
    return clients;
  }

  const contractIds = contractsResult.map((c) => c.id);
  const houseIds = [...new Set(contractsResult.map((c) => c.id_house))]; // IDs únicos

  // --- PASO 3: Obtener las CASAS y los PAGOS para esos contratos ---
  const housePlaceholders = houseIds.map(() => "?").join(",");
  const paymentPlaceholders = contractIds.map(() => "?").join(",");

  // Ejecutamos ambas consultas en paralelo para más eficiencia
  const [housesResult, paymentsResult]: [any[], any[]] = await Promise.all([
    db.select(`SELECT * FROM house WHERE id IN (${housePlaceholders})`, houseIds),
    db.select(
      `SELECT * FROM payment WHERE id_contract IN (${paymentPlaceholders}) ORDER BY id DESC LIMIT 10`,
      contractIds
    ),
  ]);

  // --- PASO 4: Ensamblar la estructura de datos anidada ---

  // 4a. Crear mapas para búsqueda rápida (O(1))
  const houseMap = new Map<number, House>(housesResult.map((h) => [h.id, h]));
  const paymentsByContractId = new Map<number, Payment[]>();
  for (const payment of paymentsResult) {
    if (!paymentsByContractId.has(payment.id_contract)) {
      paymentsByContractId.set(payment.id_contract, []);
    }
    paymentsByContractId.get(payment.id_contract)!.push(payment);
  }

  // 4b. Ensamblar los contratos con sus casas y pagos
  const contractsById = new Map<number, Contract[]>();
  for (const contractRow of contractsResult) {
    const contract: Contract = {
      ...contractRow,
      house: houseMap.get(contractRow.id_house),
      payments: paymentsByContractId.get(contractRow.id) || [],
    };
    if (!contractsById.has(contract.id_client)) {
      contractsById.set(contract.id_client, []);
    }
    contractsById.get(contract.id_client)!.push(contract);
  }

  const clients: ClientWithInfo[] = clientsResult.map((row) => {
    return {
      id: row.id,
      document: row.document,
      name: row.names,
      lastname: row.lastnames,
      state: row.state,
      gender: row.gender,
      created_at: row.created_at,
      updated_at: row.updated_at,
      contracts: contractsById.get(row.id) || [],
    };
  }) as ClientWithInfo[];
  return clients;
}
