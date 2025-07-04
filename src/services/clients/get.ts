import { Client } from "../../models/clients";
import { seedClients } from "../seed";

export async function getClients(): Promise<Client[]> {
  // Simula una llamada a la API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(seedClients);
    }, 500); // Simula un pequeño retraso
  });
}

export async function getClient(id: string): Promise<Client | undefined> {
  const clients = await getClients();
  return clients.find((client) => client.id === id);
}
