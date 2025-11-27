# 📐 Diagramas UML - Plataforma de Citas Médicas

**Versión:** 1.0  
**Fecha:** Noviembre 2025  
**Herramienta:** PlantUML

---

## 📑 Índice

1. [Introducción](#1-introducción)
2. [Diagrama de Casos de Uso](#2-diagrama-de-casos-de-uso)
3. [Diagrama de Actividad](#3-diagrama-de-actividad)
4. [Diagrama de Secuencia](#4-diagrama-de-secuencia)
5. [Diagrama de Clases](#5-diagrama-de-clases)
6. [Cómo Regenerar los Diagramas](#6-cómo-regenerar-los-diagramas)

---

## 1. Introducción

### 1.1 Propósito

Este documento contiene los diagramas UML del sistema, implementados usando PlantUML para facilitar su mantenimiento y versionado junto con el código fuente.

### 1.2 Herramientas

- **PlantUML:** Lenguaje de descripción de diagramas
- **Visualización:** VS Code + PlantUML extension, o servidor online

### 1.3 Convenciones

| Elemento | Notación |
|----------|----------|
| Actor | Figura humana |
| Caso de uso | Óvalo |
| Clase | Rectángulo con compartimentos |
| Relación | Línea con estereotipo |

---

## 2. Diagrama de Casos de Uso

### 2.1 Diagrama General del Sistema

```plantuml
@startuml CasosDeUso_General

left to right direction
skinparam packageStyle rectangle
skinparam actorStyle awesome

title Diagrama de Casos de Uso - Plataforma de Citas Médicas

' ===== ACTORES =====
actor "Paciente" as paciente
actor "Médico" as medico
actor "Admin Sistema" as admin
actor "Admin Centro" as adminCentro

' ===== SISTEMA =====
rectangle "Plataforma de Citas Médicas" {
    
    ' --- Autenticación ---
    package "Autenticación" {
        usecase "Registrarse" as UC_REGISTRO
        usecase "Iniciar Sesión" as UC_LOGIN
        usecase "Cerrar Sesión" as UC_LOGOUT
        usecase "Recuperar Contraseña" as UC_RECOVERY
    }
    
    ' --- Gestión de Citas ---
    package "Gestión de Citas" {
        usecase "Reservar Cita" as UC_RESERVAR
        usecase "Ver Mis Citas" as UC_VER_CITAS
        usecase "Cancelar Cita" as UC_CANCELAR
        usecase "Modificar Cita" as UC_MODIFICAR
        usecase "Ver Agenda" as UC_AGENDA
    }
    
    ' --- Administración ---
    package "Administración" {
        usecase "Gestionar Usuarios" as UC_USERS
        usecase "Gestionar Médicos" as UC_MEDICOS
        usecase "Gestionar Centros" as UC_CENTROS
        usecase "Ver Estadísticas" as UC_STATS
    }
    
    ' --- Notificaciones ---
    package "Notificaciones" {
        usecase "Recibir Notificación" as UC_NOTIF
        usecase "Configurar Alertas" as UC_ALERTAS
    }
}

' ===== RELACIONES PACIENTE =====
paciente --> UC_REGISTRO
paciente --> UC_LOGIN
paciente --> UC_LOGOUT
paciente --> UC_RECOVERY
paciente --> UC_RESERVAR
paciente --> UC_VER_CITAS
paciente --> UC_CANCELAR
paciente --> UC_NOTIF

' ===== RELACIONES MÉDICO =====
medico --> UC_LOGIN
medico --> UC_LOGOUT
medico --> UC_VER_CITAS
medico --> UC_AGENDA
medico --> UC_CANCELAR
medico --> UC_NOTIF

' ===== RELACIONES ADMIN SISTEMA =====
admin --> UC_LOGIN
admin --> UC_LOGOUT
admin --> UC_USERS
admin --> UC_MEDICOS
admin --> UC_CENTROS
admin --> UC_STATS

' ===== RELACIONES ADMIN CENTRO =====
adminCentro --> UC_LOGIN
adminCentro --> UC_LOGOUT
adminCentro --> UC_MEDICOS
adminCentro --> UC_STATS
adminCentro --> UC_VER_CITAS

' ===== EXTENSIONES E INCLUSIONES =====
UC_RESERVAR ..> UC_LOGIN : <<include>>
UC_VER_CITAS ..> UC_LOGIN : <<include>>
UC_MODIFICAR ..> UC_VER_CITAS : <<extend>>
UC_CANCELAR ..> UC_VER_CITAS : <<extend>>

@enduml
```

### 2.2 Descripción de Casos de Uso

#### CU-001: Registrarse

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-001 |
| **Nombre** | Registrarse |
| **Actor Principal** | Paciente |
| **Precondición** | El usuario no tiene cuenta |
| **Postcondición** | El usuario queda registrado en el sistema |
| **Flujo Principal** | 1. Usuario accede a formulario de registro<br>2. Usuario completa datos<br>3. Sistema valida datos<br>4. Sistema crea cuenta<br>5. Sistema confirma registro |
| **Flujo Alternativo** | 3a. Datos inválidos → Mostrar errores |

#### CU-002: Iniciar Sesión

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-002 |
| **Nombre** | Iniciar Sesión |
| **Actor Principal** | Usuario registrado |
| **Precondición** | Usuario tiene cuenta activa |
| **Postcondición** | Usuario autenticado con sesión activa |
| **Flujo Principal** | 1. Usuario introduce credenciales<br>2. Sistema valida<br>3. Sistema genera token JWT<br>4. Sistema redirige a dashboard |
| **Flujo Alternativo** | 2a. Credenciales inválidas → Error genérico |

#### CU-003: Reservar Cita

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-003 |
| **Nombre** | Reservar Cita |
| **Actor Principal** | Paciente |
| **Precondición** | Usuario autenticado como paciente |
| **Postcondición** | Cita creada en el sistema |
| **Flujo Principal** | 1. Paciente selecciona especialidad<br>2. Paciente selecciona médico<br>3. Paciente selecciona fecha/hora<br>4. Sistema valida disponibilidad<br>5. Sistema crea cita<br>6. Sistema notifica confirmación |
| **Flujo Alternativo** | 4a. Horario no disponible → Mostrar alternativas |

---

## 3. Diagrama de Actividad

### 3.1 Proceso de Reserva de Cita

```plantuml
@startuml Actividad_ReservarCita

title Diagrama de Actividad - Reservar Cita Médica

|Paciente|
start
:Acceder a "Nueva Cita";

|Sistema|
:Mostrar formulario de reserva;
:Cargar especialidades disponibles;

|Paciente|
:Seleccionar especialidad;

|Sistema|
:Cargar médicos de la especialidad;

|Paciente|
:Seleccionar médico;

|Sistema|
:Cargar calendario de disponibilidad;

|Paciente|
:Seleccionar fecha;

|Sistema|
:Cargar horarios disponibles;

|Paciente|
:Seleccionar hora;
:Introducir motivo de consulta (opcional);
:Confirmar reserva;

|Sistema|
if (¿Horario disponible?) then (sí)
    :Crear cita en base de datos;
    :Generar número de confirmación;
    :Enviar notificación al paciente;
    :Enviar notificación al médico;
    |Paciente|
    :Ver confirmación de cita;
    stop
else (no)
    :Mostrar mensaje de error;
    :Sugerir horarios alternativos;
    |Paciente|
    :Seleccionar horario alternativo;
    note right: Volver a "Seleccionar hora"
endif

@enduml
```

### 3.2 Proceso de Autenticación

```plantuml
@startuml Actividad_Login

title Diagrama de Actividad - Inicio de Sesión

|Usuario|
start
:Acceder a página de login;
:Introducir email;
:Introducir contraseña;
:Hacer clic en "Iniciar Sesión";

|Sistema|
:Recibir credenciales;
:Buscar usuario por email;

if (¿Usuario existe?) then (sí)
    :Comparar hash de contraseña;
    
    if (¿Contraseña correcta?) then (sí)
        :Generar token JWT;
        :Almacenar token en cliente;
        :Obtener rol del usuario;
        
        switch (Rol)
        case (paciente)
            |Usuario|
            :Redirigir a Dashboard Paciente;
        case (medico)
            |Usuario|
            :Redirigir a Dashboard Médico;
        case (admin_sistema)
            |Usuario|
            :Redirigir a Dashboard Admin;
        case (admin_centro)
            |Usuario|
            :Redirigir a Dashboard Centro;
        endswitch
        
        stop
    else (no)
        :Incrementar intentos fallidos;
    endif
else (no)
    :Registrar intento fallido;
endif

|Usuario|
:Mostrar error genérico;
:Ofrecer "Recuperar contraseña";

stop

@enduml
```

### 3.3 Proceso de Cancelación de Cita

```plantuml
@startuml Actividad_CancelarCita

title Diagrama de Actividad - Cancelar Cita

|Usuario|
start
:Acceder a "Mis Citas";

|Sistema|
:Cargar citas del usuario;
:Mostrar lista de citas;

|Usuario|
:Seleccionar cita a cancelar;
:Hacer clic en "Cancelar";

|Sistema|
:Verificar fecha de la cita;

if (¿Más de 12h de anticipación?) then (sí)
    :Mostrar diálogo de confirmación;
    
    |Usuario|
    if (¿Confirmar cancelación?) then (sí)
        |Sistema|
        :Actualizar estado de cita a "cancelada";
        :Liberar horario del médico;
        :Enviar notificación al paciente;
        :Enviar notificación al médico;
        
        |Usuario|
        :Ver confirmación de cancelación;
        stop
    else (no)
        :Cerrar diálogo;
        stop
    endif
else (no)
    |Sistema|
    :Mostrar error: "No se puede cancelar";
    :Mostrar política de cancelación;
    
    |Usuario|
    :Contactar con centro médico;
    stop
endif

@enduml
```

---

## 4. Diagrama de Secuencia

### 4.1 Secuencia de Login

```plantuml
@startuml Secuencia_Login

title Diagrama de Secuencia - Inicio de Sesión

actor Usuario
participant "Frontend\n(HTML/JS)" as FE
participant "API Gateway\n(/api/auth)" as API
participant "AuthController" as Auth
participant "UserModel" as User
database "MongoDB" as DB

Usuario -> FE : Introducir credenciales
FE -> FE : Validar formato
FE -> API : POST /api/auth/login\n{email, password}

API -> Auth : login(email, password)
Auth -> User : findByEmail(email)
User -> DB : db.users.findOne({email})
DB --> User : userData | null

alt Usuario encontrado
    User --> Auth : userData
    Auth -> Auth : bcrypt.compare(password, hash)
    
    alt Contraseña correcta
        Auth -> Auth : jwt.sign({userId, role})
        Auth --> API : {success: true, token, role}
        API --> FE : 200 OK\n{token, role, user}
        FE -> FE : localStorage.setItem('token')
        FE --> Usuario : Redirigir a dashboard
    else Contraseña incorrecta
        Auth --> API : {success: false, error}
        API --> FE : 401 Unauthorized
        FE --> Usuario : Mostrar error genérico
    end
else Usuario no encontrado
    User --> Auth : null
    Auth --> API : {success: false, error}
    API --> FE : 401 Unauthorized
    FE --> Usuario : Mostrar error genérico
end

@enduml
```

### 4.2 Secuencia de Reservar Cita

```plantuml
@startuml Secuencia_ReservarCita

title Diagrama de Secuencia - Reservar Cita

actor Paciente
participant "Frontend" as FE
participant "API\n(/api/appointments)" as API
participant "AppointmentController" as AC
participant "AppointmentModel" as AM
participant "DoctorModel" as DM
database "MongoDB" as DB

' === Cargar disponibilidad ===
Paciente -> FE : Seleccionar médico y fecha
FE -> API : GET /api/doctors/{id}/availability?date=X
API -> DM : getAvailability(doctorId, date)
DM -> DB : Consultar agenda
DB --> DM : slots disponibles
DM --> API : availableSlots[]
API --> FE : 200 OK {slots}
FE --> Paciente : Mostrar horarios disponibles

' === Crear cita ===
Paciente -> FE : Seleccionar hora y confirmar
FE -> API : POST /api/appointments\n{doctorId, date, time, reason}
API -> API : Validar token JWT
API -> AC : createAppointment(data)

AC -> AM : checkConflict(doctorId, date, time)
AM -> DB : Buscar citas existentes
DB --> AM : existingAppointments[]

alt Sin conflictos
    AM --> AC : no conflict
    AC -> AM : create(appointmentData)
    AM -> DB : db.appointments.insertOne()
    DB --> AM : appointmentId
    AM --> AC : newAppointment
    
    AC -> AC : Enviar notificación email
    AC --> API : {success: true, appointment}
    API --> FE : 201 Created
    FE --> Paciente : Mostrar confirmación
else Conflicto de horario
    AM --> AC : conflict exists
    AC --> API : {error: "Horario no disponible"}
    API --> FE : 409 Conflict
    FE --> Paciente : Mostrar error y alternativas
end

@enduml
```

### 4.3 Secuencia de Validación de Sesión

```plantuml
@startuml Secuencia_ValidarSesion

title Diagrama de Secuencia - Validación de Sesión (Acceso a Dashboard)

actor Usuario
participant "Frontend" as FE
participant "authMiddleware" as MW
participant "API\n(/api/auth)" as API
participant "AuthController" as Auth
database "MongoDB" as DB

Usuario -> FE : Acceder a dashboard
FE -> FE : Obtener token de localStorage

alt Token existe
    FE -> API : GET /api/auth/me\nAuthorization: Bearer {token}
    API -> MW : verifyToken(token)
    
    MW -> MW : jwt.verify(token, secret)
    
    alt Token válido
        MW -> MW : Extraer userId
        MW --> API : userId
        API -> Auth : getCurrentUser(userId)
        Auth -> DB : findById(userId)
        DB --> Auth : userData
        Auth --> API : {user, role}
        API --> FE : 200 OK {user}
        FE --> Usuario : Mostrar dashboard
    else Token inválido/expirado
        MW --> API : TokenError
        API --> FE : 401 Unauthorized
        FE -> FE : localStorage.removeItem('token')
        FE --> Usuario : Redirigir a login
    end
else Token no existe
    FE --> Usuario : Redirigir a login
end

@enduml
```

---

## 5. Diagrama de Clases

### 5.1 Modelo de Dominio

```plantuml
@startuml Clases_ModeloDominio

title Diagrama de Clases - Modelo de Dominio

skinparam classAttributeIconSize 0

' ===== CLASE USER =====
class User {
    - _id: ObjectId
    - nombre: String
    - email: String
    - password: String (hashed)
    - telefono: String
    - role: RoleEnum
    - activo: Boolean
    - createdAt: Date
    - updatedAt: Date
    --
    + comparePassword(password): Boolean
    + toJSON(): Object
}

enum RoleEnum {
    PACIENTE
    MEDICO
    ADMIN_SISTEMA
    ADMIN_CENTRO
}

' ===== CLASE PACIENTE =====
class Paciente {
    - _id: ObjectId
    - userId: ObjectId <<FK>>
    - fechaNacimiento: Date
    - direccion: String
    - historialMedico: String
    - alergias: String[]
    --
    + getCitas(): Appointment[]
    + getHistorial(): MedicalRecord[]
}

' ===== CLASE MEDICO =====
class Medico {
    - _id: ObjectId
    - userId: ObjectId <<FK>>
    - especialidad: String
    - numeroColegiado: String
    - centroMedico: ObjectId <<FK>>
    - horarioAtencion: Schedule
    --
    + getAgenda(fecha): TimeSlot[]
    + getCitasDia(fecha): Appointment[]
}

' ===== CLASE APPOINTMENT =====
class Appointment {
    - _id: ObjectId
    - pacienteId: ObjectId <<FK>>
    - medicoId: ObjectId <<FK>>
    - centroId: ObjectId <<FK>>
    - fecha: Date
    - hora: String
    - duracion: Number
    - estado: EstadoCita
    - motivo: String
    - notas: String
    - createdAt: Date
    --
    + cancelar(): void
    + confirmar(): void
    + completar(notas): void
}

enum EstadoCita {
    PENDIENTE
    CONFIRMADA
    EN_CURSO
    COMPLETADA
    CANCELADA
    NO_ASISTIO
}

' ===== CLASE CENTRO MEDICO =====
class CentroMedico {
    - _id: ObjectId
    - nombre: String
    - direccion: String
    - telefono: String
    - email: String
    - especialidades: String[]
    - horario: Schedule
    - activo: Boolean
    --
    + getMedicos(): Medico[]
    + getEspecialidades(): String[]
}

' ===== CLASE SCHEDULE =====
class Schedule {
    - lunes: TimeRange
    - martes: TimeRange
    - miercoles: TimeRange
    - jueves: TimeRange
    - viernes: TimeRange
    - sabado: TimeRange
    - domingo: TimeRange
    --
    + isAvailable(dia, hora): Boolean
}

class TimeRange {
    - inicio: String
    - fin: String
    - disponible: Boolean
}

' ===== CLASE NOTIFICATION =====
class Notification {
    - _id: ObjectId
    - userId: ObjectId <<FK>>
    - tipo: TipoNotificacion
    - titulo: String
    - mensaje: String
    - leida: Boolean
    - createdAt: Date
    --
    + marcarLeida(): void
}

enum TipoNotificacion {
    CITA_CREADA
    CITA_CONFIRMADA
    CITA_CANCELADA
    RECORDATORIO
    SISTEMA
}

' ===== RELACIONES =====
User "1" -- "0..1" Paciente : tiene >
User "1" -- "0..1" Medico : tiene >
User "1" -- "*" Notification : recibe >

Paciente "1" -- "*" Appointment : solicita >
Medico "1" -- "*" Appointment : atiende >

Medico "*" -- "1" CentroMedico : trabaja en >
CentroMedico "1" -- "*" Appointment : hospeda >

Medico "1" *-- "1" Schedule : tiene >
CentroMedico "1" *-- "1" Schedule : tiene >
Schedule "1" *-- "7" TimeRange : contiene >

User -- RoleEnum
Appointment -- EstadoCita
Notification -- TipoNotificacion

@enduml
```

### 5.2 Arquitectura de Capas

```plantuml
@startuml Clases_Arquitectura

title Diagrama de Clases - Arquitectura del Sistema

skinparam packageStyle rectangle

package "Presentation Layer (Frontend)" {
    class HTMLPages {
        + index.html
        + login.html
        + register.html
        + patient_dashboard.html
        + doctor_dashboard.html
        + admin_dashboard.html
    }
    
    class JavaScriptModules {
        + api.js
        + common.js
        + navigation.js
        + appointments-manager.js
    }
}

package "API Layer (Backend)" {
    class Routes {
        + authRoutes
        + appointmentRoutes
        + userRoutes
        + centerRoutes
    }
    
    class Middlewares {
        + authMiddleware
        + validationMiddleware
        + errorMiddleware
        + rateLimiter
    }
}

package "Business Layer" {
    class Controllers {
        + AuthController
        + AppointmentController
        + UserController
        + CenterController
    }
    
    class Services {
        + AuthService
        + EmailService
        + NotificationService
    }
}

package "Data Access Layer" {
    class Models {
        + UserModel
        + AppointmentModel
        + CenterModel
        + NotificationModel
    }
    
    class Database {
        + MongoDB
        + Mongoose
    }
}

' Relaciones
HTMLPages --> JavaScriptModules : usa
JavaScriptModules --> Routes : HTTP requests
Routes --> Middlewares : pasa por
Middlewares --> Controllers : delega
Controllers --> Services : usa
Controllers --> Models : usa
Models --> Database : accede

@enduml
```

---

## 6. Cómo Regenerar los Diagramas

### 6.1 Requisitos

- **Java Runtime:** JRE 8 o superior
- **Graphviz:** Para diagramas de secuencia y actividad
- **PlantUML:** JAR o extensión de VS Code

### 6.2 Instalación

#### Opción A: VS Code Extension

```bash
# Instalar extensión PlantUML
# Buscar "PlantUML" en extensiones de VS Code
# ID: jebbs.plantuml
```

#### Opción B: Línea de comandos

```bash
# Instalar Java (si no está instalado)
sudo apt-get install default-jre

# Instalar Graphviz
sudo apt-get install graphviz

# Descargar PlantUML
wget https://sourceforge.net/projects/plantuml/files/plantuml.jar
```

### 6.3 Generar Diagramas

#### Desde VS Code

1. Abrir archivo `.puml` o bloque de código PlantUML
2. Usar `Alt+D` para preview
3. Usar `Ctrl+Shift+P` → "PlantUML: Export Current Diagram"

#### Desde línea de comandos

```bash
# Generar PNG
java -jar plantuml.jar diagrama.puml

# Generar SVG
java -jar plantuml.jar -tsvg diagrama.puml

# Generar todos los diagramas de una carpeta
java -jar plantuml.jar -tpng docs/uml/
```

### 6.4 Servidor Online

También se pueden visualizar en:
- **PlantUML Web Server:** http://www.plantuml.com/plantuml
- **PlantText:** https://www.planttext.com/

### 6.5 Integración con CI/CD

```yaml
# Ejemplo para GitHub Actions
- name: Generate UML Diagrams
  run: |
    sudo apt-get install -y graphviz
    wget -q https://sourceforge.net/projects/plantuml/files/plantuml.jar
    java -jar plantuml.jar -tpng docs/uml/*.puml
```

---

## Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | Nov 2025 | Equipo | Versión inicial con todos los diagramas |

---

**Documentos relacionados:**
- [01_REQUISITOS.md](01_REQUISITOS.md) - Requisitos del sistema
- [03_ARQUITECTURA.md](03_ARQUITECTURA.md) - Arquitectura del sistema
