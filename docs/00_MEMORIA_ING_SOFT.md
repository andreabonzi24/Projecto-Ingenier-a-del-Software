# 📄 Memoria Final del Proyecto - Plataforma de Citas Médicas

**Asignatura:** Ingeniería del Software  
**Metodología:** SCRUM + Extreme Programming (XP)  
**Fecha de entrega:** [Por definir]  
**Versión:** 1.0

---

## 📋 Índice

1. [Introducción](#introducción)
2. [Objetivos del Proyecto](#objetivos-del-proyecto)
3. [Metodología Aplicada](#metodología-aplicada)
4. [Equipo de Trabajo](#equipo-de-trabajo)
5. [Planificación y Sprints](#planificación-y-sprints)
6. [Requisitos del Sistema](#requisitos-del-sistema)
7. [Diseño y Arquitectura](#diseño-y-arquitectura)
8. [Implementación](#implementación)
9. [Pruebas y Validación](#pruebas-y-validación)
10. [Resultados Obtenidos](#resultados-obtenidos)
11. [Conclusiones](#conclusiones)
12. [Lecciones Aprendidas](#lecciones-aprendidas)
13. [Trabajo Futuro](#trabajo-futuro)
14. [Referencias](#referencias)
15. [Anexos](#anexos)

---

## 1. Introducción

### 1.1 Contexto del Proyecto

La **Plataforma de Citas Médicas** es un sistema web desarrollado como proyecto de la asignatura de Ingeniería del Software. El objetivo principal es demostrar la aplicación práctica de metodologías ágiles (SCRUM y XP) en el desarrollo de software.

### 1.2 Propósito del Documento

Esta memoria documenta el proceso completo de desarrollo del proyecto, desde la concepción hasta la entrega final, incluyendo:

- Decisiones de diseño y arquitectura
- Metodología y organización del equipo
- Documentación técnica y funcional
- Pruebas realizadas y resultados
- Retrospectiva y lecciones aprendidas

### 1.3 Alcance

El sistema permite:
- Registro y autenticación de usuarios (pacientes, médicos, administradores)
- Gestión de citas médicas
- Visualización de dashboards personalizados por rol
- Administración de centros médicos

---

## 2. Objetivos del Proyecto

### 2.1 Objetivo General

Desarrollar una plataforma web funcional para la gestión de citas médicas que demuestre el dominio de:
- Metodologías ágiles (SCRUM + XP)
- Diseño orientado a objetos
- Arquitectura de software moderna
- Buenas prácticas de desarrollo

### 2.2 Objetivos Específicos

| ID | Objetivo | Estado |
|----|----------|--------|
| OBJ-01 | Implementar sistema de autenticación JWT | ✅ Completado |
| OBJ-02 | Desarrollar API REST completa | ✅ Completado |
| OBJ-03 | Crear interfaces responsivas | ✅ Completado |
| OBJ-04 | Aplicar principios SOLID | 🔄 En progreso |
| OBJ-05 | Documentar el proceso completo | ✅ Completado |
| OBJ-06 | Implementar pruebas automatizadas | ⏳ Pendiente |

---

## 3. Metodología Aplicada

### 3.1 Framework SCRUM

Se ha utilizado SCRUM como marco de trabajo ágil con las siguientes ceremonias:

| Ceremonia | Frecuencia | Duración |
|-----------|------------|----------|
| Sprint Planning | Inicio de sprint | 1-2 horas |
| Daily Standup | Diario | 15 minutos |
| Sprint Review | Fin de sprint | 1 hora |
| Sprint Retrospective | Fin de sprint | 1 hora |

### 3.2 Prácticas XP Implementadas

| Práctica | Descripción | Aplicación |
|----------|-------------|------------|
| **Pair Programming** | Programación en parejas | Durante implementación crítica |
| **TDD** | Test-Driven Development | En módulos de backend |
| **Refactoring** | Mejora continua del código | Post cada sprint |
| **Simple Design** | Diseño simple y evolutivo | En toda la arquitectura |
| **Continuous Integration** | Integración continua | GitHub Actions |
| **Collective Code Ownership** | Propiedad compartida | Todo el equipo |

### 3.3 Roles del Equipo

| Rol | Responsable | Responsabilidades |
|-----|-------------|-------------------|
| Product Owner | Javier | Priorización de backlog, criterios de aceptación |
| Scrum Master | David | Facilitación, eliminación de impedimentos |
| Dev Team | Bons, Julio | Desarrollo, testing, documentación |

---

## 4. Equipo de Trabajo

### 4.1 Composición del Equipo

| Miembro | Rol Principal | Especialización |
|---------|---------------|-----------------|
| **Javier** | Product Owner + Frontend | Interfaz de usuario, UX |
| **David** | Análisis + UML | Modelado, documentación |
| **Bons** | Backend + Arquitectura + CI/CD | API, seguridad, despliegue |
| **Julio** | QA + Pruebas | Testing, validación |

### 4.2 Distribución de Responsabilidades

```
Sprint 1 (Análisis + UML)
├── David: Requisitos, casos de uso, diagramas UML
├── Bons: Revisión técnica
└── Todos: Validación

Sprint 2 (Arquitectura + Backend)
├── Bons: Arquitectura, API REST
├── David: Documentación técnica
└── Julio: Plan de pruebas

Sprint 3 (Frontend + Integración)
├── Javier: Desarrollo frontend
├── Bons: Integración API
└── Julio: Pruebas de integración

Sprint 4 (Pruebas + Demo)
├── Julio: Ejecución de pruebas
├── Todos: Demo y presentación
└── David: Documentación final
```

---

## 5. Planificación y Sprints

### 5.1 Product Backlog Inicial

| Prioridad | Historia | Story Points | Sprint |
|-----------|----------|--------------|--------|
| Alta | Autenticación de usuarios | 8 | 1 |
| Alta | API REST básica | 8 | 1 |
| Alta | Dashboard de paciente | 5 | 2 |
| Media | Dashboard de médico | 5 | 2 |
| Media | Gestión de citas | 8 | 3 |
| Baja | Notificaciones | 5 | 4 |

### 5.2 Resumen de Sprints

#### Sprint 1: Análisis y UML
- **Duración:** [Fechas]
- **Objetivo:** Definir requisitos y modelar el sistema
- **Entregables:**
  - Documento de requisitos
  - Diagrama de casos de uso
  - Diagrama de clases
  - Diagrama de secuencia

#### Sprint 2: Arquitectura y Backend
- **Duración:** [Fechas]
- **Objetivo:** Implementar backend y definir arquitectura
- **Entregables:**
  - Documento de arquitectura
  - API REST funcional
  - Sistema de autenticación

#### Sprint 3: Frontend e Integración
- **Duración:** [Fechas]
- **Objetivo:** Desarrollar interfaz y conectar con backend
- **Entregables:**
  - Dashboards funcionales
  - Integración completa
  - Sistema de roles

#### Sprint 4: Pruebas y Demo
- **Duración:** [Fechas]
- **Objetivo:** Validar el sistema y preparar presentación
- **Entregables:**
  - Plan de pruebas ejecutado
  - Demo funcional
  - Documentación final

---

## 6. Requisitos del Sistema

### 6.1 Requisitos Funcionales

Consultar documento detallado: [01_REQUISITOS.md](01_REQUISITOS.md)

### 6.2 Requisitos No Funcionales

| ID | Categoría | Requisito | Métrica |
|----|-----------|-----------|---------|
| RNF-01 | Rendimiento | Tiempo de respuesta < 2s | 95% peticiones |
| RNF-02 | Seguridad | Autenticación JWT | 100% endpoints protegidos |
| RNF-03 | Disponibilidad | Uptime > 99% | En producción |
| RNF-04 | Escalabilidad | Soporte 100 usuarios concurrentes | Carga simulada |
| RNF-05 | Usabilidad | Diseño responsivo | 3 breakpoints |

---

## 7. Diseño y Arquitectura

### 7.1 Arquitectura General

Consultar documento detallado: [03_ARQUITECTURA.md](03_ARQUITECTURA.md)

### 7.2 Diagramas UML

Consultar documento detallado: [02_UML.md](02_UML.md)

### 7.3 Patrones de Diseño Aplicados

| Patrón | Aplicación |
|--------|------------|
| **MVC** | Separación de capas en backend |
| **Repository** | Acceso a datos |
| **Factory** | Creación de modelos |
| **Middleware** | Autenticación y validación |

---

## 8. Implementación

### 8.1 Stack Tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Frontend | HTML5, CSS3, JavaScript | ES6+ |
| Estilos | Tailwind CSS | 3.x |
| Backend | Node.js + Express | 18.x / 4.x |
| Base de datos | MongoDB | 6.x |
| Autenticación | JWT | 9.x |

### 8.2 Estructura del Proyecto

```
Projecto-Ingenieria-del-Software/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── web/
│   ├── css/
│   ├── js/
│   └── *.html
├── docs/
└── .github/workflows/
```

### 8.3 Funcionalidades Implementadas

- [x] Sistema de autenticación (registro, login, logout)
- [x] Gestión de sesiones con JWT
- [x] Dashboard de paciente
- [x] Dashboard de médico
- [x] Dashboard de administrador
- [x] Dashboard de centro médico
- [x] API REST completa
- [ ] Notificaciones en tiempo real
- [ ] Sistema de pagos

---

## 9. Pruebas y Validación

### 9.1 Plan de Pruebas

Consultar documento detallado: [04_PLAN_PRUEBAS.md](04_PLAN_PRUEBAS.md)

### 9.2 Tipos de Pruebas Realizadas

| Tipo | Cobertura | Estado |
|------|-----------|--------|
| Unitarias | Backend | ⏳ En progreso |
| Integración | API | ⏳ En progreso |
| E2E | Flujos críticos | ⏳ Planificado |
| UAT | Usuarios finales | ⏳ Planificado |
| Rendimiento | Carga | ⏳ Planificado |

### 9.3 Criterios de Aceptación

- Todos los requisitos funcionales implementados
- Cobertura de pruebas > 70%
- Sin vulnerabilidades críticas
- Documentación completa

---

## 10. Resultados Obtenidos

### 10.1 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| Líneas de código | ~10,500 |
| Archivos fuente | 50+ |
| Endpoints API | 12 |
| Páginas web | 13 |
| Commits | [N] |
| Issues resueltos | [N] |

### 10.2 Velocidad del Equipo

| Sprint | Story Points Comprometidos | Story Points Completados |
|--------|---------------------------|-------------------------|
| Sprint 1 | [N] | [N] |
| Sprint 2 | [N] | [N] |
| Sprint 3 | [N] | [N] |
| Sprint 4 | [N] | [N] |

### 10.3 Burndown Chart

[Incluir gráfico de burndown]

---

## 11. Conclusiones

### 11.1 Objetivos Alcanzados

- ✅ Sistema funcional de gestión de citas médicas
- ✅ Aplicación exitosa de metodología SCRUM + XP
- ✅ Documentación técnica completa
- ✅ Arquitectura escalable y mantenible

### 11.2 Desviaciones y Ajustes

[Documentar cualquier desviación del plan original]

---

## 12. Lecciones Aprendidas

### 12.1 Aspectos Positivos

- La planificación por sprints permitió entregas incrementales
- Las prácticas XP mejoraron la calidad del código
- La documentación continua facilitó la comunicación

### 12.2 Aspectos a Mejorar

- Incrementar cobertura de pruebas automatizadas
- Mejorar estimaciones de story points
- Automatizar más procesos de CI/CD

### 12.3 Recomendaciones para Futuros Proyectos

1. Comenzar con testing desde el Sprint 1
2. Establecer métricas de calidad desde el inicio
3. Mantener documentación actualizada continuamente

---

## 13. Trabajo Futuro

### 13.1 Mejoras Planificadas

| Prioridad | Mejora | Estimación |
|-----------|--------|------------|
| Alta | Testing automatizado completo | 2 sprints |
| Alta | Migración a MongoDB producción | 1 sprint |
| Media | PWA (Progressive Web App) | 1 sprint |
| Media | Notificaciones push | 1 sprint |
| Baja | Integración con calendarios externos | 2 sprints |

### 13.2 Escalabilidad

- Implementación de microservicios
- Contenedorización con Docker
- Orquestación con Kubernetes

---

## 14. Referencias

### 14.1 Bibliografía

- Schwaber, K., & Sutherland, J. (2020). *The Scrum Guide*.
- Beck, K. (2004). *Extreme Programming Explained*.
- Martin, R. C. (2017). *Clean Architecture*.

### 14.2 Recursos en Línea

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/guide)
- [JWT.io](https://jwt.io)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 15. Anexos

### Anexo A: Glosario de Términos

| Término | Definición |
|---------|------------|
| **JWT** | JSON Web Token - estándar de autenticación |
| **API REST** | Interfaz de programación basada en HTTP |
| **Sprint** | Iteración de desarrollo en SCRUM |
| **Story Point** | Unidad de estimación de esfuerzo |
| **UAT** | User Acceptance Testing |

### Anexo B: Manual de Usuario

Consultar: [06_GUIA_DEMO.md](06_GUIA_DEMO.md)

### Anexo C: Documentación Técnica

- [01_REQUISITOS.md](01_REQUISITOS.md) - Requisitos del sistema
- [02_UML.md](02_UML.md) - Diagramas UML
- [03_ARQUITECTURA.md](03_ARQUITECTURA.md) - Arquitectura del sistema
- [04_PLAN_PRUEBAS.md](04_PLAN_PRUEBAS.md) - Plan de pruebas
- [05_CI_CD.md](05_CI_CD.md) - Integración y despliegue continuo

### Anexo D: Actas de Reuniones

[Incluir actas de Sprint Planning, Reviews y Retrospectives]

---

**Documento generado como parte del proyecto de Ingeniería del Software**  
**Universidad:** [Nombre de la universidad]  
**Curso académico:** 2024-2025
