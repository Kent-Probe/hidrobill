import { invoke } from "@tauri-apps/api/core";
import Database from "@tauri-apps/plugin-sql";
import { User } from "../../models/user";

type LoginResult = {
  user: User;
  token: string;
};

export const login = async (username: string, password: string): Promise<LoginResult> => {
  const db = await Database.load("sqlite:hidrobill.db");
  const userRow = await db.select("SELECT * FROM USER WHERE username = $1", [username]);
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
