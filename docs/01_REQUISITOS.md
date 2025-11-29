# Especificación de Requisitos del Software

## Plataforma de Citas Médicas

---

## Índice

1. [Introducción](#1-introducción)
2. [Descripción General](#2-descripción-general)
3. [Requisitos Funcionales](#3-requisitos-funcionales)
4. [Requisitos No Funcionales](#4-requisitos-no-funcionales)
5. [Casos de Uso](#5-casos-de-uso)
6. [Restricciones del Sistema](#6-restricciones-del-sistema)
7. [Trazabilidad de Requisitos](#7-trazabilidad-de-requisitos)
8. [Glosario](#8-glosario)

---

## 1. Introducción

### 1.1 Propósito

Este documento especifica los requisitos funcionales y no funcionales para la Plataforma de Citas Médicas. Está dirigido al equipo de desarrollo, stakeholders y personal de QA.

**Issues relacionados:** #1, #2, #3, #4

### 1.2 Alcance

El sistema proporcionará:
- Gestión de usuarios y autenticación
- Reserva y administración de citas médicas
- Paneles de control para diferentes roles
- Sistema de notificaciones
- Análisis y reportes

### 1.3 Definiciones y Acrónimos

| Término | Definición |
|---|---|
| API | Application Programming Interface |
| JWT | JSON Web Token |
| CRUD | Create, Read, Update, Delete |
| SRS | Software Requirements Specification |
| UI | User Interface |
| UX | User Experience |

### 1.4 Referencias

| ID | Documento | Descripción |
|---|---|---|
| REF-001 | [00_MEMORIA_ING_SOFT.md](./00_MEMORIA_ING_SOFT.md) | Memoria del proyecto |
| REF-002 | [02_UML.md](./02_UML.md) | Diagramas UML |
| REF-003 | IEEE 830-1998 | Estándar para SRS |

---

## 2. Descripción General

### 2.1 Perspectiva del Producto

La plataforma es un sistema web independiente que permite la gestión integral de citas médicas. Se compone de:

- **Frontend**: Aplicación web responsive (HTML/CSS/JavaScript)
- **Backend**: API REST (Node.js/Express)
- **Base de datos**: MongoDB
- **Despliegue**: Vercel (frontend), servicio cloud (backend)

### 2.2 Funciones del Producto

| ID | Función | Descripción |
|---|---|---|
| F-001 | Autenticación | Login, registro, recuperación de contraseña |
| F-002 | Gestión de citas | Crear, ver, modificar, cancelar citas |
| F-003 | Dashboard paciente | Vista personalizada para pacientes |
| F-004 | Dashboard médico | Vista personalizada para médicos |
| F-005 | Dashboard admin | Panel de administración general |
| F-006 | Notificaciones | Alertas y recordatorios |
| F-007 | Análisis | Estadísticas y reportes |
| F-008 | Pagos | Procesamiento de pagos online |

### 2.3 Características de los Usuarios

| Tipo Usuario | Descripción | Conocimientos |
|---|---|---|
| Paciente | Usuario final que solicita citas | Básicos de navegación web |
| Médico | Profesional de la salud | Intermedios de tecnología |
| Administrador | Gestiona el sistema | Avanzados de tecnología |
| Centro médico | Gestiona su centro | Intermedios de tecnología |

### 2.4 Restricciones

- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)
- Responsive design para dispositivos móviles
- Tiempo de respuesta < 3 segundos
- Disponibilidad 99%

### 2.5 Suposiciones y Dependencias

| ID | Suposición/Dependencia |
|---|---|
| A-001 | Los usuarios tienen acceso a internet |
| A-002 | Los navegadores soportan JavaScript ES6+ |
| D-001 | MongoDB Atlas disponible como servicio |
| D-002 | Vercel disponible para despliegue |

---

## 3. Requisitos Funcionales

### 3.1 Módulo de Autenticación

**Issue relacionado:** #5, #6

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-001 | El sistema debe permitir el registro de nuevos usuarios | Alta | ⏳ |
| RF-002 | El sistema debe autenticar usuarios mediante email y contraseña | Alta | ⏳ |
| RF-003 | El sistema debe permitir la recuperación de contraseña | Media | ⏳ |
| RF-004 | El sistema debe manejar sesiones mediante JWT | Alta | ⏳ |
| RF-005 | El sistema debe validar el formato del email | Alta | ⏳ |
| RF-006 | El sistema debe requerir contraseñas seguras (mínimo 8 caracteres) | Alta | ⏳ |

### 3.2 Módulo de Gestión de Citas

**Issue relacionado:** #7, #8

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-007 | El sistema debe permitir crear nuevas citas | Alta | ⏳ |
| RF-008 | El sistema debe mostrar disponibilidad de médicos | Alta | ⏳ |
| RF-009 | El sistema debe permitir cancelar citas | Alta | ⏳ |
| RF-010 | El sistema debe permitir reprogramar citas | Media | ⏳ |
| RF-011 | El sistema debe enviar confirmación de cita | Alta | ⏳ |
| RF-012 | El sistema debe prevenir citas duplicadas | Alta | ⏳ |

### 3.3 Dashboard de Paciente

**Issue relacionado:** #9

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-013 | El dashboard debe mostrar próximas citas del paciente | Alta | ⏳ |
| RF-014 | El dashboard debe mostrar historial de citas | Media | ⏳ |
| RF-015 | El dashboard debe permitir acceso a perfil | Media | ⏳ |
| RF-016 | El dashboard debe mostrar notificaciones pendientes | Media | ⏳ |

### 3.4 Dashboard de Médico

**Issue relacionado:** #10

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-017 | El dashboard debe mostrar agenda del día | Alta | ⏳ |
| RF-018 | El dashboard debe mostrar lista de pacientes | Alta | ⏳ |
| RF-019 | El dashboard debe permitir gestionar disponibilidad | Alta | ⏳ |
| RF-020 | El dashboard debe mostrar estadísticas de citas | Media | ⏳ |

### 3.5 Dashboard de Administrador

**Issue relacionado:** #11

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-021 | El dashboard debe permitir gestión de usuarios | Alta | ⏳ |
| RF-022 | El dashboard debe permitir gestión de centros | Alta | ⏳ |
| RF-023 | El dashboard debe mostrar métricas del sistema | Media | ⏳ |
| RF-024 | El dashboard debe permitir configuración general | Media | ⏳ |

### 3.6 Sistema de Notificaciones

**Issue relacionado:** #12

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-025 | El sistema debe enviar recordatorios de citas | Alta | ⏳ |
| RF-026 | El sistema debe notificar cambios en citas | Alta | ⏳ |
| RF-027 | El sistema debe permitir configurar preferencias | Media | ⏳ |
| RF-028 | El sistema debe mostrar centro de notificaciones | Media | ⏳ |

### 3.7 Módulo de Análisis

**Issue relacionado:** #13

| ID | Requisito | Prioridad | Estado |
|---|---|---|---|
| RF-029 | El sistema debe generar reportes de citas | Media | ⏳ |
| RF-030 | El sistema debe mostrar estadísticas de uso | Media | ⏳ |
| RF-031 | El sistema debe exportar datos a CSV | Baja | ⏳ |
| RF-032 | El sistema debe mostrar gráficos interactivos | Baja | ⏳ |

---

## 4. Requisitos No Funcionales

### 4.1 Rendimiento

| ID | Requisito | Métrica | Estado |
|---|---|---|---|
| RNF-001 | Tiempo de carga inicial < 3s | Lighthouse score > 80 | ⏳ |
| RNF-002 | Tiempo de respuesta API < 500ms | 95th percentile | ⏳ |
| RNF-003 | Soporte de 100 usuarios concurrentes | Load testing | ⏳ |

### 4.2 Seguridad

| ID | Requisito | Implementación | Estado |
|---|---|---|---|
| RNF-004 | Autenticación segura | JWT con expiración | ⏳ |
| RNF-005 | Encriptación de contraseñas | bcrypt | ⏳ |
| RNF-006 | Protección CORS | Configuración Express | ⏳ |
| RNF-007 | Validación de entrada | Middleware de validación | ⏳ |
| RNF-008 | HTTPS obligatorio | SSL/TLS | ⏳ |

### 4.3 Usabilidad

| ID | Requisito | Criterio | Estado |
|---|---|---|---|
| RNF-009 | Interfaz intuitiva | SUS score > 70 | ⏳ |
| RNF-010 | Diseño responsive | Mobile-first | ⏳ |
| RNF-011 | Accesibilidad WCAG 2.1 AA | Auditoría automated | ⏳ |
| RNF-012 | Feedback visual | Loading states, errores | ⏳ |

### 4.4 Mantenibilidad

| ID | Requisito | Implementación | Estado |
|---|---|---|---|
| RNF-013 | Código documentado | JSDoc comments | ⏳ |
| RNF-014 | Arquitectura modular | Separación de concerns | ⏳ |
| RNF-015 | Versionado semántico | Git tags | ⏳ |
| RNF-016 | Logs estructurados | Winston/Morgan | ⏳ |

### 4.5 Portabilidad

| ID | Requisito | Soporte | Estado |
|---|---|---|---|
| RNF-017 | Chrome | v90+ | ⏳ |
| RNF-018 | Firefox | v88+ | ⏳ |
| RNF-019 | Safari | v14+ | ⏳ |
| RNF-020 | Edge | v90+ | ⏳ |
| RNF-021 | Mobile browsers | iOS Safari, Chrome Android | ⏳ |

---

## 5. Casos de Uso

### 5.1 Diagrama de Casos de Uso (Referencia)

Ver documento [02_UML.md](./02_UML.md) para diagramas detallados.

### 5.2 Especificación de Casos de Uso

#### CU-001: Registrar Usuario

| Campo | Descripción |
|---|---|
| **ID** | CU-001 |
| **Nombre** | Registrar Usuario |
| **Actor** | Usuario no registrado |
| **Precondición** | El usuario no tiene cuenta en el sistema |
| **Flujo Principal** | 1. Usuario accede a página de registro<br>2. Usuario completa formulario<br>3. Sistema valida datos<br>4. Sistema crea cuenta<br>5. Sistema envía confirmación |
| **Flujo Alternativo** | 3a. Datos inválidos: mostrar errores |
| **Postcondición** | Usuario registrado en el sistema |

#### CU-002: Iniciar Sesión

| Campo | Descripción |
|---|---|
| **ID** | CU-002 |
| **Nombre** | Iniciar Sesión |
| **Actor** | Usuario registrado |
| **Precondición** | Usuario tiene cuenta activa |
| **Flujo Principal** | 1. Usuario accede a login<br>2. Usuario ingresa credenciales<br>3. Sistema valida credenciales<br>4. Sistema genera token JWT<br>5. Redirige a dashboard |
| **Flujo Alternativo** | 3a. Credenciales inválidas: mostrar error |
| **Postcondición** | Sesión activa con token válido |

#### CU-003: Reservar Cita

| Campo | Descripción |
|---|---|
| **ID** | CU-003 |
| **Nombre** | Reservar Cita |
| **Actor** | Paciente |
| **Precondición** | Paciente autenticado |
| **Flujo Principal** | 1. Paciente selecciona especialidad<br>2. Sistema muestra médicos disponibles<br>3. Paciente selecciona médico y fecha<br>4. Sistema verifica disponibilidad<br>5. Sistema confirma reserva |
| **Flujo Alternativo** | 4a. No hay disponibilidad: mostrar alternativas |
| **Postcondición** | Cita registrada en el sistema |

#### CU-004: Gestionar Agenda (Médico)

| Campo | Descripción |
|---|---|
| **ID** | CU-004 |
| **Nombre** | Gestionar Agenda |
| **Actor** | Médico |
| **Precondición** | Médico autenticado |
| **Flujo Principal** | 1. Médico accede a agenda<br>2. Sistema muestra citas del día<br>3. Médico puede marcar como atendida/cancelada<br>4. Sistema actualiza estado |
| **Flujo Alternativo** | N/A |
| **Postcondición** | Agenda actualizada |

#### CU-005: Administrar Sistema

| Campo | Descripción |
|---|---|
| **ID** | CU-005 |
| **Nombre** | Administrar Sistema |
| **Actor** | Administrador |
| **Precondición** | Admin autenticado |
| **Flujo Principal** | 1. Admin accede a panel<br>2. Admin gestiona usuarios/centros<br>3. Sistema aplica cambios<br>4. Sistema registra auditoría |
| **Flujo Alternativo** | N/A |
| **Postcondición** | Sistema configurado |

---

## 6. Restricciones del Sistema

### 6.1 Restricciones Técnicas

| ID | Restricción | Justificación |
|---|---|---|
| RT-001 | Node.js v18+ | Soporte LTS |
| RT-002 | MongoDB 6+ | Features requeridos |
| RT-003 | ES6+ JavaScript | Compatibilidad moderna |
| RT-004 | Tailwind CSS | Framework UI |

### 6.2 Restricciones de Negocio

| ID | Restricción | Descripción |
|---|---|---|
| RN-001 | Horario de citas | 8:00 - 20:00 |
| RN-002 | Cancelación mínima | 24 horas antes |
| RN-003 | Máximo citas por paciente | 5 activas simultáneas |
| RN-004 | Duración estándar | 30 minutos por cita |

---

## 7. Trazabilidad de Requisitos

### 7.1 Matriz de Trazabilidad Requisitos-Issues

| Requisito | Issue | Sprint | Responsable |
|---|---|---|---|
| RF-001 a RF-006 | #5, #6 | Sprint 3 | Bons |
| RF-007 a RF-012 | #7, #8 | Sprint 3 | Bons |
| RF-013 a RF-016 | #9 | Sprint 3 | Javier |
| RF-017 a RF-020 | #10 | Sprint 3 | Javier |
| RF-021 a RF-024 | #11 | Sprint 3 | Javier |
| RF-025 a RF-028 | #12 | Sprint 3 | Javier |
| RF-029 a RF-032 | #13 | Sprint 3 | Javier |

### 7.2 Matriz de Trazabilidad Requisitos-Pruebas

| Requisito | Caso de Prueba | Tipo | Issue |
|---|---|---|---|
| RF-001 | TC-001 | Unitario, E2E | #14, #17 |
| RF-002 | TC-002 | Unitario, E2E | #14, #17 |
| RF-007 | TC-003 | Unitario, Integración | #14, #15 |
| RNF-001 | TC-P001 | Performance | #16 |
| RNF-004 | TC-S001 | Seguridad | #16 |

Ver documento [04_PLAN_PRUEBAS.md](./04_PLAN_PRUEBAS.md) para detalles completos.

---

## 8. Glosario

| Término | Definición |
|---|---|
| API | Interfaz de programación de aplicaciones |
| Backend | Parte del servidor de la aplicación |
| Dashboard | Panel de control con información resumida |
| Frontend | Interfaz de usuario de la aplicación |
| JWT | Token JSON para autenticación |
| Sprint | Iteración de desarrollo en SCRUM |
| Stakeholder | Parte interesada en el proyecto |

---

## Historial de Versiones

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2024-XX-XX | David | Versión inicial |

---

*Documento basado en IEEE 830-1998*
