# 🧪 Plan de Pruebas - Plataforma de Citas Médicas

**Versión:** 1.0  
**Fecha:** Noviembre 2025  
**Estado:** Activo

---

## 📑 Índice

1. [Introducción](#1-introducción)
2. [Estrategia de Pruebas](#2-estrategia-de-pruebas)
3. [Tipos de Pruebas](#3-tipos-de-pruebas)
4. [Casos de Prueba](#4-casos-de-prueba)
5. [Pruebas de Aceptación de Usuario (UAT)](#5-pruebas-de-aceptación-de-usuario-uat)
6. [Pruebas de Aceptación Operacional (OAT)](#6-pruebas-de-aceptación-operacional-oat)
7. [Matriz de Pruebas](#7-matriz-de-pruebas)
8. [Criterios de Aceptación](#8-criterios-de-aceptación)
9. [Herramientas y Entorno](#9-herramientas-y-entorno)
10. [Métricas y Reportes](#10-métricas-y-reportes)

---

## 1. Introducción

### 1.1 Propósito

Este documento define el plan de pruebas para la Plataforma de Citas Médicas, incluyendo estrategia, tipos de pruebas, casos de prueba y criterios de aceptación.

### 1.2 Alcance

El plan cubre:
- Pruebas unitarias de backend y frontend
- Pruebas de integración
- Pruebas end-to-end (E2E)
- Pruebas de aceptación de usuario (UAT)
- Pruebas de aceptación operacional (OAT)

### 1.3 Responsabilidades

| Rol | Responsable | Actividades |
|-----|-------------|-------------|
| QA Lead | Julio | Planificación, supervisión |
| Tester | Julio | Ejecución de pruebas |
| Desarrolladores | Bons, Javier | Pruebas unitarias |
| Product Owner | Javier | Validación UAT |

---

## 2. Estrategia de Pruebas

### 2.1 Enfoque

Se utilizará una estrategia de pruebas en pirámide:

```
                    /\
                   /  \
                  / E2E \
                 /------\
                /Integration\
               /------------\
              /    Unit Tests \
             /------------------\
```

| Nivel | Cantidad | Velocidad | Costo |
|-------|----------|-----------|-------|
| E2E | Pocas | Lento | Alto |
| Integración | Moderadas | Medio | Medio |
| Unitarias | Muchas | Rápido | Bajo |

### 2.2 Criterios de Entrada

- [ ] Código fuente disponible en repositorio
- [ ] Entorno de pruebas configurado
- [ ] Datos de prueba preparados
- [ ] Documentación de requisitos disponible

### 2.3 Criterios de Salida

- [ ] 100% casos de prueba ejecutados
- [ ] 0 defectos críticos abiertos
- [ ] Cobertura de código > 70%
- [ ] Todas las pruebas UAT aprobadas

### 2.4 Gestión de Defectos

| Severidad | Descripción | Tiempo de resolución |
|-----------|-------------|---------------------|
| Crítica | Sistema no funciona | 4 horas |
| Alta | Funcionalidad principal afectada | 24 horas |
| Media | Funcionalidad secundaria afectada | 48 horas |
| Baja | Defecto cosmético | Siguiente sprint |

---

## 3. Tipos de Pruebas

### 3.1 Pruebas Unitarias

**Objetivo:** Verificar que cada unidad de código funciona correctamente de forma aislada.

**Alcance:**
- Funciones de utilidad
- Modelos de datos
- Controladores
- Middlewares

**Herramientas:**
- Jest (Node.js)
- Supertest (API testing)

**Ejemplo:**
```javascript
// Ejemplo conceptual - test de validación de email
describe('Validación de Email', () => {
    test('email válido retorna true', () => {
        expect(isValidEmail('user@example.com')).toBe(true);
    });
    
    test('email inválido retorna false', () => {
        expect(isValidEmail('invalid-email')).toBe(false);
    });
});
```

### 3.2 Pruebas de Integración

**Objetivo:** Verificar que los componentes funcionan correctamente juntos.

**Alcance:**
- API endpoints
- Conexión a base de datos
- Autenticación completa

**Herramientas:**
- Supertest
- MongoDB Memory Server

### 3.3 Pruebas End-to-End (E2E)

**Objetivo:** Verificar flujos completos desde la perspectiva del usuario.

**Alcance:**
- Flujo de registro
- Flujo de login
- Flujo de reserva de cita
- Flujo de cancelación

**Herramientas:**
- Playwright / Cypress

### 3.4 Pruebas de Rendimiento

**Objetivo:** Verificar que el sistema cumple requisitos de rendimiento.

**Métricas:**
- Tiempo de respuesta < 500ms
- 100 usuarios concurrentes
- 50 requests/segundo

**Herramientas:**
- k6
- Artillery

### 3.5 Pruebas de Seguridad

**Objetivo:** Identificar vulnerabilidades de seguridad.

**Alcance:**
- Inyección SQL/NoSQL
- XSS
- CSRF
- Autenticación/Autorización

**Herramientas:**
- OWASP ZAP
- npm audit

---

## 4. Casos de Prueba

### 4.1 Módulo de Autenticación

#### CP-AUTH-001: Registro de Usuario Exitoso

| Campo | Valor |
|-------|-------|
| **ID** | CP-AUTH-001 |
| **Módulo** | Autenticación |
| **Título** | Registro de usuario exitoso |
| **Prioridad** | Alta |
| **Precondiciones** | Usuario no registrado |

**Pasos:**
| # | Acción | Datos | Resultado Esperado |
|---|--------|-------|-------------------|
| 1 | Acceder a página de registro | - | Se muestra formulario |
| 2 | Completar nombre | "Juan Pérez" | Campo aceptado |
| 3 | Completar email | "juan@example.com" | Campo aceptado |
| 4 | Completar contraseña | "Password123!" | Campo aceptado |
| 5 | Confirmar contraseña | "Password123!" | Campo aceptado |
| 6 | Hacer clic en "Registrar" | - | Usuario creado, redirige a login |

**Postcondiciones:** Usuario registrado en el sistema

---

#### CP-AUTH-002: Login Exitoso

| Campo | Valor |
|-------|-------|
| **ID** | CP-AUTH-002 |
| **Módulo** | Autenticación |
| **Título** | Inicio de sesión exitoso |
| **Prioridad** | Alta |
| **Precondiciones** | Usuario registrado |

**Pasos:**
| # | Acción | Datos | Resultado Esperado |
|---|--------|-------|-------------------|
| 1 | Acceder a página de login | - | Se muestra formulario |
| 2 | Introducir email | "maria.lopez@example.test" | Campo aceptado |
| 3 | Introducir contraseña | "Paciente123!" | Campo aceptado |
| 4 | Hacer clic en "Iniciar Sesión" | - | Login exitoso |
| 5 | Verificar redirección | - | Redirige a dashboard de paciente |

**Postcondiciones:** Usuario autenticado con sesión activa

---

#### CP-AUTH-003: Login con Credenciales Inválidas

| Campo | Valor |
|-------|-------|
| **ID** | CP-AUTH-003 |
| **Módulo** | Autenticación |
| **Título** | Login fallido por credenciales incorrectas |
| **Prioridad** | Alta |
| **Precondiciones** | - |

**Pasos:**
| # | Acción | Datos | Resultado Esperado |
|---|--------|-------|-------------------|
| 1 | Acceder a página de login | - | Se muestra formulario |
| 2 | Introducir email | "usuario@invalid.com" | Campo aceptado |
| 3 | Introducir contraseña | "wrongpassword" | Campo aceptado |
| 4 | Hacer clic en "Iniciar Sesión" | - | Error mostrado |
| 5 | Verificar mensaje | - | "Credenciales inválidas" (mensaje genérico) |

**Postcondiciones:** Usuario no autenticado

---

#### CP-AUTH-004: Logout

| Campo | Valor |
|-------|-------|
| **ID** | CP-AUTH-004 |
| **Módulo** | Autenticación |
| **Título** | Cierre de sesión exitoso |
| **Prioridad** | Alta |
| **Precondiciones** | Usuario autenticado |

**Pasos:**
| # | Acción | Datos | Resultado Esperado |
|---|--------|-------|-------------------|
| 1 | Usuario en dashboard | - | Dashboard visible |
| 2 | Hacer clic en "Cerrar Sesión" | - | Sesión terminada |
| 3 | Verificar redirección | - | Redirige a página principal |
| 4 | Intentar acceder a dashboard | - | Redirige a login |

**Postcondiciones:** Sesión eliminada, token invalidado

---

### 4.2 Módulo de Citas

#### CP-CITA-001: Crear Cita Exitosa

| Campo | Valor |
|-------|-------|
| **ID** | CP-CITA-001 |
| **Módulo** | Citas |
| **Título** | Reserva de cita médica exitosa |
| **Prioridad** | Alta |
| **Precondiciones** | Usuario autenticado como paciente |

**Pasos:**
| # | Acción | Datos | Resultado Esperado |
|---|--------|-------|-------------------|
| 1 | Acceder a "Nueva Cita" | - | Se muestra formulario |
| 2 | Seleccionar especialidad | "Medicina General" | Se cargan médicos |
| 3 | Seleccionar médico | "Dr. Carlos Ruiz" | Se carga calendario |
| 4 | Seleccionar fecha | Fecha futura | Se muestran horarios |
| 5 | Seleccionar hora | "10:00" | Hora seleccionada |
| 6 | Introducir motivo | "Consulta general" | Campo aceptado |
| 7 | Confirmar reserva | - | Cita creada |
| 8 | Verificar confirmación | - | Muestra número de cita |

**Postcondiciones:** Cita registrada en el sistema

---

#### CP-CITA-002: Ver Lista de Citas

| Campo | Valor |
|-------|-------|
| **ID** | CP-CITA-002 |
| **Módulo** | Citas |
| **Título** | Visualización de citas del paciente |
| **Prioridad** | Alta |
| **Precondiciones** | Usuario autenticado con citas previas |

**Pasos:**
| # | Acción | Datos | Resultado Esperado |
|---|--------|-------|-------------------|
| 1 | Acceder a "Mis Citas" | - | Se muestra lista |
| 2 | Verificar contenido | - | Lista con citas del usuario |
| 3 | Verificar información | - | Fecha, hora, médico, estado |
| 4 | Aplicar filtro por estado | "Pendiente" | Solo citas pendientes |

**Postcondiciones:** Lista de citas correctamente mostrada

---

#### CP-CITA-003: Cancelar Cita

| Campo | Valor |
|-------|-------|
| **ID** | CP-CITA-003 |
| **Módulo** | Citas |
| **Título** | Cancelación de cita existente |
| **Prioridad** | Alta |
| **Precondiciones** | Usuario con cita futura (>12h) |

**Pasos:**
| # | Acción | Datos | Resultado Esperado |
|---|--------|-------|-------------------|
| 1 | Acceder a "Mis Citas" | - | Lista de citas |
| 2 | Seleccionar cita a cancelar | - | Cita seleccionada |
| 3 | Hacer clic en "Cancelar" | - | Diálogo de confirmación |
| 4 | Confirmar cancelación | - | Cita cancelada |
| 5 | Verificar estado | - | Estado: "Cancelada" |

**Postcondiciones:** Cita marcada como cancelada

---

### 4.3 Módulo de Dashboards

#### CP-DASH-001: Acceso a Dashboard por Rol

| Campo | Valor |
|-------|-------|
| **ID** | CP-DASH-001 |
| **Módulo** | Dashboards |
| **Título** | Redirección a dashboard según rol |
| **Prioridad** | Alta |

**Escenarios:**

| Rol | Credenciales | Dashboard Esperado |
|-----|--------------|-------------------|
| Paciente | maria.lopez@example.test | patient_dashboard.html |
| Médico | carlos.ruiz@med.example.test | doctor_dashboard.html |
| Admin Sistema | admin@platform.example.test | administrator_dashboard.html |
| Admin Centro | laura.martinez@hospital.example.test | medical_center_dashboard.html |

---

#### CP-DASH-002: Protección de Rutas

| Campo | Valor |
|-------|-------|
| **ID** | CP-DASH-002 |
| **Módulo** | Seguridad |
| **Título** | Acceso no autorizado a dashboards |
| **Prioridad** | Alta |
| **Precondiciones** | Usuario no autenticado |

**Pasos:**
| # | Acción | Datos | Resultado Esperado |
|---|--------|-------|-------------------|
| 1 | Acceder directamente a URL | `/patient_dashboard.html` | Redirige a login |
| 2 | Acceder directamente a URL | `/doctor_dashboard.html` | Redirige a login |
| 3 | Acceder directamente a URL | `/administrator_dashboard.html` | Redirige a login |

**Postcondiciones:** Acceso denegado correctamente

---

## 5. Pruebas de Aceptación de Usuario (UAT)

### 5.1 Plan UAT

| Aspecto | Descripción |
|---------|-------------|
| **Duración** | 3-5 días |
| **Participantes** | Usuarios representativos de cada rol |
| **Entorno** | Staging (pre-producción) |
| **Método** | Ejecución de escenarios + feedback |

### 5.2 Escenarios UAT

#### UAT-001: Flujo Completo de Paciente

**Objetivo:** Validar experiencia completa del paciente

**Escenario:**
1. Registrarse como nuevo paciente
2. Iniciar sesión
3. Explorar dashboard
4. Buscar médicos disponibles
5. Reservar una cita
6. Ver confirmación de cita
7. Cancelar la cita
8. Cerrar sesión

**Criterio de Éxito:** Todas las acciones completadas sin errores

---

#### UAT-002: Flujo Completo de Médico

**Objetivo:** Validar experiencia del médico

**Escenario:**
1. Iniciar sesión como médico
2. Ver agenda del día
3. Ver lista de pacientes
4. Revisar historial de un paciente
5. Cerrar sesión

**Criterio de Éxito:** Todas las acciones completadas sin errores

---

#### UAT-003: Flujo de Administrador

**Objetivo:** Validar funciones administrativas

**Escenario:**
1. Iniciar sesión como admin
2. Ver lista de usuarios
3. Crear nuevo médico
4. Ver estadísticas del sistema
5. Cerrar sesión

**Criterio de Éxito:** Todas las acciones completadas sin errores

---

### 5.3 Formulario de Feedback UAT

| Campo | Descripción |
|-------|-------------|
| Escenario | ID del escenario |
| Tester | Nombre del usuario |
| Fecha | Fecha de ejecución |
| Resultado | Pasó / Falló / Bloqueado |
| Comentarios | Observaciones del usuario |
| Defectos | IDs de defectos encontrados |
| Calificación UX | 1-5 estrellas |

---

## 6. Pruebas de Aceptación Operacional (OAT)

### 6.1 Plan OAT

| Aspecto | Descripción |
|---------|-------------|
| **Objetivo** | Validar que el sistema cumple requisitos operacionales |
| **Responsable** | Bons (DevOps) |
| **Entorno** | Producción / Staging |

### 6.2 Checklist OAT

#### Instalación y Configuración

- [ ] El sistema se instala correctamente
- [ ] Las variables de entorno se configuran correctamente
- [ ] La conexión a base de datos funciona
- [ ] Los logs se generan correctamente

#### Rendimiento

- [ ] Tiempo de respuesta < 500ms (95th percentile)
- [ ] El sistema soporta 100 usuarios concurrentes
- [ ] No hay memory leaks detectados

#### Disponibilidad

- [ ] El sistema responde a health checks
- [ ] Recovery automático funciona
- [ ] Backups se ejecutan correctamente

#### Seguridad

- [ ] HTTPS configurado correctamente
- [ ] Headers de seguridad presentes
- [ ] Rate limiting funciona
- [ ] Sin vulnerabilidades críticas (npm audit)

#### Monitorización

- [ ] Logs accesibles
- [ ] Alertas configuradas
- [ ] Métricas de rendimiento disponibles

---

## 7. Matriz de Pruebas

### 7.1 Matriz de Trazabilidad

| Requisito | Casos de Prueba | Cobertura |
|-----------|-----------------|-----------|
| RF-AUTH-001 | CP-AUTH-001 | ✅ |
| RF-AUTH-002 | CP-AUTH-002, CP-AUTH-003 | ✅ |
| RF-AUTH-003 | CP-AUTH-004 | ✅ |
| RF-CITA-001 | CP-CITA-001 | ✅ |
| RF-CITA-002 | CP-CITA-002 | ✅ |
| RF-CITA-003 | CP-CITA-003 | ✅ |
| RF-DASH-001 | CP-DASH-001 | ✅ |
| RF-DASH-002 | CP-DASH-001 | ✅ |
| RF-DASH-003 | CP-DASH-001 | ✅ |
| RNF-SEC-001 | CP-DASH-002 | ✅ |

### 7.2 Matriz de Roles vs Funcionalidades

| Funcionalidad | Paciente | Médico | Admin | Admin Centro |
|---------------|----------|--------|-------|--------------|
| Registro | ✅ | ❌ | ❌ | ❌ |
| Login | ✅ | ✅ | ✅ | ✅ |
| Ver Dashboard | ✅ | ✅ | ✅ | ✅ |
| Crear Cita | ✅ | ❌ | ✅ | ✅ |
| Ver Citas | ✅ (propias) | ✅ (asignadas) | ✅ (todas) | ✅ (centro) |
| Cancelar Cita | ✅ | ✅ | ✅ | ✅ |
| Gestionar Usuarios | ❌ | ❌ | ✅ | ❌ |
| Ver Estadísticas | ❌ | ❌ | ✅ | ✅ |

---

## 8. Criterios de Aceptación

### 8.1 Criterios Generales

| Criterio | Umbral |
|----------|--------|
| Casos de prueba ejecutados | 100% |
| Casos de prueba pasados | > 95% |
| Defectos críticos | 0 |
| Defectos altos | < 3 |
| Cobertura de código | > 70% |
| Tiempo de respuesta API | < 500ms |
| Disponibilidad en pruebas | > 99% |

### 8.2 Criterios por Módulo

#### Autenticación
- [ ] Registro funciona correctamente
- [ ] Login/Logout funcionan
- [ ] Tokens JWT se generan y validan
- [ ] Sesiones expiran correctamente

#### Citas
- [ ] Se pueden crear citas
- [ ] Se pueden ver citas
- [ ] Se pueden cancelar citas
- [ ] Validaciones de horario funcionan

#### Dashboards
- [ ] Cada rol ve su dashboard
- [ ] Rutas protegidas funcionan
- [ ] Datos se cargan correctamente

---

## 9. Herramientas y Entorno

### 9.1 Herramientas de Testing

| Herramienta | Propósito | Versión |
|-------------|-----------|---------|
| Jest | Unit testing | 29.x |
| Supertest | API testing | 6.x |
| Playwright | E2E testing | 1.x |
| k6 | Load testing | 0.45.x |

### 9.2 Entorno de Pruebas

| Aspecto | Configuración |
|---------|---------------|
| Sistema Operativo | Ubuntu 22.04 |
| Node.js | 18.x LTS |
| MongoDB | 6.x (Memory Server para tests) |
| Navegadores | Chrome, Firefox, Safari |

### 9.3 Datos de Prueba

**Usuarios de prueba:**

| Rol | Email | Contraseña |
|-----|-------|------------|
| Paciente | maria.lopez@example.test | Paciente123! |
| Médico | carlos.ruiz@med.example.test | Doctor2025! |
| Admin Sistema | admin@platform.example.test | AdminMaster!2025 |
| Admin Centro | laura.martinez@hospital.example.test | CentroAdmin2025! |

---

## 10. Métricas y Reportes

### 10.1 Métricas a Recopilar

| Métrica | Descripción | Frecuencia |
|---------|-------------|------------|
| Casos ejecutados | Total de casos ejecutados | Diaria |
| Tasa de éxito | % de casos pasados | Diaria |
| Defectos encontrados | Total por severidad | Diaria |
| Cobertura de código | % de código testeado | Por build |
| Tiempo de ejecución | Duración total de suite | Por ejecución |

### 10.2 Plantilla de Reporte

```markdown
# Reporte de Pruebas - [Fecha]

## Resumen Ejecutivo
- Total casos: XX
- Pasados: XX (XX%)
- Fallidos: XX (XX%)
- Bloqueados: XX (XX%)

## Defectos Encontrados
| ID | Severidad | Módulo | Estado |
|----|-----------|--------|--------|
| DEF-001 | Alta | Auth | Abierto |

## Cobertura
- Backend: XX%
- Frontend: XX%

## Próximos Pasos
- [ ] Acción 1
- [ ] Acción 2
```

---

## Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | Nov 2025 | Julio | Versión inicial |

---

**Documentos relacionados:**
- [01_REQUISITOS.md](01_REQUISITOS.md) - Requisitos del sistema
- [06_GUIA_DEMO.md](06_GUIA_DEMO.md) - Guía de demostración
