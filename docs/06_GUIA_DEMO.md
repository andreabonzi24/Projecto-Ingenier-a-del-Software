# Guía de Demostración

## Plataforma de Citas Médicas

---

## Índice

1. [Introducción](#1-introducción)
2. [Preparación del Entorno](#2-preparación-del-entorno)
3. [Guía de Usuario por Rol](#3-guía-de-usuario-por-rol)
4. [Escenarios de Demostración](#4-escenarios-de-demostración)
5. [Flujos de Trabajo](#5-flujos-de-trabajo)
6. [Preguntas Frecuentes](#6-preguntas-frecuentes)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Introducción

### 1.1 Propósito

Esta guía proporciona instrucciones paso a paso para demostrar las funcionalidades de la Plataforma de Citas Médicas. Está diseñada para presentaciones, evaluaciones académicas y onboarding de nuevos usuarios.

**Issues relacionados:** #26, #27, #28

### 1.2 Audiencia

| Audiencia | Uso de la Guía |
|---|---|
| Profesores/Evaluadores | Evaluación de funcionalidades |
| Equipo de desarrollo | Demo a stakeholders |
| Nuevos usuarios | Aprendizaje del sistema |
| QA | Validación de flujos |

### 1.3 Requisitos Previos

| Requisito | Descripción |
|---|---|
| Navegador | Chrome 90+, Firefox 88+, Safari 14+ |
| Conexión | Internet estable |
| Resolución | Mínimo 1280x720 |
| JavaScript | Habilitado |

---

## 2. Preparación del Entorno

### 2.1 URLs de Acceso

| Entorno | URL | Descripción |
|---|---|---|
| Producción | https://[tu-dominio].vercel.app | Entorno final |
| Staging | https://[tu-dominio]-staging.vercel.app | Pruebas |
| Local | http://localhost:3000 | Desarrollo |

### 2.2 Usuarios de Prueba

| Rol | Email | Contraseña | Nombre |
|---|---|---|---|
| Paciente | paciente@demo.com | Demo1234! | Juan Paciente |
| Médico | medico@demo.com | Demo1234! | Dra. María García |
| Administrador | admin@demo.com | Demo1234! | Admin Sistema |
| Centro | centro@demo.com | Demo1234! | Centro Médico ABC |

### 2.3 Configuración Local (Opcional)

```bash
# Clonar repositorio
git clone https://github.com/andreabonzi24/Projecto-Ingenier-a-del-Software.git
cd Projecto-Ingenier-a-del-Software

# Instalar dependencias backend
cd backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con valores correctos

# Ejecutar seed de datos de prueba
npm run seed

# Iniciar servidor
npm run dev

# En otra terminal, servir frontend
cd ../web
# Abrir index.html en navegador o usar servidor local
npx serve .
```

---

## 3. Guía de Usuario por Rol

### 3.1 Paciente

#### Funcionalidades Disponibles

| Funcionalidad | Descripción |
|---|---|
| Registro | Crear cuenta nueva |
| Login | Acceder al sistema |
| Dashboard | Ver resumen personal |
| Reservar cita | Agendar nueva cita médica |
| Mis citas | Ver y gestionar citas |
| Notificaciones | Ver alertas y recordatorios |
| Perfil | Editar datos personales |

#### Navegación Principal

```
┌────────────────────────────────────────────┐
│  🏠 Inicio  │  📅 Citas  │  🔔 Notif  │  👤  │
├────────────────────────────────────────────┤
│                                            │
│    Dashboard del Paciente                  │
│                                            │
│    ┌──────────────┐  ┌──────────────┐     │
│    │ Próximas     │  │ Historial    │     │
│    │ Citas        │  │ Médico       │     │
│    └──────────────┘  └──────────────┘     │
│                                            │
│    ┌──────────────────────────────────┐   │
│    │ + Reservar Nueva Cita            │   │
│    └──────────────────────────────────┘   │
│                                            │
└────────────────────────────────────────────┘
```

### 3.2 Médico

#### Funcionalidades Disponibles

| Funcionalidad | Descripción |
|---|---|
| Dashboard | Agenda del día y estadísticas |
| Agenda | Calendario de citas |
| Pacientes | Lista de pacientes |
| Disponibilidad | Configurar horarios |
| Notificaciones | Alertas de citas |

#### Panel de Control

```
┌────────────────────────────────────────────┐
│  🏠 Inicio  │  📅 Agenda  │  👥 Pacientes  │
├────────────────────────────────────────────┤
│                                            │
│    Dashboard del Médico                    │
│                                            │
│    Citas de Hoy: 5                         │
│    ┌────────────────────────────────────┐ │
│    │ 09:00 - Juan Paciente - Consulta   │ │
│    │ 09:30 - Ana López - Seguimiento    │ │
│    │ 10:00 - [Disponible]               │ │
│    │ 10:30 - Carlos Ruiz - Primera vez  │ │
│    └────────────────────────────────────┘ │
│                                            │
└────────────────────────────────────────────┘
```

### 3.3 Administrador

#### Funcionalidades Disponibles

| Funcionalidad | Descripción |
|---|---|
| Dashboard | Métricas generales |
| Usuarios | Gestión de usuarios |
| Centros | Gestión de centros médicos |
| Reportes | Estadísticas del sistema |
| Configuración | Ajustes generales |

### 3.4 Centro Médico

#### Funcionalidades Disponibles

| Funcionalidad | Descripción |
|---|---|
| Dashboard | Vista general del centro |
| Médicos | Gestión de doctores |
| Citas | Todas las citas del centro |
| Horarios | Configuración de horarios |

---

## 4. Escenarios de Demostración

### 4.1 Demo 1: Registro y Primera Cita (10 min)

**Objetivo:** Mostrar el flujo completo de un nuevo paciente.

| Paso | Acción | Resultado Esperado |
|---|---|---|
| 1 | Navegar a página de registro | Formulario de registro visible |
| 2 | Completar datos del paciente | Validaciones en tiempo real |
| 3 | Enviar formulario | Registro exitoso, redirección a login |
| 4 | Iniciar sesión | Dashboard de paciente |
| 5 | Click en "Reservar Cita" | Formulario de reserva |
| 6 | Seleccionar especialidad | Lista de médicos filtrada |
| 7 | Seleccionar médico | Calendario de disponibilidad |
| 8 | Elegir fecha y hora | Confirmación de selección |
| 9 | Confirmar cita | Mensaje de éxito |
| 10 | Verificar en "Mis Citas" | Cita aparece en lista |

### 4.2 Demo 2: Gestión de Agenda del Médico (8 min)

**Objetivo:** Mostrar el flujo de trabajo de un médico.

| Paso | Acción | Resultado Esperado |
|---|---|---|
| 1 | Login como médico | Dashboard con agenda del día |
| 2 | Revisar citas programadas | Lista de citas visible |
| 3 | Click en una cita | Detalles del paciente |
| 4 | Marcar como "Atendida" | Estado actualizado |
| 5 | Ver lista de pacientes | Historial accesible |
| 6 | Configurar disponibilidad | Horarios modificables |

### 4.3 Demo 3: Administración del Sistema (7 min)

**Objetivo:** Mostrar capacidades administrativas.

| Paso | Acción | Resultado Esperado |
|---|---|---|
| 1 | Login como admin | Dashboard administrativo |
| 2 | Ver métricas del sistema | Estadísticas generales |
| 3 | Gestionar usuarios | Lista CRUD de usuarios |
| 4 | Crear nuevo centro | Formulario de centro |
| 5 | Asignar médico a centro | Relación creada |
| 6 | Ver reportes | Gráficos y tablas |

### 4.4 Demo 4: Flujo de Cancelación (5 min)

**Objetivo:** Mostrar gestión de cancelaciones.

| Paso | Acción | Resultado Esperado |
|---|---|---|
| 1 | Login como paciente | Dashboard |
| 2 | Ir a "Mis Citas" | Lista de citas |
| 3 | Seleccionar cita activa | Opciones visibles |
| 4 | Click en "Cancelar" | Modal de confirmación |
| 5 | Confirmar cancelación | Cita cancelada |
| 6 | Verificar notificación | Alerta recibida |

---

## 5. Flujos de Trabajo

### 5.1 Flujo de Reserva de Cita

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Inicio    │───▶│ Seleccionar │───▶│ Seleccionar │
│   Reserva   │    │ Especialidad│    │   Médico    │
└─────────────┘    └─────────────┘    └─────────────┘
                                            │
                                            ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│ Confirmación│◀───│  Seleccionar│◀───│   Ver       │
│   Final     │    │   Horario   │    │ Calendario  │
└─────────────┘    └─────────────┘    └─────────────┘
```

### 5.2 Flujo de Autenticación

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Login   │────▶│ Validar  │────▶│ Generar  │
│  Form    │     │Credencial│     │  Token   │
└──────────┘     └──────────┘     └──────────┘
                      │                 │
                      ▼                 ▼
                ┌──────────┐     ┌──────────┐
                │  Error   │     │ Dashboard│
                │  Login   │     │  Usuario │
                └──────────┘     └──────────┘
```

### 5.3 Flujo de Notificaciones

```
Evento ──▶ Crear Notificación ──▶ Almacenar en BD
                                        │
                                        ▼
Usuario ve Dashboard ◀── Badge contador ◀── Marcar como no leída
        │
        ▼
Click en notificación ──▶ Marcar como leída ──▶ Actualizar contador
```

---

## 6. Preguntas Frecuentes

### 6.1 Para Pacientes

| Pregunta | Respuesta |
|---|---|
| ¿Cómo cancelo una cita? | Ir a "Mis Citas" > Seleccionar cita > "Cancelar". Debe ser con 24h de anticipación. |
| ¿Puedo reprogramar una cita? | Sí, cancelando la actual y reservando una nueva. |
| ¿Cómo recupero mi contraseña? | En login, click en "¿Olvidaste tu contraseña?" |
| ¿Cuántas citas puedo tener activas? | Máximo 5 citas activas simultáneas. |

### 6.2 Para Médicos

| Pregunta | Respuesta |
|---|---|
| ¿Cómo veo mi agenda? | El dashboard muestra automáticamente las citas del día. |
| ¿Puedo bloquear horarios? | Sí, en "Configurar Disponibilidad". |
| ¿Cómo marco una cita como completada? | Click en la cita > "Marcar como atendida". |

### 6.3 Para Administradores

| Pregunta | Respuesta |
|---|---|
| ¿Cómo creo un nuevo usuario? | Usuarios > "+ Nuevo Usuario" > Completar formulario. |
| ¿Cómo asigno un médico a un centro? | Centros > Seleccionar centro > "Asignar Médicos". |
| ¿Dónde veo las estadísticas? | Dashboard > Sección "Analytics" o "Reportes". |

---

## 7. Troubleshooting

### 7.1 Problemas Comunes

| Problema | Causa Probable | Solución |
|---|---|---|
| No carga la página | Sin conexión | Verificar internet |
| Login no funciona | Credenciales incorrectas | Verificar email/password |
| No aparecen médicos | Sin médicos en especialidad | Seleccionar otra especialidad |
| Error al reservar | Horario no disponible | Elegir otro horario |
| Sesión expirada | Token JWT expirado | Volver a iniciar sesión |

### 7.2 Códigos de Error

| Código | Significado | Acción |
|---|---|---|
| 400 | Datos inválidos | Revisar formulario |
| 401 | No autorizado | Iniciar sesión |
| 403 | Prohibido | Sin permisos |
| 404 | No encontrado | Verificar URL |
| 409 | Conflicto | Dato duplicado |
| 500 | Error servidor | Contactar soporte |

### 7.3 Contacto de Soporte

| Tipo | Contacto | Horario |
|---|---|---|
| Soporte técnico | soporte@example.com | L-V 9:00-18:00 |
| Bugs | GitHub Issues | 24/7 |
| Emergencias | admin@example.com | 24/7 |

---

## Apéndice A: Checklist de Demo

### Pre-Demo

- [ ] Verificar conexión a internet
- [ ] Verificar acceso al entorno de demo
- [ ] Confirmar usuarios de prueba disponibles
- [ ] Preparar datos de ejemplo
- [ ] Tener backup de screenshots por si falla

### Durante Demo

- [ ] Explicar cada paso claramente
- [ ] Mostrar validaciones y mensajes de error
- [ ] Destacar features principales
- [ ] Responder preguntas

### Post-Demo

- [ ] Recopilar feedback
- [ ] Documentar issues encontrados
- [ ] Limpiar datos de prueba si es necesario

---

## Apéndice B: Scripts de Demo

### Crear Datos de Prueba

```bash
# En el directorio backend
npm run seed

# Esto crea:
# - 3 pacientes de prueba
# - 5 médicos de prueba
# - 2 centros médicos
# - 20 citas de ejemplo
```

### Limpiar Datos de Prueba

```bash
# En el directorio backend
npm run seed:clean
```

---

## Historial de Versiones

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2024-XX-XX | Equipo | Versión inicial |

---

*Guía de demostración para Plataforma de Citas Médicas*
