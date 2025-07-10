import Database from "@tauri-apps/plugin-sql";
import { Contract } from "../../models/contract";
import { House } from "../../models/houses";

export async function createContracts(contracts: Contract[]): Promise<{ success: boolean; message: string }> {
  const createdHouses: string[] = [];
  const createdContracts: string[] = [];

  try {
    for (let i = 0; i < contracts.length; i++) {
      const contract = contracts[i];

      // Check if house needs to be created
      if (contract.house?.id === "C-000") {
        try {
          // Create house logic here
          const newHouse = await createHouse(contract.house);
          createdHouses.push(newHouse.id);
          contract.id_house = newHouse.id;
        } catch (error) {
          return {
            success: false,
            message: `Error al crear la casa: ${error.message}. ${
              createdHouses.length > 0 ? `Se crearon las casas con IDs: ${createdHouses.join(", ")}. ` : ""
            }Revise los datos de la casa y reintente.`,
          };
        }
      }

      // Create contract
      try {
        const newContract = await createContract(contract);
        createdContracts.push(newContract.id);
      } catch (error) {
        return {
          success: false,
          message: `Error al crear el contrato ${i + 1}: ${error.message}. ${
            createdHouses.length > 0 ? `Se crearon las casas con IDs: ${createdHouses.join(", ")}. ` : ""
          }${
            createdContracts.length > 0 ? `Se crearon los contratos con IDs: ${createdContracts.join(", ")}. ` : ""
          }Reintente en la sección de asignar casa al cliente.`,
        };
      }
    }

    return {
      success: true,
      message: `Se crearon exitosamente ${createdContracts.length} contratos${
        createdHouses.length > 0 ? ` y ${createdHouses.length} casas` : ""
      }.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error inesperado: ${error.message}. ${
        createdHouses.length > 0 || createdContracts.length > 0
          ? "Algunos registros pudieron haberse creado parcialmente. "
          : ""
      }Verifique la conexión a la base de datos y reintente.`,
    };
  }
}
async function createHouse(house: House): Promise<{ id: string }> {
  const db = await Database.load("sqlite:hidrobill.db");

  try {
    const result = await db
      .execute("INSERT INTO house (direction, neighborhood, colorChip, description) VALUES (?, ?, ?, ?)", [
        house.direction,
        house.neighborhood,
        house.colorChip,
        house.description || "",
      ])
      .catch((error) => {
        console.log(error);
        throw new Error("Error al insertar la casa, verifique los datos ingresados.");
      });

    return { id: result.lastInsertId.toString() };
  } catch (error) {
    throw new Error(`No se pudo insertar la casa en la base de datos: ${error.message}`);
  }
}

async function createContract(contract: Contract): Promise<{ id: string }> {
  const db = await Database.load("sqlite:hidrobill.db");

  try {
    const result = await db.execute(
      `INSERT INTO contract (id_client, id_house, start_date, end_date, monthlyPayment, payday, payday_due, state, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        contract.id_client,
        contract.id_house,
        contract.start_date,
        contract.start_date,
        contract.monthlyPayment,
        contract.payday,
        contract.payday_due,
        contract.state,
        contract.description,
      ]
    );

    return { id: result.lastInsertId.toString() };
  } catch (error) {
    throw new Error(`No se pudo insertar el contrato en la base de datos: ${error.message}`);
  }
}
export async function deleteContract(contractId: string): Promise<{ success: boolean; message: string }> {
  const db = await Database.load("sqlite:hidrobill.db");

  try {
    const result = await db.execute("DELETE FROM contract WHERE id = ?", [contractId]).catch((err) => {
      console.error(err);
      throw new Error("Error al eliminar el contrato, verifique los datos ingresados.");
    });

    if (result.rowsAffected === 0) {
      return {
        success: false,
        message: "No se encontró el contrato con el ID especificado.",
      };
    }

    return {
      success: true,
      message: "Contrato eliminado exitosamente.",
    };
  } catch (error) {
    return {
      success: false,
      message: `Error al eliminar el contrato: ${error.message}`,
    };
  }
}
