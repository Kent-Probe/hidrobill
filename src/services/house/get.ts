import { getClients } from "../clients/get";

export async function getHouses() {
  const clients = await getClients();
  const houses = clients.flatMap((client) => client.houses);
  return houses;
}

export async function getHouse(id: string) {
  const houses = await getHouses();
  return houses.find((house) => house.id === id);
}
