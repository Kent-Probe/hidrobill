-- Tabla de clients
CREATE TABLE IF NOT EXISTS client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document TEXT NOT NULL UNIQUE,
    names TEXT NOT NULL,
    lastnames TEXT NOT NULL,
    phone TEXT,
    state TEXT NOT NULL DEFAULT 'Al dia',
    gender TEXT NOT NULL DEFAULT 'MASCULINO',
    created_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- Tabla de House
CREATE TABLE IF NOT EXISTS house (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    direction TEXT NOT NULL UNIQUE,
    neighborhood TEXT,
    description TEXT,
    colorChip TEXT NOT NULL DEFAULT 'green',
    created_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime')),
    updated_at DATETIME NOT NULL DEFAULT (datetime('now', 'localtime'))
);

-- Tabla de Contracts
CREATE TABLE IF NOT EXISTS contract (
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
    FOREIGN KEY(id_client) REFERENCES client(id),
    FOREIGN KEY(id_house) REFERENCES house(id)
);

-- Tabla de Pagos
CREATE TABLE IF NOT EXISTS payment (
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
    FOREIGN KEY(id_contract) REFERENCES contract(id) ON DELETE CASCADE
);

CREATE TABLE USER (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    username TEXT NOT NULL UNIQUE, 
    password TEXT, 
    state TEXT NOT NULL DEFAULT 'inactivo'
); 

-- Índices para valores únicos
CREATE INDEX IF NOT EXISTS idx_client_document ON client(document);
CREATE INDEX IF NOT EXISTS idx_house_direction ON house(direction);
CREATE INDEX IF NOT EXISTS idx_user_username ON user(username);

-- Índices para names y lastnames de client
CREATE INDEX IF NOT EXISTS idx_client_names ON client(names);
CREATE INDEX IF NOT EXISTS idx_client_lastnames ON client(lastnames);

-- Índices adicionales para foreign keys (recomendado)
CREATE INDEX IF NOT EXISTS idx_contract_id_client ON contract(id_client);
CREATE INDEX IF NOT EXISTS idx_contract_id_house ON contract(id_house);
CREATE INDEX IF NOT EXISTS idx_payment_id_contract ON payment(id_contract);

-- INSERT INTO USER (name, username, password, state) VALUES ('Admin', 'admin', '$2b$12$9t/UG.tjW4mEXyCxFF1HMO0s75quMG6MmYeSWpPkNQt.qceVAduz.', 'activo');