# Memoria de Ingeniería del Software

## Plataforma de Citas Médicas - Proyecto SCRUM+XP

---

## Índice

1. [Introducción](#1-introducción)
2. [Objetivos del Proyecto](#2-objetivos-del-proyecto)
3. [Metodología de Desarrollo](#3-metodología-de-desarrollo)
4. [Equipo de Desarrollo](#4-equipo-de-desarrollo)
5. [Planificación de Sprints](#5-planificación-de-sprints)
6. [Gestión de Riesgos](#6-gestión-de-riesgos)
7. [Seguimiento y Control](#7-seguimiento-y-control)
8. [Lecciones Aprendidas](#8-lecciones-aprendidas)
9. [Conclusiones](#9-conclusiones)

---

## 1. Introducción

### 1.1 Propósito del Documento

Este documento constituye la memoria oficial del proyecto de Ingeniería del Software para el desarrollo de una plataforma de gestión de citas médicas. El documento sigue las directrices del plan de estudios de Ingeniería del Software y documenta todas las fases del ciclo de vida del desarrollo.

### 1.2 Alcance del Proyecto

La plataforma de citas médicas es un sistema web que permite:
- Gestión de usuarios (pacientes, médicos, administradores)
- Reserva y gestión de citas médicas
- Administración de centros médicos
- Sistema de notificaciones
- Panel de análisis y estadísticas

### 1.3 Referencias

| ID | Documento | Descripción |
|---|---|---|
| REF-001 | [01_REQUISITOS.md](./01_REQUISITOS.md) | Especificación de requisitos |
| REF-002 | [02_UML.md](./02_UML.md) | Diagramas UML |
| REF-003 | [03_ARQUITECTURA.md](./03_ARQUITECTURA.md) | Diseño arquitectónico |
| REF-004 | [04_PLAN_PRUEBAS.md](./04_PLAN_PRUEBAS.md) | Plan de pruebas |
| REF-005 | [05_CI_CD.md](./05_CI_CD.md) | Integración y despliegue continuo |
| REF-006 | [06_GUIA_DEMO.md](./06_GUIA_DEMO.md) | Guía de demostración |

---

## 2. Objetivos del Proyecto

### 2.1 Objetivo General

Desarrollar una plataforma web completa para la gestión de citas médicas utilizando metodologías ágiles SCRUM y prácticas de Extreme Programming (XP).

### 2.2 Objetivos Específicos

| ID | Objetivo | Prioridad | Issue Relacionado |
|---|---|---|---|
| OBJ-001 | Implementar sistema de autenticación seguro | Alta | #5, #6 |
| OBJ-002 | Desarrollar módulo de gestión de citas | Alta | #7, #8 |
| OBJ-003 | Crear dashboards para cada tipo de usuario | Media | #9, #10, #11 |
| OBJ-004 | Implementar sistema de notificaciones | Media | #12 |
| OBJ-005 | Desarrollar módulo de análisis y estadísticas | Baja | #13 |
| OBJ-006 | Garantizar cobertura de pruebas >80% | Alta | #14, #15, #16, #17 |

### 2.3 Criterios de Éxito

- [ ] Todas las funcionalidades implementadas según especificación
- [ ] Cobertura de pruebas unitarias ≥ 80%
- [ ] Documentación completa y actualizada
- [ ] Despliegue exitoso en entorno de producción
- [ ] Demo funcional presentada al cliente

---

## 3. Metodología de Desarrollo

### 3.1 SCRUM

#### Roles del Equipo

| Rol | Responsable | GitHub Login |
|---|---|---|
| Product Owner | Javier | Javier |
| Scrum Master | Bons | Bons |
| Desarrollador Frontend | Javier | Javier |
| Desarrollador Backend | Bons | Bons |
| Analista/UML | David | David |
| QA/Testing | Julio | Julio |

#### Eventos SCRUM

| Evento | Frecuencia | Duración |
|---|---|---|
| Sprint Planning | Inicio de sprint | 2 horas |
| Daily Standup | Diario | 15 minutos |
| Sprint Review | Fin de sprint | 1 hora |
| Sprint Retrospective | Fin de sprint | 1 hora |

### 3.2 Extreme Programming (XP)

#### Prácticas Implementadas

| Práctica | Implementación |
|---|---|
| Pair Programming | Revisión de código obligatoria en PRs |
| Test-Driven Development | Tests antes de implementación |
| Continuous Integration | GitHub Actions CI/CD |
| Refactoring | Sprints dedicados a mejoras |
| Simple Design | KISS/YAGNI principles |
| Collective Code Ownership | Todos pueden modificar cualquier código |

---

## 4. Equipo de Desarrollo

### 4.1 Composición del Equipo

| Miembro | Rol Principal | Responsabilidades |
|---|---|---|
| Javier | Frontend + Product Owner | UI/UX, gestión del backlog, priorización |
| David | Análisis + UML | Requisitos, diagramas, documentación |
| Bons | Backend + Arquitectura + CI/CD | API, base de datos, despliegue |
| Julio | QA + Testing | Pruebas, calidad, validación |

### 4.2 Matriz de Competencias

| Competencia | Javier | David | Bons | Julio |
|---|---|---|---|---|
| HTML/CSS/JS | ★★★★★ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ |
| Node.js/Express | ★★☆☆☆ | ★★☆☆☆ | ★★★★★ | ★★★☆☆ |
| MongoDB | ★★☆☆☆ | ★★☆☆☆ | ★★★★★ | ★★★☆☆ |
| UML/Análisis | ★★★☆☆ | ★★★★★ | ★★★☆☆ | ★★★☆☆ |
| Testing | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★★★ |
| CI/CD | ★★☆☆☆ | ★★☆☆☆ | ★★★★★ | ★★★☆☆ |

---

## 5. Planificación de Sprints

### 5.1 Resumen de Sprints

| Sprint | Duración | Objetivo | Issues |
|---|---|---|---|
| Sprint 1 | 2 semanas | Análisis y diseño | #1, #2, #3, #4 |
| Sprint 2 | 2 semanas | Modelado UML | #5, #6, #7, #8, #9 |
| Sprint 3 | 2 semanas | Implementación | #10, #11, #12, #13, #14, #15, #16, #17, #18, #19 |
| Sprint 4 | 2 semanas | Testing y presentación | #20, #21, #22, #23, #24, #25, #26, #27, #28 |

### 5.2 Burndown Chart (Template)

```
Puntos de Historia
     ^
  40 |--*
  35 |    *
  30 |      *--
  25 |         *
  20 |           *--
  15 |              *
  10 |                *--
   5 |                   *
   0 +-----+-----+-----+-----+-----+----> Días
         D1    D5    D10   D15   D20
```

### 5.3 Velocity del Equipo

| Sprint | Planificado (SP) | Completado (SP) | Velocity |
|---|---|---|---|
| Sprint 1 | 13 | - | - |
| Sprint 2 | 21 | - | - |
| Sprint 3 | 34 | - | - |
| Sprint 4 | 21 | - | - |

---

## 6. Gestión de Riesgos

### 6.1 Identificación de Riesgos

| ID | Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|---|
| R-001 | Retrasos en desarrollo | Media | Alto | Buffer en sprints, pair programming |
| R-002 | Cambios de requisitos | Alta | Medio | Metodología ágil, comunicación continua |
| R-003 | Problemas técnicos | Baja | Alto | CI/CD, pruebas automatizadas |
| R-004 | Falta de disponibilidad | Media | Medio | Documentación detallada, código compartido |
| R-005 | Deuda técnica | Media | Medio | Refactoring continuo, code reviews |

### 6.2 Matriz de Riesgos

```
Impacto
  Alto  |  R-004  |  R-001  |  R-003  |
  Medio |         |  R-002  |  R-005  |
  Bajo  |         |         |         |
        +---------+---------+---------+
            Baja     Media     Alta
                  Probabilidad
```

---

## 7. Seguimiento y Control

### 7.1 Métricas del Proyecto

| Métrica | Objetivo | Actual | Estado |
|---|---|---|---|
| Cobertura de tests | ≥80% | - | ⏳ Pendiente |
| Bugs en producción | 0 críticos | - | ⏳ Pendiente |
| Velocidad del equipo | Estable | - | ⏳ Pendiente |
| Satisfacción del cliente | ≥4/5 | - | ⏳ Pendiente |

### 7.2 Herramientas de Seguimiento

| Herramienta | Uso |
|---|---|
| GitHub Issues | Gestión de tareas y bugs |
| GitHub Projects | Tablero Kanban, backlog |
| GitHub Actions | CI/CD, automatización |
| Pull Requests | Revisión de código |

---

## 8. Lecciones Aprendidas

### 8.1 Sprint 1

| Área | Lección | Acción |
|---|---|---|
| - | Pendiente de completar | - |

### 8.2 Sprint 2

| Área | Lección | Acción |
|---|---|---|
| - | Pendiente de completar | - |

### 8.3 Sprint 3

| Área | Lección | Acción |
|---|---|---|
| - | Pendiente de completar | - |

### 8.4 Sprint 4

| Área | Lección | Acción |
|---|---|---|
| - | Pendiente de completar | - |

---

## 9. Conclusiones

### 9.1 Logros del Proyecto

- [ ] Sistema funcional de citas médicas
- [ ] Arquitectura escalable y mantenible
- [ ] Documentación completa
- [ ] Pruebas automatizadas implementadas
- [ ] Despliegue continuo configurado

### 9.2 Trabajo Futuro

| ID | Mejora Propuesta | Prioridad |
|---|---|---|
| FUT-001 | Aplicación móvil nativa | Media |
| FUT-002 | Integración con sistemas de salud | Alta |
| FUT-003 | Teleconsultas por video | Alta |
| FUT-004 | Recetas electrónicas | Media |
| FUT-005 | Historial médico compartido | Alta |

---

## Historial de Versiones

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2024-XX-XX | Equipo | Versión inicial |

---

*Documento generado como parte del proyecto de Ingeniería del Software.*
