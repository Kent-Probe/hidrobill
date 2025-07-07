// import { Client, Store, Stronghold } from "@tauri-apps/plugin-stronghold";
// // when using `"withGlobalTauri": true`, you may use
// // const { Client, Stronghold } = window.__TAURI__.stronghold;
// import { appDataDir } from "@tauri-apps/api/path";
// // when using `"withGlobalTauri": true`, you may use
// // const { appDataDir } = window.__TAURI__.path;

// export const initStronghold = async () => {
//   const vaultPath = `${await appDataDir()}/vault.hold`;
//   const vaultPassword = "vault password";
//   const stronghold = await Stronghold.load(vaultPath, vaultPassword);

//   let client: Client;
//   const clientName = "name your client";
//   try {
//     client = await stronghold.loadClient(clientName);
//   } catch {
//     client = await stronghold.createClient(clientName);
//   }

//   return {
//     stronghold,
//     client,
//   };
// };

// // Insert a record to the store
// export async function insertRecord(store: Store, key: string, value: string) {
//   const data = Array.from(new TextEncoder().encode(value));
//   await store.insert(key, data);
// }

// // Read a record from store
// export async function getRecord(store: Store, key: string): Promise<string> {
//   const data = await store.get(key);
//   return new TextDecoder().decode(new Uint8Array(data));
// }

// const { stronghold, client } = await initStronghold();

// const store = client.getStore();
// const key = "my_key";

// // Insert a record to the store
// insertRecord(store, key, "secret value");

// // Read a record from store
// const value = await getRecord(store, key);
// console.log(value); // 'secret value'

// // Save your updates
// await stronghold.save();

// // Remove a record from store
// await store.remove(key);
