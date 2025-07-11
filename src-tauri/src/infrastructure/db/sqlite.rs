use tauri_plugin_sql::{Migration, MigrationKind};

pub fn create_migration_db() -> Vec<Migration> {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: include_str!("./schema.sql"),
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "insert_admin_user",
            sql: "INSERT INTO USER (name, username, password, state) VALUES ('Admin', 'admin', '$2b$12$9t/UG.tjW4mEXyCxFF1HMO0s75quMG6MmYeSWpPkNQt.qceVAduz.', 'activo');",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "add_date_payment_column",
            sql: "ALTER TABLE payment ADD COLUMN date_payment DATETIME; UPDATE payment SET date_payment = date WHERE date_payment IS NULL;",
            kind: MigrationKind::Up,
        }
    ];
    migrations
}
