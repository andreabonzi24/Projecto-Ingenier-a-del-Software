# Plan de Pruebas

## Plataforma de Citas Médicas

---

## Índice

1. [Introducción](#1-introducción)
2. [Estrategia de Pruebas](#2-estrategia-de-pruebas)
3. [Tipos de Pruebas](#3-tipos-de-pruebas)
4. [Casos de Prueba](#4-casos-de-prueba)
5. [Matriz de Pruebas](#5-matriz-de-pruebas)
6. [Criterios de Aceptación](#6-criterios-de-aceptación)
7. [Entorno de Pruebas](#7-entorno-de-pruebas)
8. [Automatización](#8-automatización)
9. [Métricas y Reportes](#9-métricas-y-reportes)

---

## 1. Introducción

### 1.1 Propósito

Este documento define la estrategia y plan de pruebas para la Plataforma de Citas Médicas. Establece los tipos de pruebas, casos de prueba, criterios de aceptación y métricas de calidad.

**Issues relacionados:** #14, #15, #16, #17, #22, #23, #24, #25

### 1.2 Alcance

El plan de pruebas cubre:
- Pruebas unitarias (backend y frontend)
- Pruebas de integración
- Pruebas end-to-end (E2E)
- Pruebas de rendimiento
- Pruebas de seguridad
- Pruebas de usabilidad

### 1.3 Referencias

| ID | Documento | Descripción |
|---|---|---|
| REF-001 | [01_REQUISITOS.md](./01_REQUISITOS.md) | Requisitos a probar |
| REF-002 | [03_ARQUITECTURA.md](./03_ARQUITECTURA.md) | Arquitectura del sistema |
| REF-003 | IEEE 829-2008 | Estándar para documentación de pruebas |

---

## 2. Estrategia de Pruebas

### 2.1 Enfoque General

| Nivel | Tipo | Responsable | Automatización |
|---|---|---|---|
| Unitario | White-box | Desarrollador | 100% |
| Integración | Grey-box | Desarrollador | 80% |
| E2E | Black-box | QA | 60% |
| Manual | Black-box | QA | 0% |

### 2.2 Pirámide de Pruebas

```
          /\
         /  \        E2E (10%)
        /----\
       /      \      Integración (20%)
      /--------\
     /          \    Unitarias (70%)
    /______________\
```

### 2.3 Criterios de Entrada/Salida

#### Criterios de Entrada

| Criterio | Descripción |
|---|---|
| Código compilable | Build exitoso sin errores |
| Documentación | Requisitos documentados |
| Entorno | Test environment disponible |
| Datos | Test data preparados |

#### Criterios de Salida

| Criterio | Valor Mínimo |
|---|---|
| Cobertura de código | ≥80% |
| Casos pasados | ≥95% |
| Bugs críticos | 0 |
| Bugs mayores | <5 |

---

## 3. Tipos de Pruebas

### 3.1 Pruebas Unitarias

**Issue relacionado:** #14, #22

| Componente | Framework | Cobertura Objetivo |
|---|---|---|
| Backend Controllers | Jest | 90% |
| Backend Services | Jest | 90% |
| Backend Models | Jest | 85% |
| Frontend Modules | Jest | 80% |
| Utilidades | Jest | 95% |

### 3.2 Pruebas de Integración

**Issue relacionado:** #15, #23

| Integración | Descripción | Tipo |
|---|---|---|
| API + MongoDB | Operaciones CRUD completas | Automática |
| Auth + JWT | Flujo de autenticación | Automática |
| Frontend + API | Llamadas REST | Automática |
| Middleware chain | Request processing | Automática |

### 3.3 Pruebas End-to-End

**Issue relacionado:** #17, #25

| Flujo | Descripción | Herramienta |
|---|---|---|
| Registro usuario | Flujo completo de registro | Cypress/Playwright |
| Login usuario | Autenticación y dashboard | Cypress/Playwright |
| Reservar cita | Proceso completo de reserva | Cypress/Playwright |
| Cancelar cita | Cancelación y notificación | Cypress/Playwright |

### 3.4 Pruebas de Rendimiento

**Issue relacionado:** #16, #24

| Métrica | Objetivo | Herramienta |
|---|---|---|
| Tiempo de carga | <3s | Lighthouse |
| Tiempo respuesta API | <500ms | Artillery |
| Usuarios concurrentes | 100 | k6/Artillery |
| Throughput | 200 req/s | k6/Artillery |

### 3.5 Pruebas de Seguridad

**Issue relacionado:** #16

| Área | Prueba | Herramienta |
|---|---|---|
| Autenticación | Brute force protection | Manual/OWASP ZAP |
| Autorización | Role-based access | Jest |
| Input validation | SQL/NoSQL injection | OWASP ZAP |
| XSS | Script injection | OWASP ZAP |
| CORS | Origin validation | Manual |

---

## 4. Casos de Prueba

### 4.1 Módulo de Autenticación

#### TC-AUTH-001: Registro de Usuario Exitoso

| Campo | Valor |
|---|---|
| **ID** | TC-AUTH-001 |
| **Requisito** | RF-001 |
| **Prioridad** | Alta |
| **Precondición** | Email no registrado |
| **Datos de entrada** | name: "Test User", email: "test@example.com", password: "Test1234!", role: "patient" |
| **Pasos** | 1. Enviar POST /api/auth/register con datos<br>2. Verificar respuesta |
| **Resultado esperado** | Status 201, user object sin password |
| **Postcondición** | Usuario creado en BD |

#### TC-AUTH-002: Registro con Email Duplicado

| Campo | Valor |
|---|---|
| **ID** | TC-AUTH-002 |
| **Requisito** | RF-001 |
| **Prioridad** | Alta |
| **Precondición** | Email ya registrado |
| **Datos de entrada** | email existente |
| **Pasos** | 1. Enviar POST /api/auth/register<br>2. Verificar error |
| **Resultado esperado** | Status 409, error message |
| **Postcondición** | No se crea usuario duplicado |

#### TC-AUTH-003: Login Exitoso

| Campo | Valor |
|---|---|
| **ID** | TC-AUTH-003 |
| **Requisito** | RF-002 |
| **Prioridad** | Alta |
| **Precondición** | Usuario registrado |
| **Datos de entrada** | email, password válidos |
| **Pasos** | 1. Enviar POST /api/auth/login<br>2. Verificar token |
| **Resultado esperado** | Status 200, JWT token, user data |
| **Postcondición** | Sesión activa |

#### TC-AUTH-004: Login con Credenciales Inválidas

| Campo | Valor |
|---|---|
| **ID** | TC-AUTH-004 |
| **Requisito** | RF-002 |
| **Prioridad** | Alta |
| **Precondición** | Usuario registrado |
| **Datos de entrada** | password incorrecto |
| **Pasos** | 1. Enviar POST /api/auth/login<br>2. Verificar error |
| **Resultado esperado** | Status 401, error genérico |
| **Postcondición** | Sin sesión |

#### TC-AUTH-005: Acceso con Token Expirado

| Campo | Valor |
|---|---|
| **ID** | TC-AUTH-005 |
| **Requisito** | RF-004 |
| **Prioridad** | Alta |
| **Precondición** | Token expirado |
| **Datos de entrada** | Token JWT expirado |
| **Pasos** | 1. Enviar request con token expirado<br>2. Verificar error |
| **Resultado esperado** | Status 401, token expired |
| **Postcondición** | Redirección a login |

### 4.2 Módulo de Citas

#### TC-APPT-001: Crear Cita Exitosa

| Campo | Valor |
|---|---|
| **ID** | TC-APPT-001 |
| **Requisito** | RF-007 |
| **Prioridad** | Alta |
| **Precondición** | Usuario autenticado como paciente |
| **Datos de entrada** | doctorId, centerId, dateTime, reason |
| **Pasos** | 1. Verificar disponibilidad<br>2. Crear cita<br>3. Verificar confirmación |
| **Resultado esperado** | Status 201, appointment object |
| **Postcondición** | Cita creada, notificación enviada |

#### TC-APPT-002: Crear Cita con Conflicto de Horario

| Campo | Valor |
|---|---|
| **ID** | TC-APPT-002 |
| **Requisito** | RF-012 |
| **Prioridad** | Alta |
| **Precondición** | Horario ya ocupado |
| **Datos de entrada** | dateTime ocupado |
| **Pasos** | 1. Intentar crear cita en horario ocupado |
| **Resultado esperado** | Status 409, conflict error |
| **Postcondición** | Cita no creada |

#### TC-APPT-003: Cancelar Cita

| Campo | Valor |
|---|---|
| **ID** | TC-APPT-003 |
| **Requisito** | RF-009 |
| **Prioridad** | Alta |
| **Precondición** | Cita existente, >24h antes |
| **Datos de entrada** | appointmentId, reason |
| **Pasos** | 1. Cancelar cita<br>2. Verificar estado |
| **Resultado esperado** | Status 200, status: cancelled |
| **Postcondición** | Cita cancelada, notificación enviada |

#### TC-APPT-004: Cancelar Cita Tardía

| Campo | Valor |
|---|---|
| **ID** | TC-APPT-004 |
| **Requisito** | RF-009 |
| **Prioridad** | Media |
| **Precondición** | Cita en <24h |
| **Datos de entrada** | appointmentId |
| **Pasos** | 1. Intentar cancelar cita |
| **Resultado esperado** | Status 400, cancellation not allowed |
| **Postcondición** | Cita sin cambios |

### 4.3 Pruebas E2E

#### TC-E2E-001: Flujo Completo de Reserva

| Campo | Valor |
|---|---|
| **ID** | TC-E2E-001 |
| **Requisitos** | RF-001, RF-002, RF-007 |
| **Prioridad** | Alta |
| **Precondición** | Browser limpio |
| **Pasos** | 1. Navegar a registro<br>2. Completar registro<br>3. Login<br>4. Navegar a reservar cita<br>5. Seleccionar médico<br>6. Seleccionar fecha/hora<br>7. Confirmar<br>8. Verificar en dashboard |
| **Resultado esperado** | Cita visible en dashboard |
| **Duración estimada** | 2 minutos |

#### TC-E2E-002: Flujo de Médico - Gestión de Agenda

| Campo | Valor |
|---|---|
| **ID** | TC-E2E-002 |
| **Requisitos** | RF-017, RF-019 |
| **Prioridad** | Alta |
| **Precondición** | Médico con citas programadas |
| **Pasos** | 1. Login como médico<br>2. Ver agenda del día<br>3. Marcar cita como atendida<br>4. Verificar actualización |
| **Resultado esperado** | Cita marcada como completada |
| **Duración estimada** | 1 minuto |

---

## 5. Matriz de Pruebas

### 5.1 Matriz de Trazabilidad Requisitos-Pruebas

| Requisito | Caso de Prueba | Tipo | Estado |
|---|---|---|---|
| RF-001 | TC-AUTH-001, TC-AUTH-002 | Unit, Integration | ⏳ |
| RF-002 | TC-AUTH-003, TC-AUTH-004 | Unit, Integration | ⏳ |
| RF-004 | TC-AUTH-005 | Unit | ⏳ |
| RF-007 | TC-APPT-001 | Unit, Integration, E2E | ⏳ |
| RF-009 | TC-APPT-003, TC-APPT-004 | Unit, Integration | ⏳ |
| RF-012 | TC-APPT-002 | Unit, Integration | ⏳ |
| RF-013-016 | TC-DASH-* | E2E | ⏳ |
| RNF-001 | TC-PERF-001 | Performance | ⏳ |
| RNF-004-007 | TC-SEC-* | Security | ⏳ |

### 5.2 Matriz de Cobertura por Módulo

| Módulo | Unitarias | Integración | E2E | Total |
|---|---|---|---|---|
| Autenticación | 15 | 5 | 3 | 23 |
| Citas | 20 | 8 | 4 | 32 |
| Dashboard Paciente | 10 | 3 | 2 | 15 |
| Dashboard Médico | 10 | 3 | 2 | 15 |
| Dashboard Admin | 12 | 4 | 2 | 18 |
| Notificaciones | 8 | 3 | 1 | 12 |
| **Total** | **75** | **26** | **14** | **115** |

### 5.3 Matriz de Riesgos de Pruebas

| Área | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| Auth | Vulnerabilidades seguridad | Media | Alto | Pruebas de seguridad exhaustivas |
| Citas | Conflictos de concurrencia | Media | Alto | Pruebas de carga |
| DB | Corrupción de datos | Baja | Alto | Pruebas de integridad |
| UI | Incompatibilidad browsers | Media | Medio | Cross-browser testing |

---

## 6. Criterios de Aceptación

### 6.1 Criterios por Funcionalidad

#### Autenticación

| Criterio | Medida | Umbral |
|---|---|---|
| Registro exitoso | Tasa de éxito | 100% |
| Login seguro | Sin credenciales expuestas | 0 vulnerabilidades |
| Token válido | Verificación correcta | 100% |
| Password hash | bcrypt usado | Obligatorio |

#### Gestión de Citas

| Criterio | Medida | Umbral |
|---|---|---|
| Creación | Cita guardada correctamente | 100% |
| Validación | Conflictos detectados | 100% |
| Cancelación | Estado actualizado | 100% |
| Notificación | Email enviado | >95% |

### 6.2 Criterios No Funcionales

| Área | Criterio | Umbral |
|---|---|---|
| Rendimiento | Tiempo respuesta | <500ms |
| Disponibilidad | Uptime | >99% |
| Usabilidad | SUS Score | >70 |
| Accesibilidad | WCAG 2.1 | Nivel AA |
| Seguridad | OWASP Top 10 | 0 críticos |

---

## 7. Entorno de Pruebas

### 7.1 Configuración de Entornos

| Entorno | Propósito | Base de Datos | URL |
|---|---|---|---|
| Local | Desarrollo | MongoDB Local | localhost:3000 |
| Test | CI/CD | MongoDB Memory | CI Runner |
| Staging | QA | MongoDB Atlas (staging) | staging.example.com |
| Production | Live | MongoDB Atlas (prod) | app.example.com |

### 7.2 Datos de Prueba

| Tipo | Descripción | Cantidad |
|---|---|---|
| Usuarios paciente | Perfiles de pacientes | 10 |
| Usuarios médico | Perfiles de médicos | 5 |
| Usuarios admin | Perfiles administrativos | 2 |
| Centros | Centros médicos | 3 |
| Citas | Citas de prueba | 50 |

### 7.3 Herramientas

| Categoría | Herramienta | Uso |
|---|---|---|
| Unit Testing | Jest | Tests unitarios y de integración |
| E2E Testing | Cypress/Playwright | Tests end-to-end |
| API Testing | Supertest | Tests de API |
| Performance | Artillery/k6 | Tests de carga |
| Security | OWASP ZAP | Análisis de seguridad |
| Coverage | Istanbul/nyc | Cobertura de código |
| Mocking | Jest mocks | Simulación de dependencias |

---

## 8. Automatización

### 8.1 Pipeline de CI/CD

```yaml
# .github/workflows/ci.yml (referencia)
name: CI Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run lint
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e
```

### 8.2 Scripts de Prueba

| Script | Comando | Descripción |
|---|---|---|
| test | npm test | Todas las pruebas |
| test:unit | npm run test:unit | Solo unitarias |
| test:integration | npm run test:integration | Solo integración |
| test:e2e | npm run test:e2e | Solo E2E |
| test:coverage | npm run test:coverage | Con reporte de cobertura |
| test:watch | npm run test:watch | Modo watch |

### 8.3 Reporte de Cobertura

| Métrica | Objetivo | Actual |
|---|---|---|
| Statements | 80% | - |
| Branches | 75% | - |
| Functions | 80% | - |
| Lines | 80% | - |

---

## 9. Métricas y Reportes

### 9.1 Métricas de Calidad

| Métrica | Fórmula | Objetivo |
|---|---|---|
| Tasa de defectos | Bugs / KLOC | <5 |
| Densidad de defectos | Bugs / funcionalidad | <0.5 |
| Cobertura | Lines tested / Total lines | >80% |
| Efectividad | Bugs encontrados / Total bugs | >90% |

### 9.2 Reportes Generados

| Reporte | Frecuencia | Destinatario |
|---|---|---|
| Test Results | Por build | CI/CD |
| Coverage Report | Por build | Desarrolladores |
| Bug Report | Semanal | Product Owner |
| Quality Dashboard | Sprint | Stakeholders |

### 9.3 Template de Reporte de Bug

| Campo | Descripción |
|---|---|
| ID | Identificador único |
| Título | Descripción breve |
| Severidad | Crítico/Mayor/Menor/Trivial |
| Prioridad | Alta/Media/Baja |
| Componente | Módulo afectado |
| Pasos | Reproducción |
| Resultado esperado | Comportamiento correcto |
| Resultado actual | Comportamiento erróneo |
| Evidencia | Screenshots/logs |
| Entorno | Ambiente donde ocurre |

---

## Historial de Versiones

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2024-XX-XX | Julio | Versión inicial |

---

*Documento basado en IEEE 829-2008*
