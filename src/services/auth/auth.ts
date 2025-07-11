import { invoke } from "@tauri-apps/api/core";
import Database from "@tauri-apps/plugin-sql";
import { RegisterDataUser, User, UserDB } from "../../models/user";

type LoginResult = {
  user: User;
  token: string;
};

type ServiceResult = {
  success: boolean;
  message: string;
};

/**
 * Inicia sesion en el sistema.
 * @param username Usuario del sistema.
 * @param password Contraseña del usuario.
 * @returns Un objeto tipo LoginResult (contiene el user de tipo User y token de tipo string.) que contiene el usuario y el token de sesión.
 * @throws Error si el usuario no existe o la contraseña es incorrecta.
 */
export const login = async (username: string, password: string): Promise<LoginResult> => {
  const db = await Database.load("sqlite:hidrobill.db");
  const userRow = await db.select("SELECT * FROM USER WHERE username = $1 AND state = 'activo'", [username]);
  if (userRow.length === 0) {
    throw new Error("Usuario no encontrado");
  }
  const passwordHash = userRow[0].password;
  const sessionToken = await invoke("verify_password_and_create_token", {
    password: password,
    hash: passwordHash,
    username: userRow[0].username,
    name: userRow[0].name,
  }).catch((error) => {
    throw new Error("Error verificando la contraseña, contraseña incorrecta");
  });
  if (!sessionToken) {
    throw new Error("Contraseña incorrecta");
  }

  return {
    user: {
      name: userRow[0].name,
      username: userRow[0].username,
    },
    token: sessionToken,
  };
};

/**
 * Registra un nuevo usuario en el sistema.
 * Cifra la contraseña usando una función de Rust y la guarda en la base de datos.
 * @param data - Objeto con los datos del usuario a registrar.
 * @returns Un objeto ServiceResult indicando si la operación fue exitosa.
 */
export const register = async (data: RegisterDataUser): Promise<ServiceResult> => {
  try {
    // 1. Cifrar la contraseña llamando a la función de Rust
    const passwordHash: string = await invoke("hash_password", {
      password: data.password,
    });

    // 2. Preparar los datos para la inserción
    const name = `${data.names} ${data.lastnames}`;

    // 3. Insertar el nuevo usuario en la base de datos
    const db = await Database.load("sqlite:hidrobill.db");
    await db.execute("INSERT INTO USER (name, username, password) VALUES ($1, $2, $3)", [
      name,
      data.username,
      passwordHash,
    ]);

    return { success: true, message: "Usuario registrado exitosamente." };
  } catch (error: any) {
    console.error("Error durante el registro:", error);

    // Manejar errores específicos para dar una mejor retroalimentación
    if (error?.toString().includes("UNIQUE constraint failed: users.username")) {
      return { success: false, message: "El nombre de usuario ya está en uso." };
    }

    return { success: false, message: "No se pudo completar el registro." };
  }
};

/**
 * Actualiza el estado de un usuario existente (ej: 'activo', 'inactivo').
 * @param userId - El ID del usuario a actualizar.
 * @param state - El nuevo estado para el usuario.
 * @returns Un objeto ServiceResult indicando si la operación fue exitosa.
 */
export const updateUserState = async (userId: number, state: string): Promise<ServiceResult> => {
  try {
    const db = await Database.load("sqlite:hidrobill.db");
    const result = await db.execute("UPDATE USER SET state = $1 WHERE id = $2", [state, userId]);

    // Verificar si alguna fila fue realmente actualizada
    if (result.rowsAffected === 0) {
      return { success: false, message: "No se encontró un usuario con el ID proporcionado." };
    }

    return { success: true, message: "Estado del usuario actualizado correctamente." };
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    return { success: false, message: "Ocurrió un error al intentar actualizar el estado." };
  }
};

/**
 * Obtiene todos los usuarios del sistema excepto el usuario administrador por defecto (ID = 1).
 * @returns Promise que resuelve a un array de usuarios con name, username y state.
 */
export const getAllUsersExceptAdmin = async (): Promise<UserDB[]> => {
  try {
    const db = await Database.load("sqlite:hidrobill.db");
    const users = await db.select("SELECT id, name, username, state FROM USER WHERE id != 1");
    return users as UserDB[];
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw new Error("No se pudieron obtener los usuarios");
  }
};

/**
 * Actualiza el nombre y nombre de usuario de un usuario existente.
 * @param userId - El ID del usuario a actualizar.
 * @param name - El nuevo nombre completo del usuario.
 * @param username - El nuevo nombre de usuario.
 * @returns Un objeto ServiceResult indicando si la operación fue exitosa.
 */
export const updateUserInfo = async (userId: number, name: string, username: string): Promise<ServiceResult> => {
  try {
    const db = await Database.load("sqlite:hidrobill.db");
    const result = await db.execute("UPDATE USER SET name = $1, username = $2 WHERE id = $3", [name, username, userId]);

    if (result.rowsAffected === 0) {
      return { success: false, message: "No se encontró un usuario con el ID proporcionado." };
    }

    return { success: true, message: "Información del usuario actualizada correctamente." };
  } catch (error: any) {
    console.error("Error al actualizar la información del usuario:", error);

    if (error?.toString().includes("UNIQUE constraint failed: users.username")) {
      return { success: false, message: "El nombre de usuario ya está en uso." };
    }

    return { success: false, message: "Ocurrió un error al intentar actualizar la información." };
  }
};

/**
 * Actualiza la contraseña de un usuario existente.
 * @param userId - El ID del usuario a actualizar.
 * @param newPassword - La nueva contraseña sin cifrar.
 * @returns Un objeto ServiceResult indicando si la operación fue exitosa.
 */
export const updateUserPassword = async (userId: number, newPassword: string): Promise<ServiceResult> => {
  try {
    // Cifrar la nueva contraseña
    const passwordHash: string = await invoke("hash_password", {
      password: newPassword,
    });

    const db = await Database.load("sqlite:hidrobill.db");
    const result = await db.execute("UPDATE USER SET password = $1 WHERE id = $2", [passwordHash, userId]);

    if (result.rowsAffected === 0) {
      return { success: false, message: "No se encontró un usuario con el ID proporcionado." };
    }

    return { success: true, message: "Contraseña actualizada correctamente." };
  } catch (error) {
    console.error("Error al actualizar la contraseña del usuario:", error);
    return { success: false, message: "Ocurrió un error al intentar actualizar la contraseña." };
  }
};
