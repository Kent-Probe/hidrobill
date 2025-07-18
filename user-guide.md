# 📖 Guía de Usuario - HidroBill

## Contenido

- [Primer Uso](#primer-uso)
- [Gestión de Clientes](#gestión-de-clientes)
- [Administración de Casas](#administración-de-casas)
- [Contratos](#contratos)
- [Pagos y Facturación](#pagos-y-facturación)
- [Generación de Recibos](#generación-de-recibos)

## Primer Uso

### Inicio de Sesión

1. Al abrir HidroBill por primera vez, verás la pantalla de login
2. Usa las credenciales por defecto:
   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
3. **¡Importante!**: Cambia estas credenciales inmediatamente después del primer login

### Cambiar Contraseña

1. Ve al menú **Configuración** → **Usuario**
2. Haz clic en **Cambiar Contraseña**
3. Ingresa la contraseña actual y la nueva contraseña
4. Confirma los cambios

## Gestión de Clientes

### Agregar Nuevo Cliente

1. Ve a **Clientes** en el menú principal
2. Haz clic en **+ Nuevo Cliente**
3. Completa la información requerida:
   - Nombre completo
   - Documento de identidad
   - Teléfono
   - Email (opcional)
4. Haz clic en **Guardar**

### Buscar Clientes

- Usa la barra de búsqueda en la parte superior
- Puedes buscar por nombre, documento o teléfono
- Los resultados se filtran automáticamente

### Editar Cliente

1. Encuentra el cliente en la lista
2. Haz clic en el ícono de **editar** (lápiz)
3. Modifica la información necesaria
4. Guarda los cambios

## Administración de Casas

### Registrar Nueva Casa

1. Ve a **Casas** en el menú principal
2. Haz clic en **+ Nueva Casa**
3. Ingresa:
   - Número de casa
   - Dirección completa
   - Barrio/Zona
   - Estado (Activa/Inactiva)

### Asignar Casa a Cliente

1. Selecciona la casa desde la lista
2. Haz clic en **Asignar Cliente**
3. Busca y selecciona el cliente
4. Confirma la asignación

## Contratos

### Crear Nuevo Contrato

1. Ve a **Contratos** → **Nuevo Contrato**
2. Selecciona:
   - Cliente
   - Casa
   - Fecha de inicio
   - Día de pago mensual
   - Monto mensual
   - Tipo de tarifa (Fija/Variable)

### Estados de Contrato

- **Activo**: Contrato vigente
- **Suspendido**: Temporalmente inactivo
- **Terminado**: Contrato finalizado

## Pagos y Facturación

### Registrar Pago

1. Ve a **Pagos** → **Nuevo Pago**
2. Selecciona el contrato
3. Ingresa:
   - Monto del pago mensual
   - Recargos (si aplica)
   - Otros cobros
   - Reconexiones
4. El sistema calculará automáticamente el total

### Tipos de Pago

- **Pago Mensual**: Tarifa regular del servicio
- **Reconexión**: Costo por reconectar el servicio
- **Recargos**: Multas por pago tardío
- **Otros Cobros**: Gastos adicionales

### Consultar Historial de Pagos

1. Ve a **Pagos** → **Historial**
2. Filtra por:
   - Cliente
   - Rango de fechas
   - Estado de pago

## Generación de Recibos

### Crear Recibo

1. Desde **Pagos**, selecciona el pago registrado
2. Haz clic en **Generar Recibo**
3. Revisa la información en la vista previa
4. Haz clic en **Imprimir** o **Guardar PDF**

### Personalizar Recibo

- El recibo incluye automáticamente:
  - Información del cliente
  - Datos de la casa
  - Desglose de pagos
  - Total a pagar
  - Información de contacto del acueducto

### Reimprimir Recibo

1. Ve al historial de pagos
2. Encuentra el pago deseado
3. Haz clic en **Reimprimir Recibo**

## Consejos y Buenas Prácticas

### Respaldos

- La base de datos se guarda automáticamente
- Ubicación: `%APPDATA%/hidrobill/database.db`
- Recomendación: Hacer copia de este archivo semanalmente

### Actualizaciones

- HidroBill se actualiza automáticamente
- Siempre acepta las actualizaciones para tener las últimas mejoras

### Rendimiento

- Cierra la aplicación completamente cuando no la uses
- Si la aplicación se vuelve lenta, reiníciala

## Preguntas Frecuentes

**¿Puedo tener múltiples contratos por cliente?**
Sí, un cliente puede tener contratos para diferentes casas.

**¿Cómo cambio la información del acueducto en los recibos?**
Ve a **Configuración** → **Información del Acueducto**.

**¿Puedo exportar la información?**
Actualmente no hay función de exportación, pero está planificada para futuras versiones.

**¿Qué hago si olvido mi contraseña?**
Contacta al administrador del sistema o reinstala la aplicación (perderás los datos).
