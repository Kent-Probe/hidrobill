# 🚨 Solución de Problemas - HidroBill

## Problemas de Instalación

### "Windows protegió su PC"

**Síntoma**: Aparece advertencia al instalar
**Solución**:

1. Haz clic en "Más información"
2. Haz clic en "Ejecutar de todas formas"
3. Continúa con la instalación normal

### Error "No se puede instalar en esta versión de Windows"

**Síntoma**: El instalador no funciona
**Solución**:

- Verifica que tienes Windows 10 o superior
- Ejecuta el instalador como administrador
- Descarga nuevamente el instalador

### "Error de permisos durante la instalación"

**Síntoma**: Falla la instalación por permisos
**Solución**:

1. Clic derecho en el instalador → "Ejecutar como administrador"
2. Si persiste, desactiva temporalmente el antivirus
3. Reinstala después de reiniciar el PC

## Problemas de Inicio

### La aplicación no abre

**Síntoma**: HidroBill no inicia al hacer doble clic
**Solución**:

1. Reinicia el PC
2. Verifica que no esté ejecutándose en segundo plano (Task Manager)
3. Ejecuta como administrador
4. Reinstala la aplicación

### "Error de base de datos"

**Síntoma**: Mensaje de error al iniciar
**Solución**:

1. Cierra completamente HidroBill
2. Ve a `%APPDATA%/hidrobill/`
3. Renombra `database.db` a `database.db.backup`
4. Reinicia HidroBill (creará nueva base de datos)
5. Si necesitas recuperar datos, contacta soporte

### Pantalla en blanco al abrir

**Síntoma**: La aplicación abre pero no muestra contenido
**Solución**:

1. Presiona F5 para refrescar
2. Cierra y reabre la aplicación
3. Reinicia el PC
4. Actualiza los drivers de gráficos

## Problemas de Rendimiento

### La aplicación va lenta

**Síntoma**: HidroBill responde lentamente
**Solución**:

1. Cierra otros programas pesados
2. Reinicia HidroBill
3. Reinicia el PC
4. Verifica espacio libre en disco (mín. 1GB)

### Alto uso de memoria

**Síntoma**: HidroBill consume mucha RAM
**Solución**:

1. Cierra y reabre la aplicación
2. Reinicia el PC
3. Verifica que no hay múltiples instancias ejecutándose

### Base de datos grande/lenta

**Síntoma**: Consultas muy lentas con muchos registros
**Solución**:

1. Cierra HidroBill
2. Haz backup de la base de datos
3. Considera limpiar registros muy antiguos
4. Contacta soporte para optimización

## Problemas de Funcionalidad

### No puedo agregar clientes

**Síntoma**: Error al guardar nuevo cliente
**Solución**:

1. Verifica que todos los campos requeridos estén llenos
2. Revisa que el documento de identidad no esté duplicado
3. Reinicia la aplicación
4. Verifica permisos de escritura

### Los recibos no se imprimen

**Síntoma**: Error al generar o imprimir recibos
**Solución**:

1. Verifica que la impresora esté conectada y encendida
2. Instala/actualiza drivers de la impresora
3. Prueba imprimir desde otra aplicación
4. Intenta guardar como PDF primero

### Error al procesar pagos

**Síntoma**: No se pueden registrar pagos
**Solución**:

1. Verifica que el contrato esté activo
2. Revisa que los montos sean números válidos
3. Cierra y reabre la aplicación
4. Verifica la fecha del sistema

## Problemas de Actualización

### "Error al verificar actualizaciones"

**Síntoma**: No puede conectarse al servidor de actualizaciones
**Solución**:

1. Verifica tu conexión a internet
2. Desactiva temporalmente firewall/antivirus
3. Reinicia la aplicación
4. Intenta más tarde (puede ser problema del servidor)

### "Error al instalar actualización"

**Síntoma**: La actualización descarga pero no se instala
**Solución**:

1. Cierra completamente HidroBill
2. Ejecuta como administrador
3. Desactiva temporalmente antivirus
4. Descarga manualmente desde GitHub Releases

### Actualización se queda "colgada"

**Síntoma**: La actualización no progresa
**Solución**:

1. Espera 10 minutos (puede ser conexión lenta)
2. Cierra HidroBill desde Task Manager
3. Reinicia la aplicación
4. Intenta actualizar nuevamente

## Recuperación de Datos

### Cómo hacer backup

1. Cierra HidroBill completamente
2. Ve a `%APPDATA%/hidrobill/`
3. Copia el archivo `database.db` a lugar seguro
4. Guarda también `salt.txt` si existe

### Cómo restaurar backup

1. Cierra HidroBill
2. Ve a `%APPDATA%/hidrobill/`
3. Reemplaza `database.db` con tu backup
4. Reinicia HidroBill

### Datos corruptos

**Síntoma**: Errores extraños o datos faltantes
**Solución**:

1. Cierra HidroBill
2. Restaura backup más reciente
3. Si no tienes backup, contacta soporte
4. Como último recurso, reinstala (perderás datos)

## Información del Sistema

### Dónde encontrar logs

- Windows: `%APPDATA%/hidrobill/logs/`
- Incluye fecha y hora en el nombre del archivo

### Información para soporte

Cuando contactes soporte, incluye:

- Versión de HidroBill (Ayuda → Acerca de)
- Versión de Windows
- Descripción detallada del problema
- Pasos para reproducir el error
- Captura de pantalla del error

### Reinstalación limpia

1. Desinstala HidroBill desde Panel de Control
2. Elimina carpeta `%APPDATA%/hidrobill/` (⚠️ perderás datos)
3. Reinicia el PC
4. Descarga e instala la versión más reciente

## Contacto de Soporte

- 🐛 [Reportar Bug](https://github.com/Kent-Probe/hidrobill/issues)
- 📧 Email: [tu-email@ejemplo.com]
- 📞 Teléfono: [tu-número]

**¿No encuentras tu problema aquí?**
Crea un [issue en GitHub](https://github.com/Kent-Probe/hidrobill/issues) con todos los detalles.
