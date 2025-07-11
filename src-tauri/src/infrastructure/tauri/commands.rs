use jsonwebtoken::{encode, Header, EncodingKey};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    username: String,
    name: String,
    exp: usize,  
}

const BCRYPT_COST: u32 = 12;

#[tauri::command]
pub fn hash_password(password: &str) -> Result<String, String> {
    bcrypt::hash(password, BCRYPT_COST).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn verify_password_and_create_token(password: &str, hash: &str, username: &str, name: &str) -> Result<String, String> {
    // Verifica si la contraseña coincide con el hash de la BD
    let matches = bcrypt::verify(password, hash).map_err(|e| e.to_string())?;

    if !matches {
        return Err("Credenciales inválidas".to_string());
    }

    // Crea el token (JWT)
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::days(7))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        username: username.to_string(),
        name: name.to_string(),
        exp: expiration as usize,
    };
    
    let secret = "KENT_TEMP_KEY"; //TODO: Reemplaza con clave secreta real

    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref()))
        .map_err(|e| e.to_string())?;

    Ok(token)
}