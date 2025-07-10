import Database from "@tauri-apps/plugin-sql";
import { Client, ClientWithInfo } from "../../models/clients";

export async function createClient(
  client: Omit<Client, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; message: string }> {
  try {
    const db = await Database.load("sqlite:hidrobill.db");
    await db
      .execute(
        `INSERT INTO client (document, names, lastnames, state, gender) 
             VALUES (?, ?, ?, ?, ?)`,
        [client.document, client.name, client.lastname, client.state, client.gender]
      )
      .catch((error) => {
        throw new Error(
          "Error al insertar el cliente, verifica los datos ingresados. Asegúrate de que el documento sea único y válido."
        );
      });

    return { success: true, message: "Cliente creado exitosamente" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function createClientWithContracts(
  clientWithInfo: Omit<ClientWithInfo, "id" | "created_at" | "updated_at">
): Promise<{ success: boolean; message: string }> {
  try {
    const db = await Database.load("sqlite:hidrobill.db");

    // Insert client
    const clientResult = await db
      .execute(
        `INSERT INTO client (document, names, lastnames, state, gender, phone) 
             VALUES (?, ?, ?, ?, ?, ?)`,
        [
          clientWithInfo.document,
          clientWithInfo.name,
          clientWithInfo.lastname,
          clientWithInfo.state,
          clientWithInfo.gender,
          clientWithInfo.phone | "",
        ]
      )
      .catch((error) => {
        throw new Error(
          "Error al insertar el cliente, verifica los datos ingresados. Asegúrate de que el documento sea único y válido."
        );
      });

    const clientId = clientResult.lastInsertId;

    // Insert contracts if they exist
    if (clientWithInfo.contracts && clientWithInfo.contracts.length > 0) {
      for (const contract of clientWithInfo.contracts) {
        let house_id = contract.house?.id;
        if (house_id === "C-000") {
          const houseInsert = await db
            .execute(
              `INSERT INTO house (direction, neighborhood, colorChip, description) 
                                 VALUES (?, ?, ?, ?)`,
              [
                contract.house.direction,
                contract.house.neighborhood,
                contract.house.colorChip,
                contract.house.description,
              ]
            )
            .catch((error) => {
              console.log(error);
              throw new Error(
                "Error al insertar la casa, verifica los datos ingresados. Asegúrate de que la dirección sea un valor único. Si se registro el cliente pero el proceso fracaso al registrar la casa, puede crear la casa manualmente o asignarla a un cliente existente."
              );
            });
          if (!houseInsert.lastInsertId) {
            throw new Error(
              "Error al insertar la casa, verifica los datos ingresados. El ID de la casa no se generó correctamente. Asegúrate de que la dirección sea un valor único. Si se registro el cliente pero el proceso fracaso al registrar la casa, puede crear la casa manualmente o asignarla a un cliente existente."
            );
          }
          house_id = houseInsert.lastInsertId;
        } else {
          const houseSelect = await db.select(`SELECT id FROM house WHERE id = ? limit 1`, [house_id]);
          if (houseSelect.length > 0) {
            house_id = houseSelect[0].id;
          } else {
            throw new Error(
              "Error al seleccionar la casa, verifica los datos ingresados. La casa se encontro pero no se pudo conseguir el ID. Si se registro el cliente, pero el proceso fracaso al registrar la casa, puede crear la casa manualmente o asignarla a un cliente existente."
            );
          }
        }
        await db
          .execute(
            `INSERT INTO contract (id_client, id_house, start_date, end_date, monthlyPayment, payday, payday_due, state, description) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              clientId,
              house_id,
              contract.start_date,
              contract.start_date,
              contract.monthlyPayment,
              contract.payday,
              contract.payday_due,
              contract.state,
              contract.description,
            ]
          )
          .catch((error) => {
            console.log(error);
            throw new Error(
              "Error al insertar el contrato, verifica los datos ingresados. Asegúrate de que el cliente y la casa existan y sean válidos. Se registro el cliente y la casa pero el proceso fracaso al registrar el contrato, puede crear el contrato manualmente o asignarlo a un cliente existente."
            );
          });
      }
    }

    return { success: true, message: "Cliente y contratos creados exitosamente" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function updateClient(client: Client): Promise<{ success: boolean; message: string }> {
  try {
    const db = await Database.load("sqlite:hidrobill.db");

    await db.execute(
      `UPDATE client SET 
                document = $1, 
                names = $2, 
                lastnames = $3, 
                state = $4, 
                gender = $5, 
                phone = $6,
                updated_at = $7 
            WHERE id = $8`,
      [client.document, client.name, client.lastname, client.state, client.gender, client.phone, new Date(), client.id]
    );

    return { success: true, message: "Cliente actualizado exitosamente" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function deactivateClient(clientId: string): Promise<{ success: boolean; message: string }> {
  try {
    const db = await Database.load("sqlite:hidrobill.db");

    await db.execute(`UPDATE client SET state = 'Desactivado' WHERE id = ?`, [clientId]);

    return { success: true, message: "Cliente Desactivado, no se hara seguimiento" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}

export async function activatedClient(clientId: string): Promise<{ success: boolean; message: string }> {
  try {
    const db = await Database.load("sqlite:hidrobill.db");

    await db.execute(`UPDATE client SET state = 'Al dia' WHERE id = ?`, [clientId]);

    return { success: true, message: "Cliente Activado, se hara seguimiento" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Error desconocido",
    };
  }
}
