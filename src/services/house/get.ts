import Database from "@tauri-apps/plugin-sql";
import { House } from "../../models/houses";

export async function getHouses(limit: number, page: number): House[] {
  const offset = (page - 1) * limit;
  const db = await Database.load("sqlite:hidrobill.db");
  const houseRow = await db.select("SELECT * FROM House LIMIT $1 OFFSET $2", [limit, offset]);
  return houseRow.map((row) => ({
    id: row.id,
    direction: row.direction,
    neighborhood: row.neighborhood,
    colorChip: row.colorChip,
    description: row.description,
    created_at: row.created_at,
    updated_at: row.updated_at,
  })) as House[];
}

export async function searchHouses(search: string): Promise<House[]> {
  const db = await Database.load("sqlite:hidrobill.db");
  const houseRow = await db.select("SELECT * FROM House WHERE CAST(id AS TEXT) LIKE $1 OR direction LIKE $1 LIMIT 5", [
    `%${search}%`,
  ]);
  return houseRow.map((row) => ({
    id: row.id,
    direction: row.direction,
    neighborhood: row.neighborhood,
    colorChip: row.colorChip,
    description: row.description,
    created_at: row.created_at,
    updated_at: row.updated_at,
  })) as House[];
}
