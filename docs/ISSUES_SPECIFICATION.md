# Especificación de Issues para GitHub

## Plataforma de Citas Médicas - SCRUM+XP Setup

---

Este documento contiene la especificación completa de los 28 issues a crear en GitHub para la gestión del proyecto utilizando metodología SCRUM+XP.

## Instrucciones de Creación

Para crear cada issue:
1. Ir a GitHub > Issues > New Issue
2. Copiar título y descripción
3. Asignar labels correspondientes
4. Asignar al usuario indicado
5. Establecer el Sprint en el campo personalizado del Proyecto

---

## Issues de Sprint 1: Análisis y Diseño

### Issue #1: Requisitos funcionales

**Título:** `1. Requisitos funcionales`

**Descripción:**
```markdown
## Descripción
Documentar todos los requisitos funcionales del sistema de citas médicas según el estándar IEEE 830.

## Tareas
- [ ] Identificar y documentar requisitos de autenticación (RF-001 a RF-006)
- [ ] Documentar requisitos de gestión de citas (RF-007 a RF-012)
- [ ] Documentar requisitos de dashboards (RF-013 a RF-024)
- [ ] Documentar requisitos de notificaciones (RF-025 a RF-028)
- [ ] Documentar requisitos de análisis (RF-029 a RF-032)
- [ ] Crear matriz de trazabilidad inicial

## Criterios de Aceptación
- [ ] Todos los requisitos tienen ID único
- [ ] Cada requisito tiene prioridad asignada
- [ ] Matriz de trazabilidad completa
- [ ] Documento revisado por el equipo

## Estimación
**Story Points:** 5

## Dependencias
- Ninguna (primer issue de análisis)
- Bloquea: #5, #6, #7, #8, #9
```

**Labels:** `analysis`, `documentation`
**Asignado a:** David
**Sprint:** Sprint 1

---

### Issue #2: Requisitos no funcionales

**Título:** `2. Requisitos no funcionales`

**Descripción:**
```markdown
## Descripción
Documentar todos los requisitos no funcionales del sistema incluyendo rendimiento, seguridad, usabilidad y mantenibilidad.

## Tareas
- [ ] Documentar requisitos de rendimiento (RNF-001 a RNF-003)
- [ ] Documentar requisitos de seguridad (RNF-004 a RNF-008)
- [ ] Documentar requisitos de usabilidad (RNF-009 a RNF-012)
- [ ] Documentar requisitos de mantenibilidad (RNF-013 a RNF-016)
- [ ] Documentar requisitos de portabilidad (RNF-017 a RNF-021)
- [ ] Definir métricas de validación para cada requisito

## Criterios de Aceptación
- [ ] Cada RNF tiene métrica medible
- [ ] Requisitos de seguridad validados contra OWASP
- [ ] Compatibilidad de navegadores especificada
- [ ] Documento revisado y aprobado

## Estimación
**Story Points:** 3

## Dependencias
- Depende de: #1
- Bloquea: #16
```

**Labels:** `analysis`, `documentation`
**Asignado a:** David
**Sprint:** Sprint 1

---

### Issue #3: Casos de uso

**Título:** `3. Casos de uso`

**Descripción:**
```markdown
## Descripción
Definir y documentar todos los casos de uso del sistema con sus flujos principales y alternativos.

## Tareas
- [ ] Identificar actores del sistema
- [ ] Documentar CU de autenticación (CU-001 a CU-003)
- [ ] Documentar CU de gestión de citas (CU-004 a CU-008)
- [ ] Documentar CU de dashboards (CU-009 a CU-012)
- [ ] Documentar CU de administración (CU-013 a CU-015)
- [ ] Crear diagrama de casos de uso general

## Criterios de Aceptación
- [ ] Todos los CU tienen flujo principal documentado
- [ ] Flujos alternativos identificados
- [ ] Pre y post condiciones definidas
- [ ] Diagrama UML generado

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #1
- Bloquea: #5, #6
```

**Labels:** `analysis`, `uml`
**Asignado a:** David
**Sprint:** Sprint 1

---

### Issue #4: Alcance

**Título:** `4. Alcance`

**Descripción:**
```markdown
## Descripción
Definir claramente el alcance del proyecto, incluyendo funcionalidades incluidas, excluidas y limitaciones.

## Tareas
- [ ] Definir funcionalidades incluidas en el MVP
- [ ] Documentar funcionalidades fuera del alcance
- [ ] Identificar supuestos y restricciones
- [ ] Establecer criterios de éxito del proyecto
- [ ] Documentar dependencias externas
- [ ] Crear documento de alcance formal

## Criterios de Aceptación
- [ ] Alcance aprobado por Product Owner
- [ ] Lista clara de funcionalidades in/out
- [ ] Riesgos identificados y documentados
- [ ] Criterios de éxito medibles

## Estimación
**Story Points:** 3

## Dependencias
- Depende de: #1, #2
- Bloquea: #10, #11, #12, #13
```

**Labels:** `analysis`, `documentation`
**Asignado a:** David
**Sprint:** Sprint 1

---

## Issues de Sprint 2: Modelado UML

### Issue #5: Diagrama de clases

**Título:** `5. Diagrama de clases`

**Descripción:**
```markdown
## Descripción
Crear el diagrama de clases completo del sistema mostrando entidades, atributos, métodos y relaciones.

## Tareas
- [ ] Modelar clase User con atributos y métodos
- [ ] Modelar clase Appointment con estados
- [ ] Modelar clase Center con relaciones
- [ ] Modelar clases de servicio (AuthService, AppointmentService, etc.)
- [ ] Definir relaciones entre clases
- [ ] Documentar multiplicidades

## Criterios de Aceptación
- [ ] Diagrama en formato PlantUML
- [ ] Todas las entidades del modelo de datos incluidas
- [ ] Relaciones correctamente definidas
- [ ] Métodos principales documentados

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #1, #3
- Bloquea: #10, #11, #12
```

**Labels:** `uml`, `documentation`
**Asignado a:** David
**Sprint:** Sprint 2

---

### Issue #6: Diagramas de secuencia

**Título:** `6. Diagramas de secuencia`

**Descripción:**
```markdown
## Descripción
Crear diagramas de secuencia para los flujos principales del sistema.

## Tareas
- [ ] Diagrama de secuencia: Login
- [ ] Diagrama de secuencia: Registro de usuario
- [ ] Diagrama de secuencia: Reservar cita
- [ ] Diagrama de secuencia: Cancelar cita
- [ ] Diagrama de secuencia: Ver agenda (médico)
- [ ] Documentar mensajes y respuestas

## Criterios de Aceptación
- [ ] Diagramas en formato PlantUML
- [ ] Flujos de error incluidos
- [ ] Interacciones con BD documentadas
- [ ] Consistente con diagrama de clases

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #3, #5
- Bloquea: #14, #15
```

**Labels:** `uml`, `documentation`
**Asignado a:** David
**Sprint:** Sprint 2

---

### Issue #7: Diagrama de estados

**Título:** `7. Diagrama de estados`

**Descripción:**
```markdown
## Descripción
Crear diagramas de estados para las entidades principales con transiciones de estado.

## Tareas
- [ ] Diagrama de estados: Cita (Pending → Confirmed → Completed/Cancelled)
- [ ] Diagrama de estados: Usuario (Registered → Active → Suspended)
- [ ] Diagrama de estados: Autenticación
- [ ] Documentar eventos que disparan transiciones
- [ ] Identificar estados finales

## Criterios de Aceptación
- [ ] Diagramas en formato PlantUML
- [ ] Todos los estados posibles identificados
- [ ] Transiciones con eventos documentados
- [ ] Estados consistentes con modelo de datos

## Estimación
**Story Points:** 3

## Dependencias
- Depende de: #5
- Bloquea: #14
```

**Labels:** `uml`, `documentation`
**Asignado a:** David
**Sprint:** Sprint 2

---

### Issue #8: Diagrama de actividades

**Título:** `8. Diagrama de actividades`

**Descripción:**
```markdown
## Descripción
Crear diagramas de actividades para los procesos de negocio principales.

## Tareas
- [ ] Diagrama de actividades: Proceso de reserva de cita
- [ ] Diagrama de actividades: Proceso de autenticación
- [ ] Diagrama de actividades: Proceso de cancelación
- [ ] Incluir decisiones y bifurcaciones
- [ ] Identificar actividades paralelas

## Criterios de Aceptación
- [ ] Diagramas en formato PlantUML
- [ ] Decisiones claramente marcadas
- [ ] Flujo lógico y completo
- [ ] Consistente con casos de uso

## Estimación
**Story Points:** 3

## Dependencias
- Depende de: #3
- Bloquea: #17
```

**Labels:** `uml`, `documentation`
**Asignado a:** David
**Sprint:** Sprint 2

---

### Issue #9: Diagrama de componentes y despliegue

**Título:** `9. Diagrama de componentes y despliegue`

**Descripción:**
```markdown
## Descripción
Crear diagramas de componentes y despliegue que muestren la arquitectura física y lógica del sistema.

## Tareas
- [ ] Diagrama de componentes: Frontend modules
- [ ] Diagrama de componentes: Backend layers
- [ ] Diagrama de despliegue: Infraestructura
- [ ] Diagrama de despliegue: Entornos (dev, staging, prod)
- [ ] Documentar interfaces entre componentes

## Criterios de Aceptación
- [ ] Diagramas en formato PlantUML
- [ ] Componentes del frontend identificados
- [ ] Capas del backend documentadas
- [ ] Infraestructura de despliegue clara

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #5
- Bloquea: #18, #19, #20, #21
```

**Labels:** `uml`, `architecture`
**Asignado a:** David
**Sprint:** Sprint 2

---

## Issues de Sprint 3: Implementación

### Issue #10: Implementación API de autenticación

**Título:** `10. Implementación API de autenticación`

**Descripción:**
```markdown
## Descripción
Implementar o verificar los endpoints de autenticación del backend (registro, login, logout).

## Tareas
- [ ] Verificar endpoint POST /api/auth/register
- [ ] Verificar endpoint POST /api/auth/login
- [ ] Verificar endpoint GET /api/auth/me
- [ ] Verificar middleware de autenticación JWT
- [ ] Implementar validación de datos de entrada
- [ ] Agregar manejo de errores apropiado

## Criterios de Aceptación
- [ ] Todos los endpoints responden correctamente
- [ ] JWT generado y validado correctamente
- [ ] Contraseñas hasheadas con bcrypt
- [ ] Errores devueltos con códigos HTTP correctos

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #5, #4
- Bloquea: #14, #22
```

**Labels:** `backend`
**Asignado a:** Bons
**Sprint:** Sprint 3

---

### Issue #11: Implementación API de citas

**Título:** `11. Implementación API de citas`

**Descripción:**
```markdown
## Descripción
Implementar o verificar los endpoints de gestión de citas médicas.

## Tareas
- [ ] Verificar endpoint POST /api/appointments (crear)
- [ ] Verificar endpoint GET /api/appointments (listar)
- [ ] Verificar endpoint GET /api/appointments/:id (obtener)
- [ ] Verificar endpoint PUT /api/appointments/:id (actualizar)
- [ ] Verificar endpoint DELETE /api/appointments/:id (cancelar)
- [ ] Implementar validación de disponibilidad

## Criterios de Aceptación
- [ ] CRUD completo de citas funcional
- [ ] Validación de conflictos de horario
- [ ] Filtrado por paciente/médico funcional
- [ ] Estados de cita manejados correctamente

## Estimación
**Story Points:** 8

## Dependencias
- Depende de: #5, #10
- Bloquea: #15, #23
```

**Labels:** `backend`
**Asignado a:** Bons
**Sprint:** Sprint 3

---

### Issue #12: Implementación dashboard paciente

**Título:** `12. Implementación dashboard paciente`

**Descripción:**
```markdown
## Descripción
Verificar e implementar mejoras en el dashboard del paciente.

## Tareas
- [ ] Verificar visualización de próximas citas
- [ ] Verificar visualización de historial
- [ ] Implementar acceso rápido a reserva de cita
- [ ] Verificar integración con API
- [ ] Implementar notificaciones en dashboard
- [ ] Mejorar UX/UI según feedback

## Criterios de Aceptación
- [ ] Dashboard carga datos correctamente
- [ ] Navegación fluida entre secciones
- [ ] Diseño responsive funcional
- [ ] Integración con backend verificada

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #5, #10, #11
- Bloquea: #17, #24
```

**Labels:** `frontend`
**Asignado a:** Javier
**Sprint:** Sprint 3

---

### Issue #13: Implementación dashboard médico

**Título:** `13. Implementación dashboard médico`

**Descripción:**
```markdown
## Descripción
Verificar e implementar mejoras en el dashboard del médico.

## Tareas
- [ ] Verificar visualización de agenda del día
- [ ] Verificar lista de pacientes
- [ ] Implementar gestión de disponibilidad
- [ ] Verificar funcionalidad de marcar cita atendida
- [ ] Implementar estadísticas básicas
- [ ] Mejorar UX/UI según feedback

## Criterios de Aceptación
- [ ] Agenda del día funcional
- [ ] Gestión de citas correcta
- [ ] Estadísticas visibles
- [ ] Diseño responsive funcional

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #5, #10, #11
- Bloquea: #17, #24
```

**Labels:** `frontend`
**Asignado a:** Javier
**Sprint:** Sprint 3

---

### Issue #14: Implementación dashboard administrador

**Título:** `14. Implementación dashboard administrador`

**Descripción:**
```markdown
## Descripción
Verificar e implementar mejoras en el dashboard de administrador.

## Tareas
- [ ] Verificar gestión de usuarios
- [ ] Verificar gestión de centros médicos
- [ ] Implementar visualización de métricas
- [ ] Verificar funcionalidades CRUD
- [ ] Implementar reportes básicos
- [ ] Mejorar UX/UI según feedback

## Criterios de Aceptación
- [ ] CRUD de usuarios funcional
- [ ] CRUD de centros funcional
- [ ] Métricas visibles
- [ ] Control de acceso verificado

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #5, #10, #11
- Bloquea: #17, #24
```

**Labels:** `frontend`
**Asignado a:** Javier
**Sprint:** Sprint 3

---

### Issue #15: Implementación sistema de notificaciones

**Título:** `15. Implementación sistema de notificaciones`

**Descripción:**
```markdown
## Descripción
Implementar el sistema de notificaciones para alertas y recordatorios.

## Tareas
- [ ] Verificar modelo de notificaciones en BD
- [ ] Implementar API de notificaciones
- [ ] Implementar centro de notificaciones en UI
- [ ] Implementar badge de notificaciones no leídas
- [ ] Implementar marcado como leída
- [ ] Verificar integración con eventos de citas

## Criterios de Aceptación
- [ ] Notificaciones se crean correctamente
- [ ] Badge actualiza en tiempo real
- [ ] Notificaciones marcables como leídas
- [ ] UI de centro de notificaciones funcional

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #5, #11
- Bloquea: #24
```

**Labels:** `frontend`, `backend`
**Asignado a:** Javier
**Sprint:** Sprint 3

---

### Issue #16: Implementación módulo de análisis

**Título:** `16. Implementación módulo de análisis`

**Descripción:**
```markdown
## Descripción
Implementar el dashboard de análisis y estadísticas del sistema.

## Tareas
- [ ] Implementar API de estadísticas
- [ ] Crear visualizaciones de métricas
- [ ] Implementar filtros de fecha
- [ ] Agregar gráficos interactivos
- [ ] Implementar exportación básica
- [ ] Verificar permisos de acceso

## Criterios de Aceptación
- [ ] Estadísticas calculadas correctamente
- [ ] Gráficos renderizados
- [ ] Filtros funcionales
- [ ] Solo accesible para admin/centro

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #11, #14
- Bloquea: #24
```

**Labels:** `frontend`, `backend`
**Asignado a:** Javier
**Sprint:** Sprint 3

---

### Issue #17: Implementación navegación y accesibilidad

**Título:** `17. Implementación navegación y accesibilidad`

**Descripción:**
```markdown
## Descripción
Verificar y mejorar la navegación del sistema y cumplimiento de accesibilidad.

## Tareas
- [ ] Verificar navegación entre páginas
- [ ] Implementar breadcrumbs donde aplique
- [ ] Verificar accesibilidad WCAG 2.1 AA
- [ ] Implementar skip links
- [ ] Verificar contraste de colores
- [ ] Verificar navegación por teclado

## Criterios de Aceptación
- [ ] Navegación consistente
- [ ] Auditoría de accesibilidad pasada
- [ ] Navegación por teclado funcional
- [ ] ARIA labels implementados

## Estimación
**Story Points:** 3

## Dependencias
- Depende de: #12, #13, #14
- Bloquea: #25
```

**Labels:** `frontend`
**Asignado a:** Javier
**Sprint:** Sprint 3

---

### Issue #18: Configuración CI pipeline

**Título:** `18. Configuración CI pipeline`

**Descripción:**
```markdown
## Descripción
Configurar el pipeline de integración continua con GitHub Actions.

## Tareas
- [ ] Crear workflow ci.yml
- [ ] Configurar job de lint
- [ ] Configurar job de tests
- [ ] Configurar job de build
- [ ] Agregar upload de artefactos
- [ ] Verificar ejecución en PRs

## Criterios de Aceptación
- [ ] CI ejecuta en cada push/PR
- [ ] Lint detecta errores de estilo
- [ ] Tests ejecutan correctamente
- [ ] Build genera artefactos

## Estimación
**Story Points:** 3

## Dependencias
- Depende de: #9
- Bloquea: #20
```

**Labels:** `ci-cd`
**Asignado a:** Bons
**Sprint:** Sprint 3

---

### Issue #19: Configuración CD pipeline

**Título:** `19. Configuración CD pipeline`

**Descripción:**
```markdown
## Descripción
Configurar el pipeline de despliegue continuo.

## Tareas
- [ ] Crear workflow deploy.yml
- [ ] Configurar deploy a staging
- [ ] Configurar deploy a producción
- [ ] Configurar secrets de Vercel
- [ ] Implementar health checks
- [ ] Documentar proceso de rollback

## Criterios de Aceptación
- [ ] Deploy automático a staging en develop
- [ ] Deploy a producción en main
- [ ] Health checks funcionales
- [ ] Documentación de rollback

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #9, #18
- Bloquea: #21
```

**Labels:** `ci-cd`
**Asignado a:** Bons
**Sprint:** Sprint 3

---

## Issues de Sprint 4: Testing y Presentación

### Issue #20: Configuración entornos

**Título:** `20. Configuración entornos`

**Descripción:**
```markdown
## Descripción
Configurar los diferentes entornos del sistema (desarrollo, staging, producción).

## Tareas
- [ ] Configurar variables de entorno por ambiente
- [ ] Configurar BD de staging en MongoDB Atlas
- [ ] Configurar BD de producción
- [ ] Configurar secrets en GitHub
- [ ] Documentar configuración de cada entorno
- [ ] Verificar aislamiento de datos

## Criterios de Aceptación
- [ ] Entornos aislados correctamente
- [ ] Variables de entorno documentadas
- [ ] Secrets configurados en GitHub
- [ ] Documentación completa

## Estimación
**Story Points:** 3

## Dependencias
- Depende de: #18, #19
- Bloquea: #21
```

**Labels:** `ci-cd`
**Asignado a:** Bons
**Sprint:** Sprint 4

---

### Issue #21: Documentación CI/CD

**Título:** `21. Documentación CI/CD`

**Descripción:**
```markdown
## Descripción
Documentar completamente la configuración y uso del sistema CI/CD.

## Tareas
- [ ] Documentar workflows de GitHub Actions
- [ ] Crear guía de troubleshooting
- [ ] Documentar proceso de despliegue
- [ ] Documentar configuración de entornos
- [ ] Crear runbook de operaciones
- [ ] Documentar métricas de CI/CD

## Criterios de Aceptación
- [ ] Documentación en /docs/05_CI_CD.md
- [ ] Guía de troubleshooting completa
- [ ] Proceso de despliegue claro
- [ ] Métricas definidas

## Estimación
**Story Points:** 3

## Dependencias
- Depende de: #18, #19, #20
- Bloquea: #26
```

**Labels:** `documentation`, `ci-cd`
**Asignado a:** Bons
**Sprint:** Sprint 4

---

### Issue #22: Pruebas unitarias backend

**Título:** `22. Pruebas unitarias backend`

**Descripción:**
```markdown
## Descripción
Implementar pruebas unitarias para el backend con cobertura ≥80%.

## Tareas
- [ ] Configurar Jest para backend
- [ ] Escribir tests para authController
- [ ] Escribir tests para appointmentController
- [ ] Escribir tests para modelos
- [ ] Escribir tests para middlewares
- [ ] Configurar reporte de cobertura

## Criterios de Aceptación
- [ ] Cobertura de código ≥80%
- [ ] Tests ejecutan en CI
- [ ] Reporte de cobertura generado
- [ ] Casos de error cubiertos

## Estimación
**Story Points:** 8

## Dependencias
- Depende de: #10, #11
- Bloquea: #26
```

**Labels:** `testing`
**Asignado a:** Julio
**Sprint:** Sprint 4

---

### Issue #23: Pruebas de integración

**Título:** `23. Pruebas de integración`

**Descripción:**
```markdown
## Descripción
Implementar pruebas de integración para validar la comunicación entre componentes.

## Tareas
- [ ] Configurar entorno de pruebas de integración
- [ ] Escribir tests de integración API + MongoDB
- [ ] Escribir tests de flujo de autenticación
- [ ] Escribir tests de flujo de citas
- [ ] Configurar base de datos de pruebas
- [ ] Integrar con CI

## Criterios de Aceptación
- [ ] Tests de integración ejecutan en CI
- [ ] Flujos principales cubiertos
- [ ] BD de pruebas configurada
- [ ] Tests independientes y repetibles

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #10, #11, #22
- Bloquea: #26
```

**Labels:** `testing`
**Asignado a:** Julio
**Sprint:** Sprint 4

---

### Issue #24: Pruebas de rendimiento y seguridad

**Título:** `24. Pruebas de rendimiento y seguridad`

**Descripción:**
```markdown
## Descripción
Ejecutar pruebas de rendimiento y seguridad del sistema.

## Tareas
- [ ] Configurar Artillery/k6 para pruebas de carga
- [ ] Ejecutar pruebas de rendimiento
- [ ] Ejecutar auditoría de seguridad con OWASP ZAP
- [ ] Ejecutar Lighthouse para frontend
- [ ] Documentar resultados
- [ ] Crear plan de mejoras si es necesario

## Criterios de Aceptación
- [ ] Tiempo de respuesta API <500ms
- [ ] Soporte de 100 usuarios concurrentes
- [ ] Sin vulnerabilidades críticas
- [ ] Lighthouse score >80

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #12, #13, #14, #15, #16
- Bloquea: #26
```

**Labels:** `testing`
**Asignado a:** Julio
**Sprint:** Sprint 4

---

### Issue #25: Pruebas E2E

**Título:** `25. Pruebas E2E`

**Descripción:**
```markdown
## Descripción
Implementar pruebas end-to-end para los flujos principales del sistema.

## Tareas
- [ ] Configurar Cypress o Playwright
- [ ] Escribir test E2E: Registro de usuario
- [ ] Escribir test E2E: Login y dashboard
- [ ] Escribir test E2E: Reservar cita completo
- [ ] Escribir test E2E: Cancelar cita
- [ ] Integrar con CI

## Criterios de Aceptación
- [ ] Tests E2E ejecutan en CI
- [ ] Flujos principales cubiertos
- [ ] Tests estables (no flaky)
- [ ] Screenshots en fallos

## Estimación
**Story Points:** 8

## Dependencias
- Depende de: #12, #13, #17
- Bloquea: #26
```

**Labels:** `testing`
**Asignado a:** Julio
**Sprint:** Sprint 4

---

### Issue #26: Preparación de demo

**Título:** `26. Preparación de demo`

**Descripción:**
```markdown
## Descripción
Preparar todos los materiales y entorno para la demostración del sistema.

## Tareas
- [ ] Crear datos de prueba realistas
- [ ] Preparar script de demostración
- [ ] Verificar funcionamiento de todos los flujos
- [ ] Preparar usuarios de demo
- [ ] Crear presentación de apoyo
- [ ] Ensayar demo con el equipo

## Criterios de Aceptación
- [ ] Entorno de demo estable
- [ ] Script de demo documentado
- [ ] Todos los flujos funcionando
- [ ] Presentación lista

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #21, #22, #23, #24, #25
- Bloquea: #27
```

**Labels:** `documentation`
**Asignado a:** Javier
**Sprint:** Sprint 4

---

### Issue #27: Documentación final

**Título:** `27. Documentación final`

**Descripción:**
```markdown
## Descripción
Completar y revisar toda la documentación del proyecto.

## Tareas
- [ ] Revisar y completar 00_MEMORIA_ING_SOFT.md
- [ ] Revisar y completar 01_REQUISITOS.md
- [ ] Revisar y completar 02_UML.md
- [ ] Revisar y completar 03_ARQUITECTURA.md
- [ ] Revisar y completar 04_PLAN_PRUEBAS.md
- [ ] Completar 06_GUIA_DEMO.md
- [ ] Crear README principal actualizado

## Criterios de Aceptación
- [ ] Todos los documentos completos
- [ ] Sin secciones pendientes
- [ ] Revisado por todo el equipo
- [ ] Enlaces funcionando

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #26
- Bloquea: #28
```

**Labels:** `documentation`
**Asignado a:** David
**Sprint:** Sprint 4

---

### Issue #28: Presentación final

**Título:** `28. Presentación final`

**Descripción:**
```markdown
## Descripción
Preparar y realizar la presentación final del proyecto.

## Tareas
- [ ] Crear slides de presentación
- [ ] Preparar demo en vivo
- [ ] Asignar partes a cada miembro
- [ ] Preparar respuestas a preguntas frecuentes
- [ ] Ensayo final
- [ ] Realizar presentación

## Criterios de Aceptación
- [ ] Presentación de 15-20 minutos
- [ ] Demo funcional incluida
- [ ] Todos los miembros participan
- [ ] Q&A preparado

## Estimación
**Story Points:** 5

## Dependencias
- Depende de: #26, #27
- Bloquea: Ninguno (último issue)
```

**Labels:** `documentation`
**Asignado a:** Javier (coordinación)
**Sprint:** Sprint 4

---

## Resumen de Asignaciones

### Por Responsable

| Responsable | Issues | Total Story Points |
|---|---|---|
| David | #1, #2, #3, #4, #5, #6, #7, #8, #9, #27 | 40 |
| Bons | #10, #11, #18, #19, #20, #21 | 27 |
| Javier | #12, #13, #14, #15, #16, #17, #26, #28 | 38 |
| Julio | #22, #23, #24, #25 | 26 |

### Por Sprint

| Sprint | Issues | Total Story Points |
|---|---|---|
| Sprint 1 | #1, #2, #3, #4 | 16 |
| Sprint 2 | #5, #6, #7, #8, #9 | 21 |
| Sprint 3 | #10-#19 | 49 |
| Sprint 4 | #20-#28 | 47 |

### Labels

- `analysis` - Análisis de requisitos
- `uml` - Diagramas UML
- `architecture` - Arquitectura del sistema
- `frontend` - Desarrollo frontend
- `backend` - Desarrollo backend
- `testing` - Pruebas
- `documentation` - Documentación
- `ci-cd` - Integración y despliegue continuo

---

## Configuración del Proyecto GitHub

### Crear Proyecto

1. Ir a Projects > New Project
2. Nombre: "Diagramas y división de tareas"
3. Template: Board

### Configurar Columnas

1. Backlog (Por hacer)
2. Ready (Listo para desarrollo)
3. In progress (En progreso)
4. In review (En revisión)
5. Done (Completado)

### Agregar Campo de Sprint

1. Settings > Fields > Add field
2. Nombre: Sprint
3. Tipo: Single select
4. Opciones: Sprint 1, Sprint 2, Sprint 3, Sprint 4

### Configurar Automatizaciones (Manual)

En Settings > Workflows:

1. **Item added to project** → Set status to "Backlog"
2. **Item reopened** → Set status to "Ready"
3. **Pull request merged** → Set status to "Done"
4. **Item closed** → Set status to "Done"

---

*Documento generado para la creación manual de issues en GitHub*
