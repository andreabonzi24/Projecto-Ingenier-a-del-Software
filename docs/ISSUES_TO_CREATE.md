# 📋 Issues a Crear - Plataforma de Citas Médicas

Este documento lista todos los issues que deben crearse según la especificación del proyecto.
Los issues existentes se indican como referencia. Los issues nuevos deben crearse manualmente en GitHub.

**Nota:** Los issues no contienen código en sus descripciones, siguiendo las preferencias del usuario.

---

## Asignaciones de Equipo

| Miembro | Rol | Fases Asignadas |
|---------|-----|-----------------|
| **David** | Análisis + UML | Sprint 1: Análisis, UML |
| **Bons** | Backend + Arquitectura + CI/CD | Sprint 2: Backend, Arquitectura, Sprint 3: CI/CD |
| **Javier** | Product Owner + Frontend | Sprint 3: Frontend, Integración |
| **Julio** | QA + Pruebas | Sprint 4: Pruebas |

---

## Labels Requeridos

Crear los siguientes labels si no existen:

| Label | Color | Descripción |
|-------|-------|-------------|
| `analysis` | #0052CC | Tareas de análisis |
| `uml` | #5319E7 | Diagramas UML |
| `architecture` | #006B75 | Arquitectura del sistema |
| `frontend` | #1D76DB | Desarrollo frontend |
| `backend` | #B60205 | Desarrollo backend |
| `testing` | #FBCA04 | Pruebas y QA |
| `documentation` | #0075CA | Documentación |
| `ci-cd` | #E99695 | CI/CD y automatización |

---

## ANÁLISIS (Sprint 1)

### Issue 1: Requisitos funcionales
**Estado:** ⚠️ Existe similar (#6)

| Campo | Valor |
|-------|-------|
| **Título** | 1. Requisitos funcionales |
| **Label** | `analysis` |
| **Asignado** | David |
| **Story Points** | 5 |
| **Sprint** | 1 |
| **Dependencias** | Ninguna |

**Descripción:**
Identificar y documentar los requisitos funcionales del sistema de citas médicas.

**Subtareas:**
- [ ] Analizar entrevistas y fuentes de requisitos
- [ ] Redactar la lista de requisitos funcionales (RF-XXX)
- [ ] Clasificar por módulo (Autenticación, Citas, Usuarios, Dashboards)
- [ ] Validar requisitos con stakeholders
- [ ] Revisar y actualizar el documento

**Criterios de aceptación:**
- Todos los requisitos funcionales están documentados en formato estándar
- Cada requisito tiene ID único, descripción y criterios de aceptación
- Revisión y aprobación por parte del equipo
- Documento guardado en `/docs/01_REQUISITOS.md`

---

### Issue 2: Requisitos no funcionales
**Estado:** ⚠️ Existe similar (#7)

| Campo | Valor |
|-------|-------|
| **Título** | 2. Requisitos no funcionales |
| **Label** | `analysis` |
| **Asignado** | David |
| **Story Points** | 3 |
| **Sprint** | 1 |
| **Dependencias** | Issue 1 |

**Descripción:**
Identificar y documentar los requisitos no funcionales del sistema según criterios de calidad.

**Subtareas:**
- [ ] Definir requisitos de rendimiento (tiempos de respuesta)
- [ ] Definir requisitos de seguridad (autenticación, autorización)
- [ ] Definir requisitos de usabilidad (responsive, accesibilidad)
- [ ] Definir requisitos de escalabilidad
- [ ] Validar con stakeholders

**Criterios de aceptación:**
- Requisitos no funcionales documentados con métricas medibles
- Clasificados por categoría (rendimiento, seguridad, usabilidad, etc.)
- Documento guardado en `/docs/01_REQUISITOS.md`

---

### Issue 3: Objetivos del sistema
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 3. Objetivos del sistema |
| **Label** | `analysis` |
| **Asignado** | David |
| **Story Points** | 2 |
| **Sprint** | 1 |
| **Dependencias** | Ninguna |

**Descripción:**
Definir los objetivos generales y específicos del sistema de citas médicas.

**Subtareas:**
- [ ] Definir objetivo general del proyecto
- [ ] Identificar objetivos específicos (mínimo 5)
- [ ] Alinear objetivos con requisitos funcionales
- [ ] Validar con Product Owner

**Criterios de aceptación:**
- Objetivo general claramente definido
- Mínimo 5 objetivos específicos documentados
- Cada objetivo es medible y alcanzable
- Documento guardado en `/docs/00_MEMORIA_ING_SOFT.md`

---

### Issue 4: Alcance
**Estado:** ⚠️ Existe similar (#12, #14)

| Campo | Valor |
|-------|-------|
| **Título** | 4. Alcance del proyecto |
| **Label** | `analysis` |
| **Asignado** | David |
| **Story Points** | 3 |
| **Sprint** | 1 |
| **Dependencias** | Issue 3 |

**Descripción:**
Definir los límites, entregables y exclusiones del proyecto.

**Subtareas:**
- [ ] Definir funcionalidades incluidas (in-scope)
- [ ] Definir funcionalidades excluidas (out-of-scope)
- [ ] Listar entregables obligatorios
- [ ] Listar entregables opcionales
- [ ] Validar con equipo

**Criterios de aceptación:**
- Documento de alcance completo
- Lista clara de inclusiones y exclusiones
- Aprobación del equipo

---

### Issue 5: Casos de uso (texto)
**Estado:** ⚠️ Existe similar (#9)

| Campo | Valor |
|-------|-------|
| **Título** | 5. Casos de uso (texto) |
| **Label** | `analysis` |
| **Asignado** | David |
| **Story Points** | 5 |
| **Sprint** | 1 |
| **Dependencias** | Issue 1 |

**Descripción:**
Desarrollar y documentar los casos de uso principales del sistema en formato textual.

**Subtareas:**
- [ ] Identificar actores del sistema
- [ ] Documentar caso de uso: Registro de usuario
- [ ] Documentar caso de uso: Inicio de sesión
- [ ] Documentar caso de uso: Reservar cita
- [ ] Documentar caso de uso: Cancelar cita
- [ ] Documentar caso de uso: Gestionar usuarios (admin)
- [ ] Validar con stakeholders

**Criterios de aceptación:**
- Mínimo 5 casos de uso documentados
- Cada caso de uso incluye: actores, precondiciones, flujo principal, flujos alternativos, postcondiciones
- Formato estándar aplicado

---

## UML (Sprint 1)

### Issue 6: Diagrama de casos de uso
**Estado:** ⚠️ Existe similar (#15)

| Campo | Valor |
|-------|-------|
| **Título** | 6. Diagrama de casos de uso |
| **Label** | `uml` |
| **Asignado** | David |
| **Story Points** | 3 |
| **Sprint** | 1 |
| **Dependencias** | Issue 5 |

**Descripción:**
Crear el diagrama UML de casos de uso basado en los casos de uso textuales.

**Subtareas:**
- [ ] Identificar actores principales en el diagrama
- [ ] Representar casos de uso principales
- [ ] Establecer relaciones (include, extend)
- [ ] Crear diagrama en PlantUML
- [ ] Incluir en documentación

**Criterios de aceptación:**
- Diagrama en formato PlantUML
- Incluye todos los actores identificados
- Incluye relaciones entre casos de uso
- Guardado en `/docs/02_UML.md`

---

### Issue 7: Diagrama de actividad
**Estado:** ⚠️ Existe similar (#16)

| Campo | Valor |
|-------|-------|
| **Título** | 7. Diagrama de actividad |
| **Label** | `uml` |
| **Asignado** | David |
| **Story Points** | 3 |
| **Sprint** | 1 |
| **Dependencias** | Issue 6 |

**Descripción:**
Crear diagramas de actividad para los flujos principales del sistema.

**Subtareas:**
- [ ] Crear diagrama de actividad: Reservar cita
- [ ] Crear diagrama de actividad: Inicio de sesión
- [ ] Crear diagrama de actividad: Cancelar cita
- [ ] Validar flujos con equipo

**Criterios de aceptación:**
- Mínimo 3 diagramas de actividad
- Formato PlantUML
- Flujos completos con decisiones y acciones
- Guardado en `/docs/02_UML.md`

---

### Issue 8: Diagrama de secuencia
**Estado:** ⚠️ Existe similar (#17)

| Campo | Valor |
|-------|-------|
| **Título** | 8. Diagrama de secuencia |
| **Label** | `uml` |
| **Asignado** | David |
| **Story Points** | 5 |
| **Sprint** | 1 |
| **Dependencias** | Issue 7 |

**Descripción:**
Crear diagramas de secuencia para las interacciones principales del sistema.

**Subtareas:**
- [ ] Crear diagrama de secuencia: Login
- [ ] Crear diagrama de secuencia: Reservar cita
- [ ] Crear diagrama de secuencia: Validación de sesión
- [ ] Incluir componentes: Frontend, API, Controllers, Models, DB

**Criterios de aceptación:**
- Mínimo 3 diagramas de secuencia
- Formato PlantUML
- Mensajes entre componentes claramente definidos
- Guardado en `/docs/02_UML.md`

---

### Issue 9: Diagrama de clases
**Estado:** ⚠️ Existe similar (#18)

| Campo | Valor |
|-------|-------|
| **Título** | 9. Diagrama de clases |
| **Label** | `uml` |
| **Asignado** | David |
| **Story Points** | 5 |
| **Sprint** | 1 |
| **Dependencias** | Issue 5 |

**Descripción:**
Crear el diagrama de clases UML del modelo de dominio.

**Subtareas:**
- [ ] Identificar clases principales (User, Appointment, Center, etc.)
- [ ] Definir atributos de cada clase
- [ ] Definir métodos principales
- [ ] Establecer relaciones (herencia, composición, asociación)
- [ ] Crear diagrama en PlantUML

**Criterios de aceptación:**
- Diagrama de clases completo
- Incluye todas las entidades del dominio
- Relaciones correctamente establecidas
- Guardado en `/docs/02_UML.md`

---

## ARQUITECTURA (Sprint 2)

### Issue 10: Documento de arquitectura
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 10. Documento de arquitectura |
| **Label** | `architecture` |
| **Asignado** | Bons |
| **Story Points** | 8 |
| **Sprint** | 2 |
| **Dependencias** | Issues 1-9 |

**Descripción:**
Elaborar el documento técnico de arquitectura del sistema.

**Subtareas:**
- [ ] Definir vista de contexto
- [ ] Documentar decisiones arquitectónicas (ADRs)
- [ ] Especificar patrones de diseño aplicados
- [ ] Definir estructura de componentes
- [ ] Documentar atributos de calidad
- [ ] Incluir diagramas de arquitectura

**Criterios de aceptación:**
- Documento completo de arquitectura
- Mínimo 3 ADRs documentados
- Patrones de diseño justificados
- Guardado en `/docs/03_ARQUITECTURA.md`

---

### Issue 11: Diagrama de componentes
**Estado:** ⚠️ Existe similar (#21)

| Campo | Valor |
|-------|-------|
| **Título** | 11. Diagrama de componentes |
| **Label** | `architecture` |
| **Asignado** | Bons |
| **Story Points** | 3 |
| **Sprint** | 2 |
| **Dependencias** | Issue 10 |

**Descripción:**
Crear el diagrama de componentes de la arquitectura del sistema.

**Subtareas:**
- [ ] Identificar componentes frontend
- [ ] Identificar componentes backend
- [ ] Identificar componentes externos
- [ ] Establecer interfaces entre componentes
- [ ] Crear diagrama en PlantUML

**Criterios de aceptación:**
- Diagrama de componentes completo
- Interfaces claramente definidas
- Guardado en `/docs/03_ARQUITECTURA.md`

---

### Issue 12: Diagrama de despliegue
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 12. Diagrama de despliegue |
| **Label** | `architecture` |
| **Asignado** | Bons |
| **Story Points** | 3 |
| **Sprint** | 2 |
| **Dependencias** | Issue 11 |

**Descripción:**
Crear el diagrama de despliegue de la infraestructura.

**Subtareas:**
- [ ] Identificar nodos de infraestructura
- [ ] Definir configuración de cada entorno (dev, staging, prod)
- [ ] Documentar servicios externos (MongoDB Atlas, Vercel)
- [ ] Crear diagrama en PlantUML

**Criterios de aceptación:**
- Diagrama de despliegue completo
- Incluye todos los entornos
- Guardado en `/docs/03_ARQUITECTURA.md`

---

## IMPLEMENTACIÓN (Sprint 2-3)

### Issue 13: Revisar backend
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 13. Revisar backend |
| **Label** | `backend` |
| **Asignado** | Bons |
| **Story Points** | 5 |
| **Sprint** | 2 |
| **Dependencias** | Issue 10 |

**Descripción:**
Revisar y validar la implementación del backend según la arquitectura definida.

**Subtareas:**
- [ ] Revisar estructura de carpetas
- [ ] Validar implementación de modelos
- [ ] Revisar controladores y rutas
- [ ] Verificar middlewares de autenticación
- [ ] Revisar manejo de errores
- [ ] Documentar hallazgos

**Criterios de aceptación:**
- Backend alineado con arquitectura
- Endpoints documentados
- Sin vulnerabilidades críticas

---

### Issue 14: Revisar frontend
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 14. Revisar frontend |
| **Label** | `frontend` |
| **Asignado** | Javier |
| **Story Points** | 5 |
| **Sprint** | 3 |
| **Dependencias** | Issue 13 |

**Descripción:**
Revisar y validar la implementación del frontend.

**Subtareas:**
- [ ] Revisar estructura de archivos HTML/CSS/JS
- [ ] Validar diseño responsivo
- [ ] Verificar integración con API
- [ ] Revisar manejo de sesiones en cliente
- [ ] Validar accesibilidad básica
- [ ] Documentar hallazgos

**Criterios de aceptación:**
- Frontend funcional en todos los dashboards
- Diseño responsivo verificado
- Integración con API funcionando

---

### Issue 15: Integración full
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 15. Integración full |
| **Label** | `backend`, `frontend` |
| **Asignado** | Bons, Javier |
| **Story Points** | 8 |
| **Sprint** | 3 |
| **Dependencias** | Issues 13, 14 |

**Descripción:**
Integrar completamente frontend y backend, verificando todos los flujos.

**Subtareas:**
- [ ] Verificar flujo de registro
- [ ] Verificar flujo de login/logout
- [ ] Verificar flujo de citas (CRUD)
- [ ] Verificar dashboards por rol
- [ ] Probar en diferentes navegadores
- [ ] Documentar problemas encontrados

**Criterios de aceptación:**
- Todos los flujos principales funcionando
- Sin errores de integración críticos
- Documentación de pruebas de integración

---

### Issue 16: Seguridad + roles
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 16. Seguridad + roles |
| **Label** | `backend` |
| **Asignado** | Bons |
| **Story Points** | 5 |
| **Sprint** | 3 |
| **Dependencias** | Issue 15 |

**Descripción:**
Revisar y reforzar la seguridad del sistema y el control de acceso por roles.

**Subtareas:**
- [ ] Verificar protección de rutas por rol
- [ ] Revisar configuración de CORS
- [ ] Verificar headers de seguridad (Helmet)
- [ ] Revisar rate limiting
- [ ] Verificar sanitización de inputs
- [ ] Documentar configuración de seguridad

**Criterios de aceptación:**
- Rutas protegidas correctamente
- Sin vulnerabilidades conocidas
- Documentación de seguridad actualizada

---

### Issue 17: Validación JWT
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 17. Validación JWT |
| **Label** | `backend` |
| **Asignado** | Bons |
| **Story Points** | 3 |
| **Sprint** | 3 |
| **Dependencias** | Issue 16 |

**Descripción:**
Revisar y validar la implementación de JWT en el sistema.

**Subtareas:**
- [ ] Verificar generación de tokens
- [ ] Verificar validación de tokens
- [ ] Verificar expiración de tokens
- [ ] Verificar refresh de tokens (si aplica)
- [ ] Documentar flujo de autenticación

**Criterios de aceptación:**
- JWT funcionando correctamente
- Tokens expiran según configuración
- Flujo de autenticación documentado

---

## PRUEBAS (Sprint 4)

### Issue 18: Plan de pruebas
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 18. Plan de pruebas |
| **Label** | `testing` |
| **Asignado** | Julio |
| **Story Points** | 5 |
| **Sprint** | 4 |
| **Dependencias** | Issue 15 |

**Descripción:**
Elaborar el plan de pruebas completo del sistema.

**Subtareas:**
- [ ] Definir estrategia de pruebas
- [ ] Identificar tipos de pruebas a realizar
- [ ] Definir criterios de entrada y salida
- [ ] Establecer métricas de calidad
- [ ] Planificar recursos y cronograma

**Criterios de aceptación:**
- Plan de pruebas completo
- Guardado en `/docs/04_PLAN_PRUEBAS.md`

---

### Issue 19: Casos de prueba
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 19. Casos de prueba |
| **Label** | `testing` |
| **Asignado** | Julio |
| **Story Points** | 8 |
| **Sprint** | 4 |
| **Dependencias** | Issue 18 |

**Descripción:**
Desarrollar casos de prueba detallados para el sistema.

**Subtareas:**
- [ ] Crear casos de prueba para autenticación
- [ ] Crear casos de prueba para gestión de citas
- [ ] Crear casos de prueba para dashboards
- [ ] Crear casos de prueba de seguridad
- [ ] Documentar datos de prueba necesarios

**Criterios de aceptación:**
- Mínimo 20 casos de prueba documentados
- Casos de prueba cubren funcionalidades principales
- Guardado en `/docs/04_PLAN_PRUEBAS.md`

---

### Issue 20: Pruebas UAT/OAT
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 20. Pruebas UAT/OAT |
| **Label** | `testing` |
| **Asignado** | Julio |
| **Story Points** | 5 |
| **Sprint** | 4 |
| **Dependencias** | Issue 19 |

**Descripción:**
Ejecutar pruebas de aceptación de usuario y operacionales.

**Subtareas:**
- [ ] Preparar escenarios UAT
- [ ] Ejecutar pruebas UAT con usuarios representativos
- [ ] Preparar checklist OAT
- [ ] Ejecutar verificaciones operacionales
- [ ] Documentar resultados

**Criterios de aceptación:**
- Pruebas UAT ejecutadas y documentadas
- Checklist OAT completado
- Defectos encontrados registrados

---

### Issue 21: E2E tests
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 21. E2E tests |
| **Label** | `testing` |
| **Asignado** | Julio |
| **Story Points** | 8 |
| **Sprint** | 4 |
| **Dependencias** | Issue 19 |

**Descripción:**
Implementar pruebas end-to-end automatizadas (si el tiempo lo permite).

**Subtareas:**
- [ ] Configurar herramienta de E2E (Playwright/Cypress)
- [ ] Crear test E2E: Flujo de registro
- [ ] Crear test E2E: Flujo de login
- [ ] Crear test E2E: Flujo de reserva de cita
- [ ] Integrar con CI

**Criterios de aceptación:**
- Mínimo 3 tests E2E implementados
- Tests ejecutables en CI
- Documentación de cómo ejecutar tests

---

### Issue 22: Validación de demo
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 22. Validación de demo |
| **Label** | `testing` |
| **Asignado** | Julio |
| **Story Points** | 3 |
| **Sprint** | 4 |
| **Dependencias** | Issues 20, 21 |

**Descripción:**
Validar que el sistema está listo para la demostración final.

**Subtareas:**
- [ ] Ejecutar checklist de demo
- [ ] Verificar todos los flujos críticos
- [ ] Verificar datos de prueba
- [ ] Documentar estado final

**Criterios de aceptación:**
- Checklist de demo completado sin errores críticos
- Sistema listo para presentación
- Documentación de validación

---

## CI/CD (Sprint 3-4)

### Issue 23: Workflow CI
**Estado:** 🆕 NUEVO (Implementado en este PR)

| Campo | Valor |
|-------|-------|
| **Título** | 23. Workflow CI |
| **Label** | `ci-cd` |
| **Asignado** | Bons |
| **Story Points** | 5 |
| **Sprint** | 3 |
| **Dependencias** | Issue 13 |

**Descripción:**
Configurar workflow de integración continua con GitHub Actions.

**Subtareas:**
- [x] Crear `.github/workflows/ci.yml`
- [x] Configurar job de linting
- [x] Configurar job de tests
- [x] Configurar job de build
- [x] Configurar job de auditoría de seguridad

**Criterios de aceptación:**
- CI ejecuta en cada push/PR
- Linting, tests y build funcionando
- Archivo guardado en `.github/workflows/ci.yml`

---

### Issue 24: Workflow tests
**Estado:** 🆕 NUEVO (Parcialmente implementado)

| Campo | Valor |
|-------|-------|
| **Título** | 24. Workflow tests |
| **Label** | `ci-cd` |
| **Asignado** | Bons |
| **Story Points** | 3 |
| **Sprint** | 4 |
| **Dependencias** | Issue 23 |

**Descripción:**
Configurar ejecución de tests en CI con reportes de cobertura.

**Subtareas:**
- [x] Configurar Jest en package.json
- [ ] Configurar reporte de cobertura
- [ ] Configurar badge de cobertura (opcional)
- [ ] Documentar cómo ejecutar tests

**Criterios de aceptación:**
- Tests ejecutan en CI
- Reporte de cobertura disponible

---

### Issue 25: Automatización de movimientos en Project
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 25. Automatización de movimientos en Project |
| **Label** | `ci-cd` |
| **Asignado** | Bons |
| **Story Points** | 5 |
| **Sprint** | 4 |
| **Dependencias** | Issue 23 |

**Descripción:**
Configurar automatizaciones del GitHub Project board.

**Subtareas:**
- [ ] Configurar movimiento automático al abrir PR
- [ ] Configurar movimiento automático al cerrar issue
- [ ] Configurar movimiento automático al asignar issue
- [ ] Documentar automatizaciones

**Criterios de aceptación:**
- Automatizaciones funcionando en Project
- Documentación de configuración

---

## PRESENTACIÓN (Sprint 4)

### Issue 26: Preparar presentación
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 26. Preparar presentación |
| **Label** | `documentation` |
| **Asignado** | Javier, David |
| **Story Points** | 5 |
| **Sprint** | 4 |
| **Dependencias** | Todos los anteriores |

**Descripción:**
Preparar la presentación final del proyecto.

**Subtareas:**
- [ ] Crear slides de presentación
- [ ] Incluir resumen del proyecto
- [ ] Incluir metodología aplicada
- [ ] Incluir arquitectura y tecnologías
- [ ] Incluir demo del sistema
- [ ] Incluir lecciones aprendidas

**Criterios de aceptación:**
- Presentación completa (15-20 minutos)
- Todos los puntos del temario cubiertos

---

### Issue 27: Crear demo guiada
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 27. Crear demo guiada |
| **Label** | `documentation` |
| **Asignado** | Javier |
| **Story Points** | 3 |
| **Sprint** | 4 |
| **Dependencias** | Issue 22 |

**Descripción:**
Crear guión detallado para la demostración del sistema.

**Subtareas:**
- [x] Crear guía de demo en `/docs/06_GUIA_DEMO.md`
- [ ] Definir escenarios a mostrar
- [ ] Preparar datos de prueba para demo
- [ ] Ensayar la demo

**Criterios de aceptación:**
- Guía de demo completa
- Datos de prueba preparados
- Demo ensayada

---

### Issue 28: Ensayo final
**Estado:** 🆕 NUEVO

| Campo | Valor |
|-------|-------|
| **Título** | 28. Ensayo final |
| **Label** | `documentation` |
| **Asignado** | Javier, David, Bons, Julio |
| **Story Points** | 2 |
| **Sprint** | 4 |
| **Dependencias** | Issues 26, 27 |

**Descripción:**
Realizar ensayo final de la presentación y demo.

**Subtareas:**
- [ ] Ensayo completo de presentación
- [ ] Ensayo completo de demo
- [ ] Ajustes según feedback
- [ ] Verificación final de tiempos

**Criterios de aceptación:**
- Ensayo completado
- Presentación ajustada a tiempo límite
- Equipo preparado para presentación final

---

## Resumen de Dependencias

```
Sprint 1 (Análisis + UML):
Issue 1 → Issue 2 → Issue 5 → Issues 6,7,8,9
Issue 3 → Issue 4

Sprint 2 (Arquitectura + Backend):
Issues 1-9 → Issue 10 → Issues 11,12,13

Sprint 3 (Frontend + Integración + CI/CD):
Issue 13 → Issue 14 → Issue 15 → Issues 16,17
Issue 13 → Issue 23 → Issue 24

Sprint 4 (Pruebas + Presentación):
Issue 15 → Issue 18 → Issue 19 → Issues 20,21 → Issue 22
Issue 22 → Issue 27
Todos → Issues 26,28
```

---

## Estado de Issues

| # | Título | Estado | Issue GitHub |
|---|--------|--------|--------------|
| 1 | Requisitos funcionales | ⚠️ Similar | #6 |
| 2 | Requisitos no funcionales | ⚠️ Similar | #7 |
| 3 | Objetivos del sistema | 🆕 Crear | - |
| 4 | Alcance | ⚠️ Similar | #12, #14 |
| 5 | Casos de uso (texto) | ⚠️ Similar | #9 |
| 6 | Diagrama de casos de uso | ⚠️ Similar | #15 |
| 7 | Diagrama de actividad | ⚠️ Similar | #16 |
| 8 | Diagrama de secuencia | ⚠️ Similar | #17 |
| 9 | Diagrama de clases | ⚠️ Similar | #18 |
| 10 | Documento de arquitectura | 🆕 Crear | - |
| 11 | Diagrama de componentes | ⚠️ Similar | #21 |
| 12 | Diagrama de despliegue | 🆕 Crear | - |
| 13 | Revisar backend | 🆕 Crear | - |
| 14 | Revisar frontend | 🆕 Crear | - |
| 15 | Integración full | 🆕 Crear | - |
| 16 | Seguridad + roles | 🆕 Crear | - |
| 17 | Validación JWT | 🆕 Crear | - |
| 18 | Plan de pruebas | 🆕 Crear | - |
| 19 | Casos de prueba | 🆕 Crear | - |
| 20 | Pruebas UAT/OAT | 🆕 Crear | - |
| 21 | E2E tests | 🆕 Crear | - |
| 22 | Validación de demo | 🆕 Crear | - |
| 23 | Workflow CI | ✅ Implementado | - |
| 24 | Workflow tests | 🔄 Parcial | - |
| 25 | Automatización Project | 🆕 Crear | - |
| 26 | Preparar presentación | 🆕 Crear | - |
| 27 | Crear demo guiada | ✅ Docs creados | - |
| 28 | Ensayo final | 🆕 Crear | - |

---

**Leyenda:**
- 🆕 Crear: Issue nuevo que debe crearse
- ⚠️ Similar: Ya existe un issue similar, revisar si es necesario crear otro
- ✅ Implementado: Ya implementado en este PR
- 🔄 Parcial: Parcialmente implementado
