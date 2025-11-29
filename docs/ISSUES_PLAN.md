# 📋 Plan de Issues - Plataforma de Citas Médicas

**Proyecto:** Plataforma de Citas Médicas  
**Metodología:** SCRUM + XP  
**Sprints:** 4 (2 semanas cada uno)

---

## 👥 Asignaciones del Equipo

| Miembro | Rol Principal | Áreas de Responsabilidad |
|---------|---------------|--------------------------|
| **Javier** | Product Owner + Frontend | Frontend, UI/UX, Validación de requisitos |
| **David** | Analista | Análisis de requisitos, Diagramas UML |
| **Bons** | Arquitecto + DevOps | Backend, Arquitectura, CI/CD |
| **Julio** | QA Lead | Pruebas, Testing, Documentación de calidad |

---

## 📊 Cadena de Dependencias

```
Análisis → UML → Arquitectura → Implementación → Pruebas → Documentación → Presentación
```

---

## 🏷️ Labels Disponibles

- `analysis` - Análisis y especificación de requisitos
- `uml` - Diagramas UML
- `architecture` - Diseño arquitectónico
- `frontend` - Desarrollo de interfaz de usuario
- `backend` - Desarrollo del servidor y API
- `testing` - Pruebas y QA
- `documentation` - Documentación técnica y de usuario
- `ci-cd` - Integración y despliegue continuo

---

## 📝 Lista de Issues (28 Total)

### Sprint 1: Análisis y Diseño (Issues 1-8)

---

#### Issue #1: Levantamiento de requisitos funcionales
**Labels:** `analysis`  
**Asignado a:** David  
**Estimación:** 5 puntos  
**Bloqueado por:** Ninguno  
**Bloquea:** Issues #2, #3, #4

**Descripción:**
Realizar el levantamiento completo de los requisitos funcionales del sistema de citas médicas. Se deben identificar y documentar todas las funcionalidades necesarias para los diferentes roles de usuario (pacientes, médicos, administradores de centro, administradores de sistema).

**Subtareas:**
- [ ] Identificar actores del sistema
- [ ] Documentar requisitos de autenticación y autorización
- [ ] Documentar requisitos de gestión de citas
- [ ] Documentar requisitos de gestión de usuarios
- [ ] Documentar requisitos de gestión de centros médicos
- [ ] Documentar requisitos de notificaciones
- [ ] Documentar requisitos de reportes y analytics

**Criterios de Aceptación:**
- [ ] Documento de requisitos funcionales completo en formato Markdown
- [ ] Matriz de trazabilidad de requisitos
- [ ] Priorización MoSCoW de cada requisito
- [ ] Aprobación del Product Owner (Javier)

---

#### Issue #2: Levantamiento de requisitos no funcionales
**Labels:** `analysis`  
**Asignado a:** David  
**Estimación:** 3 puntos  
**Bloqueado por:** Issue #1  
**Bloquea:** Issue #5

**Descripción:**
Documentar todos los requisitos no funcionales del sistema incluyendo rendimiento, seguridad, usabilidad, disponibilidad y escalabilidad.

**Subtareas:**
- [ ] Definir requisitos de rendimiento (tiempos de respuesta)
- [ ] Definir requisitos de seguridad (autenticación, cifrado)
- [ ] Definir requisitos de usabilidad (accesibilidad WCAG)
- [ ] Definir requisitos de disponibilidad (uptime)
- [ ] Definir requisitos de escalabilidad
- [ ] Definir restricciones tecnológicas

**Criterios de Aceptación:**
- [ ] Documento de requisitos no funcionales con métricas medibles
- [ ] Criterios de aceptación para cada requisito
- [ ] Revisión y aprobación por el equipo técnico

---

#### Issue #3: Especificación de casos de uso principales
**Labels:** `analysis`  
**Asignado a:** David  
**Estimación:** 5 puntos  
**Bloqueado por:** Issue #1  
**Bloquea:** Issues #6, #7

**Descripción:**
Especificar detalladamente los casos de uso principales del sistema, incluyendo flujos normales, alternativos y excepciones.

**Subtareas:**
- [ ] CU-001: Registro de paciente
- [ ] CU-002: Inicio de sesión
- [ ] CU-003: Reservar cita médica
- [ ] CU-004: Cancelar cita
- [ ] CU-005: Ver historial de citas
- [ ] CU-006: Gestionar agenda médica
- [ ] CU-007: Administrar usuarios
- [ ] CU-008: Administrar centros médicos
- [ ] CU-009: Ver reportes y estadísticas

**Criterios de Aceptación:**
- [ ] Cada caso de uso con formato estándar (actores, precondiciones, postcondiciones, flujo principal, flujos alternativos)
- [ ] Diagramas de secuencia para casos de uso críticos
- [ ] Validación con stakeholders

---

#### Issue #4: Modelo de dominio y glosario
**Labels:** `analysis`  
**Asignado a:** David  
**Estimación:** 3 puntos  
**Bloqueado por:** Issue #1  
**Bloquea:** Issue #8

**Descripción:**
Crear el modelo de dominio del sistema identificando las entidades principales, sus atributos y relaciones. Incluir un glosario de términos del negocio.

**Subtareas:**
- [ ] Identificar entidades del dominio (Usuario, Cita, Centro, etc.)
- [ ] Definir atributos de cada entidad
- [ ] Establecer relaciones entre entidades
- [ ] Crear glosario de términos médicos y del sistema
- [ ] Validar modelo con expertos del dominio

**Criterios de Aceptación:**
- [ ] Diagrama de modelo de dominio en PlantUML
- [ ] Glosario con al menos 30 términos
- [ ] Documentación de cada entidad y sus responsabilidades

---

#### Issue #5: Diagrama de casos de uso UML
**Labels:** `uml`  
**Asignado a:** David  
**Estimación:** 5 puntos  
**Bloqueado por:** Issues #2, #3  
**Bloquea:** Issues #9, #10

**Descripción:**
Crear el diagrama de casos de uso UML completo del sistema, mostrando todos los actores y sus interacciones con el sistema.

**Subtareas:**
- [ ] Definir actores: Paciente, Médico, Admin Centro, Admin Sistema
- [ ] Crear casos de uso para módulo de autenticación
- [ ] Crear casos de uso para módulo de citas
- [ ] Crear casos de uso para módulo de gestión
- [ ] Crear casos de uso para módulo de reportes
- [ ] Incluir relaciones include y extend
- [ ] Generar diagrama en PlantUML

**Criterios de Aceptación:**
- [ ] Diagrama completo con todos los actores
- [ ] Relaciones correctamente modeladas
- [ ] Código fuente PlantUML incluido
- [ ] Imagen PNG/SVG exportada

---

#### Issue #6: Diagramas de secuencia UML
**Labels:** `uml`  
**Asignado a:** David  
**Estimación:** 8 puntos  
**Bloqueado por:** Issue #3  
**Bloquea:** Issue #11

**Descripción:**
Crear diagramas de secuencia UML para los flujos principales del sistema, mostrando la interacción entre objetos a lo largo del tiempo.

**Subtareas:**
- [ ] DS-001: Secuencia de login con JWT
- [ ] DS-002: Secuencia de registro de usuario
- [ ] DS-003: Secuencia de reserva de cita
- [ ] DS-004: Secuencia de cancelación de cita
- [ ] DS-005: Secuencia de consulta de citas
- [ ] DS-006: Secuencia de gestión de agenda médica

**Criterios de Aceptación:**
- [ ] Al menos 6 diagramas de secuencia
- [ ] Mensajes claramente etiquetados
- [ ] Código PlantUML incluido
- [ ] Consistencia con casos de uso

---

#### Issue #7: Diagrama de clases UML
**Labels:** `uml`  
**Asignado a:** David  
**Estimación:** 5 puntos  
**Bloqueado por:** Issue #3  
**Bloquea:** Issue #12

**Descripción:**
Crear el diagrama de clases UML del sistema, mostrando las clases principales, sus atributos, métodos y relaciones.

**Subtareas:**
- [ ] Clase User con herencia de roles
- [ ] Clase Appointment con estados
- [ ] Clase MedicalCenter
- [ ] Clase Schedule (agenda médica)
- [ ] Clase Notification
- [ ] Definir asociaciones, composiciones y herencias
- [ ] Incluir multiplicidades

**Criterios de Aceptación:**
- [ ] Diagrama con al menos 10 clases
- [ ] Atributos y métodos documentados
- [ ] Relaciones con multiplicidad
- [ ] Código PlantUML incluido

---

#### Issue #8: Diagrama entidad-relación (ERD)
**Labels:** `uml`, `architecture`  
**Asignado a:** David  
**Estimación:** 5 puntos  
**Bloqueado por:** Issue #4  
**Bloquea:** Issue #13

**Descripción:**
Crear el diagrama entidad-relación para la base de datos del sistema, definiendo tablas, campos y relaciones.

**Subtareas:**
- [ ] Entidad users con campos y tipos
- [ ] Entidad appointments con campos y tipos
- [ ] Entidad medical_centers con campos y tipos
- [ ] Entidad schedules con campos y tipos
- [ ] Entidad notifications con campos y tipos
- [ ] Definir claves primarias y foráneas
- [ ] Definir índices necesarios

**Criterios de Aceptación:**
- [ ] ERD completo en formato visual
- [ ] Scripts de creación de tablas (SQL o Mongoose schemas)
- [ ] Documentación de cada campo
- [ ] Normalización a 3FN

---

### Sprint 2: Arquitectura e Implementación Base (Issues 9-16)

---

#### Issue #9: Diseño de arquitectura del sistema
**Labels:** `architecture`  
**Asignado a:** Bons  
**Estimación:** 8 puntos  
**Bloqueado por:** Issue #5  
**Bloquea:** Issues #14, #15

**Descripción:**
Diseñar la arquitectura completa del sistema, incluyendo componentes frontend, backend, base de datos y servicios externos.

**Subtareas:**
- [ ] Diagrama de arquitectura de alto nivel
- [ ] Definir stack tecnológico (Node.js, Express, MongoDB, etc.)
- [ ] Diseñar estructura de carpetas del proyecto
- [ ] Definir patrones de diseño a utilizar (MVC, Repository, etc.)
- [ ] Diseñar flujo de autenticación con JWT
- [ ] Documentar decisiones de arquitectura (ADRs)

**Criterios de Aceptación:**
- [ ] Documento de arquitectura completo
- [ ] Diagramas de componentes y despliegue
- [ ] ADRs para decisiones críticas
- [ ] Revisión y aprobación del equipo

---

#### Issue #10: Diseño de API REST
**Labels:** `architecture`, `backend`  
**Asignado a:** Bons  
**Estimación:** 5 puntos  
**Bloqueado por:** Issue #5  
**Bloquea:** Issue #17

**Descripción:**
Diseñar la especificación completa de la API REST, incluyendo endpoints, métodos, parámetros y respuestas.

**Subtareas:**
- [ ] Documentar endpoints de autenticación
- [ ] Documentar endpoints de usuarios
- [ ] Documentar endpoints de citas
- [ ] Documentar endpoints de centros médicos
- [ ] Documentar endpoints de notificaciones
- [ ] Definir códigos de error estándar
- [ ] Crear colección Postman

**Criterios de Aceptación:**
- [ ] Especificación OpenAPI/Swagger completa
- [ ] Ejemplos de request/response para cada endpoint
- [ ] Colección Postman importable
- [ ] Documentación de autenticación

---

#### Issue #11: Diseño de interfaz de usuario (wireframes)
**Labels:** `frontend`  
**Asignado a:** Javier  
**Estimación:** 8 puntos  
**Bloqueado por:** Issue #6  
**Bloquea:** Issues #18, #19

**Descripción:**
Crear wireframes y mockups de todas las pantallas principales del sistema para cada rol de usuario.

**Subtareas:**
- [ ] Wireframes de login y registro
- [ ] Wireframes de dashboard paciente
- [ ] Wireframes de dashboard médico
- [ ] Wireframes de dashboard administrador
- [ ] Wireframes de dashboard centro médico
- [ ] Wireframes de flujo de reserva de cita
- [ ] Wireframes de gestión de agenda
- [ ] Diseño responsive (mobile, tablet, desktop)

**Criterios de Aceptación:**
- [ ] Wireframes para todas las pantallas principales
- [ ] Versiones mobile y desktop
- [ ] Guía de estilos (colores, tipografía)
- [ ] Aprobación del Product Owner

---

#### Issue #12: Implementación de modelos de datos
**Labels:** `backend`  
**Asignado a:** Bons  
**Estimación:** 5 puntos  
**Bloqueado por:** Issue #7  
**Bloquea:** Issue #17

**Descripción:**
Implementar los modelos de datos (schemas de Mongoose) basados en el diagrama de clases y ERD.

**Subtareas:**
- [ ] Modelo User con validaciones
- [ ] Modelo Appointment con estados
- [ ] Modelo MedicalCenter
- [ ] Modelo Schedule
- [ ] Modelo Notification
- [ ] Implementar hooks pre/post save
- [ ] Implementar métodos de instancia y estáticos

**Criterios de Aceptación:**
- [ ] Modelos con validaciones completas
- [ ] Índices para optimización de queries
- [ ] Métodos helper implementados
- [ ] Tests unitarios para modelos

---

#### Issue #13: Implementación de base de datos
**Labels:** `backend`  
**Asignado a:** Bons  
**Estimación:** 3 puntos  
**Bloqueado por:** Issue #8  
**Bloquea:** Issue #17

**Descripción:**
Configurar la conexión a MongoDB y crear los scripts de seed para datos iniciales.

**Subtareas:**
- [ ] Configurar conexión MongoDB con mongoose
- [ ] Crear archivo de configuración de DB
- [ ] Implementar script de seed con usuarios de prueba
- [ ] Implementar script de migración
- [ ] Configurar variables de entorno

**Criterios de Aceptación:**
- [ ] Conexión funcionando con MongoDB local y Atlas
- [ ] Script de seed ejecutable
- [ ] Manejo de errores de conexión
- [ ] Documentación de setup

---

#### Issue #14: Implementación de autenticación JWT
**Labels:** `backend`  
**Asignado a:** Bons  
**Estimación:** 8 puntos  
**Bloqueado por:** Issue #9  
**Bloquea:** Issues #17, #18

**Descripción:**
Implementar el sistema completo de autenticación con JWT, incluyendo registro, login, logout y validación de tokens.

**Subtareas:**
- [ ] Endpoint POST /api/auth/register
- [ ] Endpoint POST /api/auth/login
- [ ] Endpoint GET /api/auth/me
- [ ] Middleware de autenticación
- [ ] Middleware de autorización por roles
- [ ] Refresh tokens (opcional)
- [ ] Manejo de expiración de tokens

**Criterios de Aceptación:**
- [ ] Registro crea usuario con contraseña hasheada
- [ ] Login devuelve JWT válido
- [ ] Rutas protegidas validan token
- [ ] Roles respetados en autorización

---

#### Issue #15: Configuración de CI/CD
**Labels:** `ci-cd`  
**Asignado a:** Bons  
**Estimación:** 5 puntos  
**Bloqueado por:** Issue #9  
**Bloquea:** Issue #26

**Descripción:**
Configurar el pipeline de integración continua y despliegue continuo usando GitHub Actions.

**Subtareas:**
- [ ] Crear workflow ci.yml para tests y linting
- [ ] Crear workflow deploy.yml para despliegue
- [ ] Configurar matrix de versiones Node.js
- [ ] Configurar caché de dependencias
- [ ] Configurar notificaciones de estado
- [ ] Documentar proceso de deployment

**Criterios de Aceptación:**
- [ ] CI ejecuta en cada push y PR
- [ ] Tests y lint deben pasar antes de merge
- [ ] Deploy automático a staging en develop
- [ ] Deploy a producción en main

---

#### Issue #16: Configuración de linting y formato de código
**Labels:** `ci-cd`  
**Asignado a:** Bons  
**Estimación:** 3 puntos  
**Bloqueado por:** Ninguno  
**Bloquea:** Issue #15

**Descripción:**
Configurar herramientas de linting y formateo de código para mantener consistencia en el proyecto.

**Subtareas:**
- [ ] Configurar ESLint para backend
- [ ] Configurar reglas de estilo
- [ ] Agregar scripts npm para lint
- [ ] Configurar pre-commit hooks (opcional)
- [ ] Documentar estándares de código

**Criterios de Aceptación:**
- [ ] ESLint configurado y funcionando
- [ ] Scripts npm lint y lint:fix disponibles
- [ ] Sin errores de lint en código existente
- [ ] Integrado con CI pipeline

---

### Sprint 3: Implementación Frontend y Backend (Issues 17-22)

---

#### Issue #17: Implementación de endpoints de citas
**Labels:** `backend`  
**Asignado a:** Bons  
**Estimación:** 8 puntos  
**Bloqueado por:** Issues #10, #12, #13, #14  
**Bloquea:** Issues #20, #24

**Descripción:**
Implementar los endpoints completos de la API para gestión de citas médicas (CRUD).

**Subtareas:**
- [ ] GET /api/appointments - Listar citas
- [ ] GET /api/appointments/:id - Obtener cita
- [ ] POST /api/appointments - Crear cita
- [ ] PUT /api/appointments/:id - Actualizar cita
- [ ] DELETE /api/appointments/:id - Cancelar cita
- [ ] Filtros por fecha, médico, paciente
- [ ] Paginación y ordenamiento

**Criterios de Aceptación:**
- [ ] CRUD completo funcionando
- [ ] Validación de disponibilidad
- [ ] Control de acceso por rol
- [ ] Tests de integración

---

#### Issue #18: Implementación de pantalla de login
**Labels:** `frontend`  
**Asignado a:** Javier  
**Estimación:** 5 puntos  
**Bloqueado por:** Issues #11, #14  
**Bloquea:** Issues #19, #24

**Descripción:**
Implementar la pantalla de login conectada a la API de autenticación.

**Subtareas:**
- [ ] Diseño responsivo de formulario de login
- [ ] Validación de campos en frontend
- [ ] Conexión con endpoint /api/auth/login
- [ ] Almacenamiento de JWT en localStorage
- [ ] Redirección según rol de usuario
- [ ] Manejo de errores de autenticación
- [ ] Link a recuperación de contraseña

**Criterios de Aceptación:**
- [ ] Login funcional con credenciales válidas
- [ ] Mensajes de error claros
- [ ] Redirección correcta por rol
- [ ] Diseño responsive

---

#### Issue #19: Implementación de dashboards por rol
**Labels:** `frontend`  
**Asignado a:** Javier  
**Estimación:** 13 puntos  
**Bloqueado por:** Issues #11, #18  
**Bloquea:** Issue #20

**Descripción:**
Implementar los dashboards personalizados para cada rol de usuario con su funcionalidad específica.

**Subtareas:**
- [ ] Dashboard de paciente con citas próximas
- [ ] Dashboard de médico con agenda del día
- [ ] Dashboard de administrador del sistema
- [ ] Dashboard de administrador de centro
- [ ] Navegación común entre dashboards
- [ ] Protección de rutas por rol
- [ ] Widget de estadísticas

**Criterios de Aceptación:**
- [ ] Cada rol ve su dashboard correspondiente
- [ ] Datos cargados desde API
- [ ] Navegación coherente
- [ ] Responsive en todos los dispositivos

---

#### Issue #20: Integración frontend-backend de citas
**Labels:** `frontend`, `backend`  
**Asignado a:** Javier, Bons  
**Estimación:** 8 puntos  
**Bloqueado por:** Issues #17, #19  
**Bloquea:** Issue #24

**Descripción:**
Integrar completamente el flujo de gestión de citas entre frontend y backend.

**Subtareas:**
- [ ] Conectar listado de citas con API
- [ ] Implementar formulario de nueva cita
- [ ] Implementar cancelación de cita
- [ ] Implementar modificación de cita
- [ ] Mostrar estados de cita (pendiente, confirmada, etc.)
- [ ] Notificaciones de éxito/error

**Criterios de Aceptación:**
- [ ] Flujo completo de cita funcional
- [ ] Datos persistidos en base de datos
- [ ] Feedback visual al usuario
- [ ] Sin errores de consola

---

#### Issue #21: Implementación de sistema de notificaciones
**Labels:** `backend`, `frontend`  
**Asignado a:** Bons, Javier  
**Estimación:** 8 puntos  
**Bloqueado por:** Issue #17  
**Bloquea:** Issue #25

**Descripción:**
Implementar el sistema de notificaciones para alertar a usuarios sobre eventos de citas.

**Subtareas:**
- [ ] Modelo de notificación en backend
- [ ] Endpoint para listar notificaciones
- [ ] Endpoint para marcar como leída
- [ ] Generación automática al crear/cancelar cita
- [ ] Centro de notificaciones en frontend
- [ ] Contador de notificaciones no leídas
- [ ] Notificaciones push (opcional)

**Criterios de Aceptación:**
- [ ] Notificaciones creadas automáticamente
- [ ] UI de centro de notificaciones
- [ ] Persistencia en base de datos
- [ ] Badge con contador visible

---

#### Issue #22: Implementación de reportes y analytics
**Labels:** `backend`, `frontend`  
**Asignado a:** Bons, Javier  
**Estimación:** 8 puntos  
**Bloqueado por:** Issue #17  
**Bloquea:** Issue #25

**Descripción:**
Implementar el módulo de reportes y estadísticas del sistema.

**Subtareas:**
- [ ] Endpoint para estadísticas de citas
- [ ] Endpoint para reportes por período
- [ ] Dashboard de analytics
- [ ] Gráficos de citas por día/semana/mes
- [ ] Métricas de ocupación médica
- [ ] Exportación a CSV/PDF (opcional)

**Criterios de Aceptación:**
- [ ] Datos agregados correctamente
- [ ] Gráficos interactivos
- [ ] Filtros por fecha y centro
- [ ] Acceso solo para administradores

---

### Sprint 4: Testing, Documentación y Entrega (Issues 23-28)

---

#### Issue #23: Pruebas unitarias del backend
**Labels:** `testing`  
**Asignado a:** Julio  
**Estimación:** 8 puntos  
**Bloqueado por:** Issues #12, #14, #17  
**Bloquea:** Issue #26

**Descripción:**
Crear suite de pruebas unitarias para los componentes del backend usando Jest.

**Subtareas:**
- [ ] Configurar Jest para el proyecto
- [ ] Tests unitarios de modelos
- [ ] Tests unitarios de controladores
- [ ] Tests unitarios de middlewares
- [ ] Tests de utilidades (hash, sanitize)
- [ ] Configurar coverage mínimo (70%)

**Criterios de Aceptación:**
- [ ] Cobertura mínima del 70%
- [ ] Todos los tests pasan
- [ ] Integrado con CI
- [ ] Reporte de coverage generado

---

#### Issue #24: Pruebas de integración API
**Labels:** `testing`  
**Asignado a:** Julio  
**Estimación:** 8 puntos  
**Bloqueado por:** Issues #18, #20  
**Bloquea:** Issue #26

**Descripción:**
Crear pruebas de integración para validar el funcionamiento correcto de la API REST.

**Subtareas:**
- [ ] Configurar supertest
- [ ] Tests de endpoints de autenticación
- [ ] Tests de endpoints de usuarios
- [ ] Tests de endpoints de citas
- [ ] Tests de endpoints de centros
- [ ] Tests de autorización por rol
- [ ] Tests de validaciones

**Criterios de Aceptación:**
- [ ] Todos los endpoints testeados
- [ ] Casos de éxito y error cubiertos
- [ ] Tests ejecutables en CI
- [ ] Documentación de escenarios

---

#### Issue #25: Pruebas end-to-end (E2E)
**Labels:** `testing`  
**Asignado a:** Julio  
**Estimación:** 13 puntos  
**Bloqueado por:** Issues #21, #22  
**Bloquea:** Issue #26

**Descripción:**
Crear pruebas E2E que validen flujos completos de usuario usando Cypress o Playwright.

**Subtareas:**
- [ ] Configurar framework E2E
- [ ] Test E2E de registro de usuario
- [ ] Test E2E de login/logout
- [ ] Test E2E de reserva de cita
- [ ] Test E2E de cancelación de cita
- [ ] Test E2E de navegación entre dashboards
- [ ] Screenshots de errores

**Criterios de Aceptación:**
- [ ] Flujos críticos cubiertos
- [ ] Tests estables y reproducibles
- [ ] Screenshots en caso de fallo
- [ ] Ejecutables en CI

---

#### Issue #26: Documentación técnica completa
**Labels:** `documentation`  
**Asignado a:** Julio, David  
**Estimación:** 8 puntos  
**Bloqueado por:** Issues #15, #23, #24, #25  
**Bloquea:** Issue #28

**Descripción:**
Completar toda la documentación técnica del proyecto, incluyendo guías de instalación, API y despliegue.

**Subtareas:**
- [ ] README.md principal actualizado
- [ ] Guía de instalación paso a paso
- [ ] Documentación de API (Swagger/OpenAPI)
- [ ] Guía de despliegue
- [ ] Documentación de configuración
- [ ] Changelog actualizado
- [ ] Documentación de CI/CD

**Criterios de Aceptación:**
- [ ] Documentación completa y actualizada
- [ ] Enlaces funcionando
- [ ] Ejemplos de código
- [ ] Formato Markdown consistente

---

#### Issue #27: Manual de usuario
**Labels:** `documentation`  
**Asignado a:** Julio  
**Estimación:** 5 puntos  
**Bloqueado por:** Issues #19, #20  
**Bloquea:** Issue #28

**Descripción:**
Crear manual de usuario con guías paso a paso para cada rol del sistema.

**Subtareas:**
- [ ] Guía para pacientes
- [ ] Guía para médicos
- [ ] Guía para administradores de centro
- [ ] Guía para administradores del sistema
- [ ] FAQ con preguntas frecuentes
- [ ] Capturas de pantalla actualizadas
- [ ] Glosario de términos

**Criterios de Aceptación:**
- [ ] Guía para cada rol
- [ ] Capturas de pantalla actualizadas
- [ ] Lenguaje claro y accesible
- [ ] Disponible en español

---

#### Issue #28: Preparación y entrega final del proyecto
**Labels:** `documentation`  
**Asignado a:** Todos (Javier, David, Bons, Julio)  
**Estimación:** 5 puntos  
**Bloqueado por:** Issues #26, #27  
**Bloquea:** Ninguno

**Descripción:**
Preparar todos los entregables finales del proyecto y realizar la presentación.

**Subtareas:**
- [ ] Verificar que todos los issues están completados
- [ ] Revisar documentación final
- [ ] Preparar presentación del proyecto
- [ ] Grabar demo del sistema
- [ ] Empaquetar código fuente
- [ ] Crear release en GitHub
- [ ] Realizar presentación al cliente/profesor

**Criterios de Aceptación:**
- [ ] Todos los entregables completados
- [ ] Sistema funcionando en producción
- [ ] Documentación aprobada
- [ ] Presentación exitosa

---

## 📅 Distribución por Sprints

### Sprint 1 (Semanas 1-2): Análisis y Diseño
| Issue | Título | Puntos | Asignado |
|-------|--------|--------|----------|
| #1 | Levantamiento de requisitos funcionales | 5 | David |
| #2 | Levantamiento de requisitos no funcionales | 3 | David |
| #3 | Especificación de casos de uso principales | 5 | David |
| #4 | Modelo de dominio y glosario | 3 | David |
| #5 | Diagrama de casos de uso UML | 5 | David |
| #6 | Diagramas de secuencia UML | 8 | David |
| #7 | Diagrama de clases UML | 5 | David |
| #8 | Diagrama entidad-relación (ERD) | 5 | David |
| **Total Sprint 1** | | **39** | |

### Sprint 2 (Semanas 3-4): Arquitectura e Implementación Base
| Issue | Título | Puntos | Asignado |
|-------|--------|--------|----------|
| #9 | Diseño de arquitectura del sistema | 8 | Bons |
| #10 | Diseño de API REST | 5 | Bons |
| #11 | Diseño de interfaz de usuario (wireframes) | 8 | Javier |
| #12 | Implementación de modelos de datos | 5 | Bons |
| #13 | Implementación de base de datos | 3 | Bons |
| #14 | Implementación de autenticación JWT | 8 | Bons |
| #15 | Configuración de CI/CD | 5 | Bons |
| #16 | Configuración de linting y formato de código | 3 | Bons |
| **Total Sprint 2** | | **45** | |

### Sprint 3 (Semanas 5-6): Implementación Frontend y Backend
| Issue | Título | Puntos | Asignado |
|-------|--------|--------|----------|
| #17 | Implementación de endpoints de citas | 8 | Bons |
| #18 | Implementación de pantalla de login | 5 | Javier |
| #19 | Implementación de dashboards por rol | 13 | Javier |
| #20 | Integración frontend-backend de citas | 8 | Javier, Bons |
| #21 | Implementación de sistema de notificaciones | 8 | Bons, Javier |
| #22 | Implementación de reportes y analytics | 8 | Bons, Javier |
| **Total Sprint 3** | | **50** | |

### Sprint 4 (Semanas 7-8): Testing, Documentación y Entrega
| Issue | Título | Puntos | Asignado |
|-------|--------|--------|----------|
| #23 | Pruebas unitarias del backend | 8 | Julio |
| #24 | Pruebas de integración API | 8 | Julio |
| #25 | Pruebas end-to-end (E2E) | 13 | Julio |
| #26 | Documentación técnica completa | 8 | Julio, David |
| #27 | Manual de usuario | 5 | Julio |
| #28 | Preparación y entrega final del proyecto | 5 | Todos |
| **Total Sprint 4** | | **47** | |

---

## 📊 Resumen de Puntos por Asignado

| Miembro | Puntos Totales | Porcentaje |
|---------|----------------|------------|
| David | 47 | 26% |
| Bons | 66 | 36% |
| Javier | 42 | 23% |
| Julio | 42 | 23% |
| **TOTAL** | **181** | 100% |

---

## 🔗 GitHub Project: Diagramas y división de tareas

### Columnas del Board (Prioritized Backlog)
1. **Backlog** - Issues nuevos sin asignar
2. **Ready** - Issues listos para comenzar
3. **In Progress** - Issues en desarrollo
4. **In Review** - Issues en revisión de código/PR abierto
5. **Done** - Issues completados

### Automatizaciones Sugeridas
- **Issue asignado** → Mover a "Ready"
- **PR abierto vinculado a issue** → Mover a "In Review"
- **Issue cerrado** → Mover a "Done"

### Campo Sprint
- Sprint 1: Issues #1-8
- Sprint 2: Issues #9-16
- Sprint 3: Issues #17-22
- Sprint 4: Issues #23-28

---

## ⚠️ Nota sobre Creación de Issues

**IMPORTANTE:** Este documento contiene la especificación completa de los 28 issues. Para crear los issues en GitHub, se debe:

1. Usar GitHub CLI (`gh issue create`) o la interfaz web de GitHub
2. Crear un GitHub Project con las columnas especificadas
3. Configurar las automatizaciones del Project
4. Asignar los labels correspondientes

### Script para crear issues con GitHub CLI (ejemplo):

```bash
# Crear labels primero
gh label create "analysis" --color "0E8A16" --description "Análisis y especificación de requisitos"
gh label create "uml" --color "1D76DB" --description "Diagramas UML"
gh label create "architecture" --color "5319E7" --description "Diseño arquitectónico"
gh label create "frontend" --color "B60205" --description "Desarrollo de interfaz de usuario"
gh label create "backend" --color "D93F0B" --description "Desarrollo del servidor y API"
gh label create "testing" --color "FBCA04" --description "Pruebas y QA"
gh label create "documentation" --color "006B75" --description "Documentación técnica y de usuario"
gh label create "ci-cd" --color "C5DEF5" --description "Integración y despliegue continuo"

# Ejemplo de creación de issue
gh issue create \
  --title "#1 Levantamiento de requisitos funcionales" \
  --label "analysis" \
  --assignee "David" \
  --body "..." # Contenido del issue
```

---

*Documento generado el 29 de noviembre de 2025*
