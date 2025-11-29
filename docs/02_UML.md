# Diagramas UML

## Plataforma de Citas Médicas

---

## Índice

1. [Introducción](#1-introducción)
2. [Diagrama de Casos de Uso](#2-diagrama-de-casos-de-uso)
3. [Diagrama de Clases](#3-diagrama-de-clases)
4. [Diagramas de Secuencia](#4-diagramas-de-secuencia)
5. [Diagrama de Estados](#5-diagrama-de-estados)
6. [Diagrama de Actividades](#6-diagrama-de-actividades)
7. [Diagrama de Componentes](#7-diagrama-de-componentes)
8. [Diagrama de Despliegue](#8-diagrama-de-despliegue)
9. [Trazabilidad UML-Requisitos](#9-trazabilidad-uml-requisitos)

---

## 1. Introducción

### 1.1 Propósito

Este documento contiene todos los diagramas UML que modelan la Plataforma de Citas Médicas. Los diagramas siguen el estándar UML 2.5 y están implementados usando PlantUML.

**Issues relacionados:** #5, #6, #7, #8, #9

### 1.2 Notación

| Símbolo | Significado |
|---|---|
| `<<actor>>` | Usuario del sistema |
| `<<boundary>>` | Interfaz de usuario |
| `<<control>>` | Lógica de negocio |
| `<<entity>>` | Datos persistentes |

### 1.3 Herramientas

- PlantUML para generación de diagramas
- Visualización: extensiones VS Code, PlantUML Server

---

## 2. Diagrama de Casos de Uso

### 2.1 Casos de Uso General del Sistema

```plantuml
@startuml CU_General
!theme plain

left to right direction
skinparam packageStyle rectangle
skinparam actorStyle awesome

actor "Paciente" as paciente
actor "Médico" as medico
actor "Administrador" as admin
actor "Sistema" as sistema

rectangle "Plataforma de Citas Médicas" {
  ' Autenticación
  usecase "Registrarse" as UC1
  usecase "Iniciar Sesión" as UC2
  usecase "Recuperar Contraseña" as UC3
  usecase "Cerrar Sesión" as UC4
  
  ' Gestión de Citas
  usecase "Reservar Cita" as UC5
  usecase "Ver Mis Citas" as UC6
  usecase "Cancelar Cita" as UC7
  usecase "Reprogramar Cita" as UC8
  
  ' Dashboards
  usecase "Ver Dashboard Paciente" as UC9
  usecase "Ver Dashboard Médico" as UC10
  usecase "Ver Dashboard Admin" as UC11
  
  ' Gestión Médico
  usecase "Gestionar Agenda" as UC12
  usecase "Ver Pacientes" as UC13
  usecase "Actualizar Disponibilidad" as UC14
  
  ' Administración
  usecase "Gestionar Usuarios" as UC15
  usecase "Gestionar Centros" as UC16
  usecase "Ver Estadísticas" as UC17
  
  ' Notificaciones
  usecase "Ver Notificaciones" as UC18
  usecase "Enviar Recordatorio" as UC19
}

' Relaciones Paciente
paciente --> UC1
paciente --> UC2
paciente --> UC3
paciente --> UC4
paciente --> UC5
paciente --> UC6
paciente --> UC7
paciente --> UC8
paciente --> UC9
paciente --> UC18

' Relaciones Médico
medico --> UC2
medico --> UC4
medico --> UC10
medico --> UC12
medico --> UC13
medico --> UC14
medico --> UC18

' Relaciones Admin
admin --> UC2
admin --> UC4
admin --> UC11
admin --> UC15
admin --> UC16
admin --> UC17

' Relaciones Sistema
sistema --> UC19

' Extends e Includes
UC5 ..> UC2 : <<include>>
UC6 ..> UC2 : <<include>>
UC3 ..> UC2 : <<extends>>

@enduml
```

### 2.2 Casos de Uso - Módulo de Autenticación

```plantuml
@startuml CU_Autenticacion
!theme plain

left to right direction

actor "Usuario" as user
actor "Sistema Email" as email

rectangle "Módulo de Autenticación" {
  usecase "Registrarse" as UC1
  usecase "Validar Email" as UC1_1
  usecase "Iniciar Sesión" as UC2
  usecase "Validar Credenciales" as UC2_1
  usecase "Generar Token JWT" as UC2_2
  usecase "Recuperar Contraseña" as UC3
  usecase "Enviar Email Recuperación" as UC3_1
  usecase "Restablecer Contraseña" as UC3_2
  usecase "Cerrar Sesión" as UC4
  usecase "Invalidar Token" as UC4_1
}

user --> UC1
user --> UC2
user --> UC3
user --> UC4

UC1 ..> UC1_1 : <<include>>
UC2 ..> UC2_1 : <<include>>
UC2_1 ..> UC2_2 : <<include>>
UC3 ..> UC3_1 : <<include>>
UC3 ..> UC3_2 : <<extends>>
UC4 ..> UC4_1 : <<include>>

UC3_1 --> email

@enduml
```

### 2.3 Casos de Uso - Módulo de Citas

```plantuml
@startuml CU_Citas
!theme plain

left to right direction

actor "Paciente" as paciente
actor "Médico" as medico

rectangle "Módulo de Citas" {
  usecase "Buscar Médico" as UC1
  usecase "Filtrar por Especialidad" as UC1_1
  usecase "Ver Disponibilidad" as UC2
  usecase "Seleccionar Horario" as UC3
  usecase "Confirmar Reserva" as UC4
  usecase "Ver Citas" as UC5
  usecase "Cancelar Cita" as UC6
  usecase "Reprogramar Cita" as UC7
  usecase "Marcar como Atendida" as UC8
  usecase "Ver Historial" as UC9
}

paciente --> UC1
paciente --> UC2
paciente --> UC3
paciente --> UC4
paciente --> UC5
paciente --> UC6
paciente --> UC7
paciente --> UC9

medico --> UC5
medico --> UC8
medico --> UC9

UC1 ..> UC1_1 : <<extends>>
UC4 ..> UC3 : <<include>>
UC7 ..> UC6 : <<include>>
UC7 ..> UC4 : <<include>>

@enduml
```

---

## 3. Diagrama de Clases

### 3.1 Modelo de Dominio Completo

```plantuml
@startuml Clases_Dominio
!theme plain

skinparam classAttributeIconSize 0

' Enumeraciones
enum RolUsuario {
  PATIENT
  DOCTOR
  ADMIN
  CENTER
}

enum EstadoCita {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

' Clases principales
class User {
  -_id: ObjectId
  -name: String
  -email: String
  -password: String
  -role: RolUsuario
  -phone: String
  -createdAt: Date
  -updatedAt: Date
  +register(): User
  +login(email, password): Token
  +updateProfile(data): User
  +changePassword(oldPwd, newPwd): Boolean
}

class Doctor {
  -user: User
  -specialty: String
  -licenseNumber: String
  -center: Center
  -schedule: Schedule[]
  +getAvailability(date): TimeSlot[]
  +getPatients(): Patient[]
  +updateSchedule(schedule): Boolean
}

class Patient {
  -user: User
  -dateOfBirth: Date
  -medicalHistory: String
  -insuranceInfo: String
  +getAppointments(): Appointment[]
  +bookAppointment(doctor, date): Appointment
}

class Appointment {
  -_id: ObjectId
  -patient: Patient
  -doctor: Doctor
  -center: Center
  -dateTime: Date
  -duration: Number
  -status: EstadoCita
  -notes: String
  -createdAt: Date
  +confirm(): Boolean
  +cancel(reason): Boolean
  +reschedule(newDateTime): Boolean
  +complete(notes): Boolean
}

class Center {
  -_id: ObjectId
  -name: String
  -address: String
  -phone: String
  -email: String
  -doctors: Doctor[]
  -schedule: Schedule
  +getDoctors(): Doctor[]
  +addDoctor(doctor): Boolean
  +removeDoctor(doctorId): Boolean
}

class Schedule {
  -dayOfWeek: Number
  -startTime: String
  -endTime: String
  -slotDuration: Number
  +getAvailableSlots(date): TimeSlot[]
  +isAvailable(dateTime): Boolean
}

class Notification {
  -_id: ObjectId
  -user: User
  -title: String
  -message: String
  -type: String
  -read: Boolean
  -createdAt: Date
  +markAsRead(): Boolean
  +send(): Boolean
}

' Relaciones
User "1" -- "0..1" Doctor : es
User "1" -- "0..1" Patient : es

Doctor "1" -- "*" Appointment : atiende
Doctor "*" -- "1" Center : trabaja en
Doctor "1" -- "*" Schedule : tiene

Patient "1" -- "*" Appointment : reserva

Appointment "*" -- "1" Center : se realiza en

User "1" -- "*" Notification : recibe

@enduml
```

### 3.2 Diagrama de Clases - Capa de Controladores

```plantuml
@startuml Clases_Controllers
!theme plain

skinparam classAttributeIconSize 0

interface IController {
  +handleRequest(req, res): Response
}

class AuthController {
  -userService: UserService
  +register(req, res): Response
  +login(req, res): Response
  +logout(req, res): Response
  +forgotPassword(req, res): Response
  +resetPassword(req, res): Response
}

class AppointmentController {
  -appointmentService: AppointmentService
  +create(req, res): Response
  +getAll(req, res): Response
  +getById(req, res): Response
  +update(req, res): Response
  +cancel(req, res): Response
}

class UserController {
  -userService: UserService
  +getProfile(req, res): Response
  +updateProfile(req, res): Response
  +getAllUsers(req, res): Response
  +deleteUser(req, res): Response
}

class CenterController {
  -centerService: CenterService
  +create(req, res): Response
  +getAll(req, res): Response
  +getById(req, res): Response
  +update(req, res): Response
  +delete(req, res): Response
}

IController <|.. AuthController
IController <|.. AppointmentController
IController <|.. UserController
IController <|.. CenterController

@enduml
```

### 3.3 Diagrama de Clases - Capa de Servicios

```plantuml
@startuml Clases_Services
!theme plain

interface IService {
  +create(data): Entity
  +findById(id): Entity
  +findAll(filters): Entity[]
  +update(id, data): Entity
  +delete(id): Boolean
}

class UserService {
  -userRepository: UserRepository
  +create(userData): User
  +findById(id): User
  +findByEmail(email): User
  +update(id, data): User
  +delete(id): Boolean
  +validateCredentials(email, pwd): User
}

class AppointmentService {
  -appointmentRepo: AppointmentRepository
  -notificationService: NotificationService
  +create(appointmentData): Appointment
  +findById(id): Appointment
  +findByPatient(patientId): Appointment[]
  +findByDoctor(doctorId): Appointment[]
  +cancel(id, reason): Boolean
  +reschedule(id, newDate): Appointment
}

class CenterService {
  -centerRepository: CenterRepository
  +create(centerData): Center
  +findById(id): Center
  +findAll(): Center[]
  +update(id, data): Center
  +delete(id): Boolean
  +getDoctors(centerId): Doctor[]
}

class NotificationService {
  -notificationRepo: NotificationRepository
  -emailService: EmailService
  +create(notification): Notification
  +sendReminder(appointmentId): Boolean
  +markAsRead(notificationId): Boolean
  +getUnread(userId): Notification[]
}

IService <|.. UserService
IService <|.. AppointmentService
IService <|.. CenterService
IService <|.. NotificationService

@enduml
```

---

## 4. Diagramas de Secuencia

### 4.1 Secuencia - Inicio de Sesión

```plantuml
@startuml Seq_Login
!theme plain

actor Usuario
participant "LoginPage" as UI
participant "AuthController" as AC
participant "UserService" as US
participant "JWT" as JWT
database "MongoDB" as DB

Usuario -> UI : Ingresa credenciales
UI -> AC : POST /api/auth/login\n{email, password}
AC -> US : validateCredentials(email, password)
US -> DB : findOne({email})
DB --> US : user
US -> US : bcrypt.compare(password, user.password)
alt Credenciales válidas
    US --> AC : user
    AC -> JWT : sign({userId, role})
    JWT --> AC : token
    AC --> UI : 200 {token, user}
    UI --> Usuario : Redirect a Dashboard
else Credenciales inválidas
    US --> AC : null
    AC --> UI : 401 {error: "Credenciales inválidas"}
    UI --> Usuario : Mostrar error
end

@enduml
```

### 4.2 Secuencia - Reservar Cita

```plantuml
@startuml Seq_BookAppointment
!theme plain

actor Paciente
participant "BookingPage" as UI
participant "AppointmentController" as AC
participant "AppointmentService" as AS
participant "NotificationService" as NS
database "MongoDB" as DB

Paciente -> UI : Selecciona médico, fecha y hora
UI -> AC : POST /api/appointments\n{doctorId, dateTime, reason}
AC -> AC : validateToken(req.headers.authorization)
AC -> AS : create(appointmentData)
AS -> DB : findOne({doctor, dateTime})
alt Horario disponible
    DB --> AS : null (disponible)
    AS -> DB : create(appointment)
    DB --> AS : appointment
    AS -> NS : scheduleReminder(appointment)
    NS --> AS : ok
    AS --> AC : appointment
    AC --> UI : 201 {appointment}
    UI --> Paciente : Confirmación de cita
else Horario no disponible
    DB --> AS : existingAppointment
    AS --> AC : ConflictError
    AC --> UI : 409 {error: "Horario no disponible"}
    UI --> Paciente : Mostrar alternativas
end

@enduml
```

### 4.3 Secuencia - Cancelar Cita

```plantuml
@startuml Seq_CancelAppointment
!theme plain

actor Usuario
participant "AppointmentsPage" as UI
participant "AppointmentController" as AC
participant "AppointmentService" as AS
participant "NotificationService" as NS
database "MongoDB" as DB

Usuario -> UI : Click en "Cancelar Cita"
UI -> UI : Confirmar cancelación
UI -> AC : PUT /api/appointments/:id/cancel\n{reason}
AC -> AS : cancel(id, reason)
AS -> DB : findById(id)
DB --> AS : appointment
AS -> AS : validateCancellation(appointment)
alt Puede cancelar
    AS -> DB : updateOne({status: 'CANCELLED'})
    DB --> AS : ok
    AS -> NS : notifyCancellation(appointment)
    NS --> AS : ok
    AS --> AC : appointment
    AC --> UI : 200 {appointment}
    UI --> Usuario : Cita cancelada
else No puede cancelar
    AS --> AC : ValidationError
    AC --> UI : 400 {error: "No se puede cancelar"}
    UI --> Usuario : Mostrar razón
end

@enduml
```

### 4.4 Secuencia - Registro de Usuario

```plantuml
@startuml Seq_Register
!theme plain

actor Usuario
participant "RegisterPage" as UI
participant "AuthController" as AC
participant "UserService" as US
participant "EmailService" as ES
database "MongoDB" as DB

Usuario -> UI : Completa formulario registro
UI -> UI : Validar campos
UI -> AC : POST /api/auth/register\n{name, email, password, role}
AC -> US : create(userData)
US -> DB : findOne({email})
alt Email no existe
    DB --> US : null
    US -> US : bcrypt.hash(password, 10)
    US -> DB : create(user)
    DB --> US : user
    US -> ES : sendWelcomeEmail(user)
    ES --> US : ok
    US --> AC : user
    AC --> UI : 201 {user}
    UI --> Usuario : Registro exitoso
else Email ya existe
    DB --> US : existingUser
    US --> AC : ConflictError
    AC --> UI : 409 {error: "Email ya registrado"}
    UI --> Usuario : Mostrar error
end

@enduml
```

---

## 5. Diagrama de Estados

### 5.1 Estados de una Cita

```plantuml
@startuml Estados_Cita
!theme plain

[*] --> Pendiente : Crear cita

Pendiente : La cita ha sido reservada
Pendiente --> Confirmada : confirmar()
Pendiente --> Cancelada : cancelar()

Confirmada : La cita está confirmada
Confirmada --> Completada : completar()
Confirmada --> Cancelada : cancelar()
Confirmada --> Reprogramada : reprogramar()

Reprogramada : La cita tiene nueva fecha
Reprogramada --> Confirmada : confirmar()
Reprogramada --> Cancelada : cancelar()

Completada : La cita fue atendida
Completada --> [*]

Cancelada : La cita fue cancelada
Cancelada --> [*]

@enduml
```

### 5.2 Estados de un Usuario

```plantuml
@startuml Estados_Usuario
!theme plain

[*] --> Registrado : register()

Registrado : Usuario creado en el sistema
Registrado --> Activo : verificarEmail()
Registrado --> Eliminado : eliminar()

Activo : Usuario puede usar el sistema
Activo --> Suspendido : suspender()
Activo --> Eliminado : eliminar()

Suspendido : Usuario temporalmente sin acceso
Suspendido --> Activo : reactivar()
Suspendido --> Eliminado : eliminar()

Eliminado : Usuario eliminado
Eliminado --> [*]

@enduml
```

### 5.3 Estados de Autenticación

```plantuml
@startuml Estados_Auth
!theme plain

[*] --> NoAutenticado

NoAutenticado : Sin sesión activa
NoAutenticado --> Autenticando : login()
NoAutenticado --> Registrando : register()

Registrando : Proceso de registro
Registrando --> NoAutenticado : error
Registrando --> PendienteVerificacion : éxito

PendienteVerificacion : Esperando verificación email
PendienteVerificacion --> NoAutenticado : verificar()

Autenticando : Validando credenciales
Autenticando --> NoAutenticado : error
Autenticando --> Autenticado : éxito

Autenticado : Sesión activa
Autenticado --> NoAutenticado : logout()
Autenticado --> NoAutenticado : tokenExpirado()

@enduml
```

---

## 6. Diagrama de Actividades

### 6.1 Actividad - Proceso de Reserva de Cita

```plantuml
@startuml Act_ReservaCita
!theme plain

start

:Paciente accede a reserva de citas;

:Seleccionar especialidad;

:Sistema muestra médicos disponibles;

:Seleccionar médico;

:Sistema muestra calendario;

:Seleccionar fecha;

:Sistema muestra horarios disponibles;

:Seleccionar horario;

if (¿Horario disponible?) then (sí)
  :Confirmar datos de la cita;
  
  if (¿Datos correctos?) then (sí)
    :Crear cita en el sistema;
    :Enviar confirmación por email;
    :Mostrar resumen de cita;
  else (no)
    :Volver a selección;
    stop
  endif
  
else (no)
  :Mostrar mensaje de error;
  :Sugerir horarios alternativos;
  stop
endif

stop

@enduml
```

### 6.2 Actividad - Proceso de Autenticación

```plantuml
@startuml Act_Autenticacion
!theme plain

start

:Usuario accede a login;

:Ingresar email y contraseña;

:Validar formato de datos;

if (¿Formato válido?) then (sí)
  :Enviar credenciales al servidor;
  
  :Buscar usuario por email;
  
  if (¿Usuario existe?) then (sí)
    :Comparar contraseña hash;
    
    if (¿Contraseña correcta?) then (sí)
      :Generar token JWT;
      :Almacenar token en localStorage;
      :Redirigir a dashboard;
    else (no)
      :Mostrar error de credenciales;
      stop
    endif
    
  else (no)
    :Mostrar error de credenciales;
    stop
  endif
  
else (no)
  :Mostrar errores de validación;
  stop
endif

stop

@enduml
```

---

## 7. Diagrama de Componentes

### 7.1 Arquitectura de Componentes

```plantuml
@startuml Comp_Arquitectura
!theme plain

package "Frontend (Web)" {
  [HTML/CSS/JS] as FE
  [Navigation Module] as NAV
  [API Client] as API
  [Dashboard Modules] as DASH
}

package "Backend (API)" {
  [Express Server] as SERVER
  [Auth Routes] as AUTH_R
  [Appointment Routes] as APPT_R
  [Controllers] as CTRL
  [Services] as SVC
  [Middlewares] as MW
}

package "Data Layer" {
  [MongoDB Driver] as MONGO
  [Models] as MODELS
}

package "External Services" {
  [Email Service] as EMAIL
  [Payment Gateway] as PAY
}

database "MongoDB Atlas" as DB

FE --> API : HTTP Requests
NAV --> FE
DASH --> FE
API --> SERVER : REST API

SERVER --> AUTH_R
SERVER --> APPT_R
AUTH_R --> CTRL
APPT_R --> CTRL
CTRL --> SVC
SVC --> MW
MW --> MODELS
MODELS --> MONGO
MONGO --> DB

SVC --> EMAIL
SVC --> PAY

@enduml
```

### 7.2 Componentes del Frontend

```plantuml
@startuml Comp_Frontend
!theme plain

package "Frontend" {
  package "Pages" {
    [Login Page]
    [Register Page]
    [Patient Dashboard]
    [Doctor Dashboard]
    [Admin Dashboard]
    [Book Appointment]
    [Notifications]
  }
  
  package "Modules" {
    [accessibility.js]
    [patient-dashboard.js]
    [doctor-dashboard.js]
    [administrator-dashboard.js]
  }
  
  package "Core" {
    [api.js]
    [common.js]
    [navigation.js]
    [navigation-config.js]
    [appointments-manager.js]
  }
  
  package "Styles" {
    [main.css]
    [components.css]
    [responsive.css]
  }
}

[Login Page] --> [api.js]
[Patient Dashboard] --> [patient-dashboard.js]
[Doctor Dashboard] --> [doctor-dashboard.js]
[Admin Dashboard] --> [administrator-dashboard.js]
[Book Appointment] --> [appointments-manager.js]

@enduml
```

---

## 8. Diagrama de Despliegue

### 8.1 Infraestructura de Despliegue

```plantuml
@startuml Deploy_Infra
!theme plain

node "Cliente" {
  [Web Browser] as Browser
}

cloud "Vercel" {
  node "Frontend Server" {
    [Static Assets]
    [HTML/CSS/JS]
  }
}

cloud "Cloud Provider" {
  node "Backend Server" {
    [Node.js Runtime]
    [Express API]
  }
}

cloud "MongoDB Atlas" {
  database "Cluster" {
    [Primary]
    [Secondary 1]
    [Secondary 2]
  }
}

Browser --> [Static Assets] : HTTPS
[HTML/CSS/JS] --> [Express API] : REST API
[Express API] --> [Primary] : MongoDB Protocol

@enduml
```

### 8.2 Configuración de Entornos

```plantuml
@startuml Deploy_Entornos
!theme plain

package "Desarrollo" {
  node "Local Machine" {
    [npm run dev]
    [nodemon]
  }
  database "MongoDB Local" {
    [medical_db_dev]
  }
}

package "Staging" {
  node "Vercel Preview" {
    [Preview Deploy]
  }
  node "Staging API" {
    [Express Staging]
  }
  database "MongoDB Staging" {
    [medical_db_staging]
  }
}

package "Producción" {
  node "Vercel Production" {
    [Production Deploy]
  }
  node "Production API" {
    [Express Production]
  }
  database "MongoDB Production" {
    [medical_db_prod]
  }
}

[npm run dev] --> [medical_db_dev]
[Preview Deploy] --> [Express Staging]
[Express Staging] --> [medical_db_staging]
[Production Deploy] --> [Express Production]
[Express Production] --> [medical_db_prod]

@enduml
```

---

## 9. Trazabilidad UML-Requisitos

### 9.1 Matriz de Trazabilidad

| Diagrama | Requisitos Cubiertos | Issues |
|---|---|---|
| CU General | RF-001 a RF-032 | #5, #6, #7, #8, #9 |
| Clases Dominio | RF-001 a RF-032, RNF-014 | #5, #6, #7, #8 |
| Seq Login | RF-002, RF-004 | #5 |
| Seq Reserva | RF-007 a RF-012 | #7, #8 |
| Estados Cita | RF-007, RF-009, RF-010 | #7, #8 |
| Componentes | RNF-014 | #18, #19 |
| Despliegue | RNF-013 a RNF-016 | #20, #21 |

### 9.2 Cobertura de Requisitos

| Tipo | Total | Cubiertos | % Cobertura |
|---|---|---|---|
| Funcionales | 32 | 32 | 100% |
| No Funcionales | 21 | 18 | 86% |
| Casos de Uso | 19 | 19 | 100% |

---

## Historial de Versiones

| Versión | Fecha | Autor | Cambios |
|---|---|---|---|
| 1.0 | 2024-XX-XX | David | Versión inicial |

---

*Diagramas generados con PlantUML - https://plantuml.com*
