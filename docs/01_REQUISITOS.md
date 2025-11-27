# 📋 Documento de Requisitos - Plataforma de Citas Médicas

**Versión:** 1.0  
**Fecha:** Noviembre 2025  
**Estado:** Activo

---

## 📑 Índice

1. [Introducción](#1-introducción)
2. [Requisitos Funcionales](#2-requisitos-funcionales)
3. [Requisitos No Funcionales](#3-requisitos-no-funcionales)
4. [Reglas de Negocio](#4-reglas-de-negocio)
5. [Matriz de Trazabilidad](#5-matriz-de-trazabilidad)
6. [Priorización](#6-priorización)

---

## 1. Introducción

### 1.1 Propósito

Este documento especifica los requisitos funcionales y no funcionales de la Plataforma de Citas Médicas, sirviendo como referencia para el diseño, implementación y validación del sistema.

### 1.2 Alcance

El sistema cubre:
- Gestión de usuarios (registro, autenticación, roles)
- Gestión de citas médicas (creación, modificación, cancelación)
- Dashboards específicos por rol
- Administración de centros médicos

### 1.3 Definiciones y Acrónimos

| Término | Definición |
|---------|------------|
| RF | Requisito Funcional |
| RNF | Requisito No Funcional |
| API | Application Programming Interface |
| JWT | JSON Web Token |
| CRUD | Create, Read, Update, Delete |

---

## 2. Requisitos Funcionales

### 2.1 Módulo de Autenticación

#### RF-AUTH-001: Registro de Usuario

| Campo | Valor |
|-------|-------|
| **ID** | RF-AUTH-001 |
| **Nombre** | Registro de Usuario |
| **Descripción** | El sistema debe permitir el registro de nuevos usuarios con validación de datos |
| **Actor** | Usuario no registrado |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] El usuario puede introducir: nombre, email, contraseña, teléfono
- [ ] El email debe ser único en el sistema
- [ ] La contraseña debe cumplir política de seguridad (mín. 8 caracteres, mayúscula, número)
- [ ] Se envía confirmación de registro exitoso
- [ ] Los datos se almacenan de forma segura (contraseña hasheada)

**Datos de Entrada:**
| Campo | Tipo | Obligatorio | Validación |
|-------|------|-------------|------------|
| nombre | String | Sí | 2-100 caracteres |
| email | String | Sí | Formato email válido |
| password | String | Sí | Mín. 8 caracteres |
| telefono | String | No | Formato telefónico |

---

#### RF-AUTH-002: Inicio de Sesión

| Campo | Valor |
|-------|-------|
| **ID** | RF-AUTH-002 |
| **Nombre** | Inicio de Sesión |
| **Descripción** | El sistema debe autenticar usuarios mediante email y contraseña |
| **Actor** | Usuario registrado |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] El usuario introduce email y contraseña
- [ ] El sistema valida las credenciales
- [ ] En caso de éxito, se genera y devuelve un token JWT
- [ ] El usuario es redirigido al dashboard correspondiente a su rol
- [ ] En caso de error, se muestra mensaje genérico (sin revelar si el email existe)

---

#### RF-AUTH-003: Cierre de Sesión

| Campo | Valor |
|-------|-------|
| **ID** | RF-AUTH-003 |
| **Nombre** | Cierre de Sesión (Logout) |
| **Descripción** | El sistema debe permitir cerrar sesión de forma segura |
| **Actor** | Usuario autenticado |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] El token JWT se invalida/elimina del cliente
- [ ] El usuario es redirigido a la página de inicio
- [ ] No se puede acceder a rutas protegidas después del logout

---

#### RF-AUTH-004: Recuperación de Contraseña

| Campo | Valor |
|-------|-------|
| **ID** | RF-AUTH-004 |
| **Nombre** | Recuperación de Contraseña |
| **Descripción** | El sistema debe permitir recuperar contraseña olvidada |
| **Actor** | Usuario registrado |
| **Prioridad** | Media |
| **Estado** | ⏳ Pendiente |

**Criterios de Aceptación:**
- [ ] El usuario introduce su email
- [ ] Se envía enlace de recuperación (válido 24h)
- [ ] El usuario puede establecer nueva contraseña
- [ ] Se notifica el cambio de contraseña

---

### 2.2 Módulo de Gestión de Citas

#### RF-CITA-001: Crear Cita

| Campo | Valor |
|-------|-------|
| **ID** | RF-CITA-001 |
| **Nombre** | Crear Nueva Cita |
| **Descripción** | El sistema debe permitir a los pacientes solicitar citas médicas |
| **Actor** | Paciente |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] El paciente puede seleccionar especialidad médica
- [ ] El paciente puede seleccionar médico disponible
- [ ] El paciente puede seleccionar fecha y hora disponible
- [ ] Se valida que no exista conflicto de horarios
- [ ] Se genera confirmación de la cita

**Datos de Entrada:**
| Campo | Tipo | Obligatorio | Validación |
|-------|------|-------------|------------|
| especialidad | String | Sí | Valor de lista |
| medico_id | ObjectId | Sí | Médico existente |
| fecha | Date | Sí | Fecha futura |
| hora | String | Sí | Horario disponible |
| motivo | String | No | Máx. 500 caracteres |

---

#### RF-CITA-002: Listar Citas

| Campo | Valor |
|-------|-------|
| **ID** | RF-CITA-002 |
| **Nombre** | Listar Citas |
| **Descripción** | El sistema debe mostrar las citas del usuario según su rol |
| **Actor** | Paciente, Médico, Administrador |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] Paciente ve sus propias citas
- [ ] Médico ve citas asignadas a él
- [ ] Administrador ve todas las citas del centro
- [ ] Las citas se pueden filtrar por fecha, estado
- [ ] Se muestra información relevante (fecha, hora, médico/paciente, estado)

---

#### RF-CITA-003: Cancelar Cita

| Campo | Valor |
|-------|-------|
| **ID** | RF-CITA-003 |
| **Nombre** | Cancelar Cita |
| **Descripción** | El sistema debe permitir cancelar citas existentes |
| **Actor** | Paciente, Médico, Administrador |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] Solo se pueden cancelar citas futuras
- [ ] Se requiere confirmación antes de cancelar
- [ ] Se notifica a las partes afectadas
- [ ] El horario queda disponible nuevamente

---

#### RF-CITA-004: Modificar Cita

| Campo | Valor |
|-------|-------|
| **ID** | RF-CITA-004 |
| **Nombre** | Modificar Cita |
| **Descripción** | El sistema debe permitir modificar fecha/hora de citas |
| **Actor** | Paciente, Administrador |
| **Prioridad** | Media |
| **Estado** | ⏳ Pendiente |

**Criterios de Aceptación:**
- [ ] Solo se pueden modificar citas futuras
- [ ] Se valida disponibilidad del nuevo horario
- [ ] Se notifica el cambio a todas las partes

---

### 2.3 Módulo de Dashboards

#### RF-DASH-001: Dashboard de Paciente

| Campo | Valor |
|-------|-------|
| **ID** | RF-DASH-001 |
| **Nombre** | Dashboard de Paciente |
| **Descripción** | Interfaz personalizada para pacientes |
| **Actor** | Paciente |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] Muestra próximas citas del paciente
- [ ] Permite acceder a historial de citas
- [ ] Permite solicitar nueva cita
- [ ] Muestra notificaciones relevantes

---

#### RF-DASH-002: Dashboard de Médico

| Campo | Valor |
|-------|-------|
| **ID** | RF-DASH-002 |
| **Nombre** | Dashboard de Médico |
| **Descripción** | Interfaz personalizada para médicos |
| **Actor** | Médico |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] Muestra agenda del día/semana
- [ ] Lista pacientes con citas programadas
- [ ] Permite ver historial de pacientes
- [ ] Permite gestionar disponibilidad

---

#### RF-DASH-003: Dashboard de Administrador

| Campo | Valor |
|-------|-------|
| **ID** | RF-DASH-003 |
| **Nombre** | Dashboard de Administrador |
| **Descripción** | Interfaz para administración del sistema |
| **Actor** | Administrador |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] Gestión de usuarios (CRUD)
- [ ] Gestión de médicos y especialidades
- [ ] Estadísticas del sistema
- [ ] Configuración general

---

#### RF-DASH-004: Dashboard de Centro Médico

| Campo | Valor |
|-------|-------|
| **ID** | RF-DASH-004 |
| **Nombre** | Dashboard de Centro Médico |
| **Descripción** | Interfaz para administradores de centros médicos |
| **Actor** | Administrador de Centro |
| **Prioridad** | Media |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] Gestión de médicos del centro
- [ ] Estadísticas del centro
- [ ] Configuración de horarios
- [ ] Gestión de especialidades disponibles

---

### 2.4 Módulo de Usuarios

#### RF-USER-001: Gestión de Perfil

| Campo | Valor |
|-------|-------|
| **ID** | RF-USER-001 |
| **Nombre** | Gestión de Perfil de Usuario |
| **Descripción** | El usuario puede ver y modificar sus datos personales |
| **Actor** | Usuario autenticado |
| **Prioridad** | Media |
| **Estado** | ⏳ Pendiente |

**Criterios de Aceptación:**
- [ ] El usuario puede ver sus datos actuales
- [ ] El usuario puede modificar: nombre, teléfono, foto
- [ ] El email no se puede modificar directamente
- [ ] Los cambios requieren confirmación

---

#### RF-USER-002: Gestión de Usuarios (Admin)

| Campo | Valor |
|-------|-------|
| **ID** | RF-USER-002 |
| **Nombre** | Gestión de Usuarios por Administrador |
| **Descripción** | El administrador puede gestionar todos los usuarios |
| **Actor** | Administrador |
| **Prioridad** | Alta |
| **Estado** | ✅ Implementado |

**Criterios de Aceptación:**
- [ ] Listar todos los usuarios
- [ ] Filtrar por rol, estado
- [ ] Activar/desactivar usuarios
- [ ] Modificar roles de usuario
- [ ] Ver historial de actividad

---

### 2.5 Módulo de Notificaciones

#### RF-NOTIF-001: Notificaciones de Citas

| Campo | Valor |
|-------|-------|
| **ID** | RF-NOTIF-001 |
| **Nombre** | Notificaciones de Citas |
| **Descripción** | El sistema envía notificaciones sobre citas |
| **Actor** | Sistema |
| **Prioridad** | Media |
| **Estado** | ⏳ Pendiente |

**Criterios de Aceptación:**
- [ ] Notificación al crear cita
- [ ] Recordatorio 24h antes de la cita
- [ ] Notificación al cancelar/modificar cita
- [ ] El usuario puede configurar preferencias de notificación

---

## 3. Requisitos No Funcionales

### 3.1 Rendimiento

| ID | Requisito | Métrica | Prioridad |
|----|-----------|---------|-----------|
| RNF-PERF-001 | Tiempo de respuesta API | < 500ms para 95% de requests | Alta |
| RNF-PERF-002 | Tiempo de carga de página | < 3 segundos | Alta |
| RNF-PERF-003 | Usuarios concurrentes | Soportar 100 usuarios simultáneos | Media |
| RNF-PERF-004 | Throughput | 50 requests/segundo | Media |

### 3.2 Seguridad

| ID | Requisito | Métrica | Prioridad |
|----|-----------|---------|-----------|
| RNF-SEC-001 | Autenticación | JWT con expiración configurable | Alta |
| RNF-SEC-002 | Contraseñas | Hash bcrypt con salt (10 rounds) | Alta |
| RNF-SEC-003 | HTTPS | TLS 1.2+ en producción | Alta |
| RNF-SEC-004 | CORS | Configuración restrictiva | Alta |
| RNF-SEC-005 | Rate Limiting | Máx. 100 requests/15 min por IP | Alta |
| RNF-SEC-006 | XSS Protection | Sanitización de inputs | Alta |
| RNF-SEC-007 | CSRF Protection | Tokens CSRF en formularios | Media |

### 3.3 Disponibilidad

| ID | Requisito | Métrica | Prioridad |
|----|-----------|---------|-----------|
| RNF-DISP-001 | Uptime | 99.5% disponibilidad mensual | Alta |
| RNF-DISP-002 | Recovery Time | RTO < 4 horas | Media |
| RNF-DISP-003 | Backup | Backups diarios automatizados | Alta |

### 3.4 Usabilidad

| ID | Requisito | Métrica | Prioridad |
|----|-----------|---------|-----------|
| RNF-USA-001 | Responsive | Soporte móvil, tablet, desktop | Alta |
| RNF-USA-002 | Accesibilidad | WCAG 2.1 nivel AA | Media |
| RNF-USA-003 | Idioma | Español como idioma principal | Alta |
| RNF-USA-004 | Navegadores | Chrome, Firefox, Safari, Edge | Alta |

### 3.5 Escalabilidad

| ID | Requisito | Métrica | Prioridad |
|----|-----------|---------|-----------|
| RNF-ESC-001 | Horizontal | Arquitectura stateless | Media |
| RNF-ESC-002 | Base de datos | Soporte para sharding | Baja |
| RNF-ESC-003 | CDN | Assets estáticos en CDN | Baja |

### 3.6 Mantenibilidad

| ID | Requisito | Métrica | Prioridad |
|----|-----------|---------|-----------|
| RNF-MANT-001 | Documentación | Código documentado (JSDoc) | Media |
| RNF-MANT-002 | Testing | Cobertura > 70% | Alta |
| RNF-MANT-003 | Linting | ESLint sin errores | Alta |
| RNF-MANT-004 | CI/CD | Pipeline automatizado | Alta |

---

## 4. Reglas de Negocio

### 4.1 Reglas de Citas

| ID | Regla | Descripción |
|----|-------|-------------|
| RN-001 | Anticipación mínima | Las citas deben solicitarse con al menos 24 horas de anticipación |
| RN-002 | Cancelación | Las citas solo pueden cancelarse hasta 12 horas antes |
| RN-003 | Citas simultáneas | Un paciente no puede tener dos citas en el mismo horario |
| RN-004 | Duración estándar | Las citas tienen una duración estándar de 30 minutos |
| RN-005 | Horario laboral | Las citas solo pueden programarse en horario laboral (8:00-20:00) |

### 4.2 Reglas de Usuarios

| ID | Regla | Descripción |
|----|-------|-------------|
| RN-101 | Email único | No pueden existir dos usuarios con el mismo email |
| RN-102 | Rol inicial | Los nuevos registros son pacientes por defecto |
| RN-103 | Cambio de rol | Solo administradores pueden cambiar roles |
| RN-104 | Desactivación | Usuarios desactivados no pueden iniciar sesión |

---

## 5. Matriz de Trazabilidad

### 5.1 Requisitos vs Casos de Uso

| Requisito | CU-001 | CU-002 | CU-003 | CU-004 | CU-005 |
|-----------|--------|--------|--------|--------|--------|
| RF-AUTH-001 | ✅ | | | | |
| RF-AUTH-002 | | ✅ | | | |
| RF-AUTH-003 | | ✅ | | | |
| RF-CITA-001 | | | ✅ | | |
| RF-CITA-002 | | | | ✅ | |
| RF-CITA-003 | | | | | ✅ |

**Leyenda de Casos de Uso:**
- CU-001: Registro de Usuario
- CU-002: Autenticación
- CU-003: Reservar Cita
- CU-004: Consultar Citas
- CU-005: Cancelar Cita

### 5.2 Requisitos vs Componentes

| Requisito | Backend | Frontend | Base de Datos |
|-----------|---------|----------|---------------|
| RF-AUTH-001 | ✅ | ✅ | ✅ |
| RF-AUTH-002 | ✅ | ✅ | ✅ |
| RF-CITA-001 | ✅ | ✅ | ✅ |
| RF-DASH-001 | | ✅ | |
| RNF-SEC-001 | ✅ | | |

---

## 6. Priorización

### 6.1 Matriz MoSCoW

| Must Have | Should Have | Could Have | Won't Have (v1) |
|-----------|-------------|------------|-----------------|
| RF-AUTH-001 | RF-USER-001 | RF-NOTIF-001 | Videoconsulta |
| RF-AUTH-002 | RF-CITA-004 | Exportar PDF | Chat en vivo |
| RF-AUTH-003 | RF-AUTH-004 | Calendario sync | Pagos online |
| RF-CITA-001 | | Dark mode | |
| RF-CITA-002 | | | |
| RF-CITA-003 | | | |
| RF-DASH-001 | | | |
| RF-DASH-002 | | | |
| RF-DASH-003 | | | |

### 6.2 Estimación de Esfuerzo (Story Points - Fibonacci)

| Requisito | Story Points | Justificación |
|-----------|--------------|---------------|
| RF-AUTH-001 | 5 | Incluye validaciones y hash de contraseña |
| RF-AUTH-002 | 5 | JWT, manejo de sesiones |
| RF-AUTH-003 | 2 | Limpieza de token, redirección |
| RF-CITA-001 | 8 | Lógica compleja de disponibilidad |
| RF-CITA-002 | 3 | Consultas con filtros |
| RF-CITA-003 | 3 | Validaciones de tiempo |
| RF-DASH-001 | 5 | UI compleja, integración API |
| RF-DASH-002 | 5 | Similar a dashboard paciente |
| RF-DASH-003 | 8 | Más funcionalidades admin |

---

## Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | Nov 2025 | Equipo | Versión inicial |

---

**Documentos relacionados:**
- [02_UML.md](02_UML.md) - Diagramas UML
- [03_ARQUITECTURA.md](03_ARQUITECTURA.md) - Arquitectura del sistema
- [04_PLAN_PRUEBAS.md](04_PLAN_PRUEBAS.md) - Plan de pruebas
