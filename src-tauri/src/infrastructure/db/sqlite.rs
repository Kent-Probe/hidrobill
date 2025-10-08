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
        },
        Migration {
            version: 4,
            description: "enable_foreign_keys_and_fix_constraints",
            sql: r#"
                -- Habilitar foreign keys
                PRAGMA foreign_keys = ON;
                
                -- Crear tablas temporales con las foreign keys correctas
                CREATE TABLE contract_new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    id_client INTEGER NOT NULL,
                    id_house INTEGER NOT NULL,
                    start_date DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
                    end_date DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
                    monthlyPayment INTEGER NOT NULL DEFAULT 0,
                    payday INTEGER NOT NULL DEFAULT '1',
                    payday_due INTEGER NOT NULL DEFAULT '4',
                    state TEXT NOT NULL DEFAULT 'ACTIVO',
                    description TEXT,
                    created_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
                    updated_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
                    FOREIGN KEY(id_client) REFERENCES client(id) ON UPDATE CASCADE ON DELETE RESTRICT,
                    FOREIGN KEY(id_house) REFERENCES house(id) ON UPDATE CASCADE ON DELETE RESTRICT
                );
                
                -- Copiar datos existentes
                INSERT INTO contract_new SELECT * FROM contract;
                
                -- Eliminar tabla antigua y renombrar
                DROP TABLE contract;
                ALTER TABLE contract_new RENAME TO contract;
                
                -- Recrear índices
                CREATE INDEX IF NOT EXISTS idx_contract_id_client ON contract(id_client);
                CREATE INDEX IF NOT EXISTS idx_contract_id_house ON contract(id_house);
            "#,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 5,
            description: "fix_payment_foreign_keys",
            sql: r#"
                -- Crear tabla payment temporal con foreign keys correctas
                CREATE TABLE payment_new (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    id_contract INTEGER NOT NULL,
                    date DATETIME NOT NULL,
                    value_total INTEGER NOT NULL DEFAULT 0,
                    remaining_debt INTEGER NOT NULL DEFAULT 0,
                    reconnection INTEGER NOT NULL DEFAULT 0,
                    enrollment INTEGER NOT NULL DEFAULT 0,
                    monthly_payment INTEGER NOT NULL DEFAULT 0,
                    amount_monthly INTEGER NOT NULL DEFAULT 0,
                    monthly_type_amount TEXT NOT NULL DEFAULT 'FIXED',
                    payments INTEGER NOT NULL DEFAULT 0,
                    late_fee INTEGER NOT NULL DEFAULT 0,
                    other_charges INTEGER NOT NULL DEFAULT 0,
                    payment_state TEXT NOT NULL DEFAULT 'PENDIENTE',
                    description TEXT,
                    date_payment DATETIME,
                    FOREIGN KEY(id_contract) REFERENCES contract(id) ON UPDATE CASCADE ON DELETE CASCADE
                );
                
                -- Copiar datos existentes
                INSERT INTO payment_new SELECT * FROM payment;
                
                -- Eliminar tabla antigua y renombrar
                DROP TABLE payment;
                ALTER TABLE payment_new RENAME TO payment;
                
                -- Recrear índices
                CREATE INDEX IF NOT EXISTS idx_payment_id_contract ON payment(id_contract);
            "#,
            kind: MigrationKind::Up,
        },
        Migration {
            version: 6,
            description: "ensure_foreign_keys_enabled",
            sql: r#"
                -- Asegurar que las foreign keys estén habilitadas
                PRAGMA foreign_keys = ON;
                
                -- Verificar integridad de las foreign keys existentes
                PRAGMA foreign_key_check;
            "#,
            kind: MigrationKind::Up,
        }
    ];
    migrations
}
