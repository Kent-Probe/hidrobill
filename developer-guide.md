# 🔧 Guía de Desarrollador - HidroBill

## Contenido

- [Configuración del Entorno](#configuración-del-entorno)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Base de Datos](#base-de-datos)
- [API Endpoints](#api-endpoints)
- [Construcción y Despliegue](#construcción-y-despliegue)
- [Contribuir](#contribuir)

## Configuración del Entorno

### Requisitos Previos

- **Node.js** 18+ y **bun**
- **Rust** 1.70+
- **Git**
- **Visual Studio Code** (recomendado)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Kent-Probe/hidrobill.git
cd hidrobill

# Instalar dependencias del frontend
bun install

# Instalar dependencias de Rust
cd src-tauri
cargo build

# Volver a la raíz y ejecutar en desarrollo
cd ..
bun run tauri dev
```
