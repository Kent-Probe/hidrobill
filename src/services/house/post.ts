import Database from "@tauri-apps/plugin-sql";
import { House } from "../../models/houses";

interface UpdateResult {
  success: boolean;
  message: string;
}

export async function updateHouse(id: string, house: Omit<House, "id" | "created_at">): Promise<UpdateResult> {
  try {
    const db = await Database.load("sqlite:hidrobill.db");

    const updatedHouse = {
      ...house,
      updated_at: new Date().toISOString(),
    };

    const resultUpdate = await db
      .execute(
        `UPDATE house SET 
                direction = ?, 
                neighborhood = ?, 
                colorChip = ?, 
                description = ?, 
                updated_at = ? 
            WHERE id = ?`,
        [
          updatedHouse.direction,
          updatedHouse.neighborhood,
          updatedHouse.colorChip,
          updatedHouse.description,
          updatedHouse.updated_at,
          id,
        ]
      )
      .catch((error) => {
        console.log(error);
        throw new Error("error actualizando la casa, verifique si la dirección es un valor único.");
      });

    console.log(resultUpdate);

    if (resultUpdate.rowsAffected === 0) {
      throw new Error("No se encontró la casa con el ID proporcionado o no se realizaron cambios.");
    }

    return {
      success: true,
      message: "Casa actualziada exitosamente",
    };
  } catch (error) {
    console.error("Error updating house:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
