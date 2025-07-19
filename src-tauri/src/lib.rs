mod infrastructure;
use tauri::Manager;
use tauri_plugin_sql::{Builder};
use infrastructure::db::sqlite::create_migration_db;
use infrastructure::tauri::commands::{
    hash_password, verify_password_and_create_token
};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
        .plugin(Builder::default().add_migrations("sqlite:hidrobill.db", create_migration_db()).build())
        .invoke_handler(tauri::generate_handler![
            greet,
            hash_password,
            verify_password_and_create_token,
        ])
        .setup(|app| {
            let salt_path = app
                .path()
                .app_local_data_dir()
                .expect("could not resolve app local data path")
                .join("salt.txt");
            app.handle().plugin(tauri_plugin_stronghold::Builder::with_argon2(&salt_path).build())?;
            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
            app.handle().plugin(tauri_plugin_process::init())?;

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
