# 🎬 Guía de Demostración - Plataforma de Citas Médicas

**Versión:** 1.0  
**Fecha:** Noviembre 2025  
**Duración estimada:** 15-20 minutos

---

## 📑 Índice

1. [Preparación](#1-preparación)
2. [Estructura de la Demo](#2-estructura-de-la-demo)
3. [Guión de Demostración](#3-guión-de-demostración)
4. [Flujo de Paciente](#4-flujo-de-paciente)
5. [Flujo de Médico](#5-flujo-de-médico)
6. [Flujo de Administrador](#6-flujo-de-administrador)
7. [Checklist de Aceptación](#7-checklist-de-aceptación)
8. [Resolución de Problemas](#8-resolución-de-problemas)

---

## 1. Preparación

### 1.1 Requisitos Previos

**Hardware:**
- Ordenador con conexión a internet
- Resolución mínima: 1280x720
- Navegador moderno (Chrome, Firefox, Safari, Edge)

**Software:**
- Node.js 18+ instalado
- MongoDB ejecutándose (local o Atlas)
- Terminal/CMD

### 1.2 Configuración del Entorno

```bash
# 1. Clonar el repositorio (si no está clonado)
git clone https://github.com/andreabonzi24/Projecto-Ingenier-a-del-Software.git
cd Projecto-Ingenier-a-del-Software

# 2. Instalar dependencias del backend
cd backend
npm install

# 3. Configurar variables de entorno
# Crear archivo .env con el contenido:
# NODE_ENV=development
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/medical-appointments
# JWT_SECRET=demo-secret-key

# 4. Cargar datos de prueba
npm run seed

# 5. Iniciar el servidor
npm run dev
```

### 1.3 Verificar que Todo Funciona

1. Abrir navegador en: `http://localhost:3000`
2. Verificar que se muestra la página principal
3. Verificar que la API responde: `http://localhost:3000/api/health`

### 1.4 Usuarios de Demostración

| Rol | Email | Contraseña |
|-----|-------|------------|
| **Paciente** | maria.lopez@example.test | Paciente123! |
| **Médico** | carlos.ruiz@med.example.test | Doctor2025! |
| **Admin Sistema** | admin@platform.example.test | AdminMaster!2025 |
| **Admin Centro** | laura.martinez@hospital.example.test | CentroAdmin2025! |

---

## 2. Estructura de la Demo

### 2.1 Agenda Sugerida

| Tiempo | Sección | Duración |
|--------|---------|----------|
| 0:00 | Introducción y contexto | 2 min |
| 0:02 | Página principal y navegación | 2 min |
| 0:04 | Flujo de paciente | 5 min |
| 0:09 | Flujo de médico | 3 min |
| 0:12 | Flujo de administrador | 3 min |
| 0:15 | Aspectos técnicos y seguridad | 3 min |
| 0:18 | Preguntas y respuestas | 2 min |

### 2.2 Puntos Clave a Destacar

- ✅ Sistema de autenticación seguro (JWT)
- ✅ Diferentes dashboards por rol
- ✅ Diseño responsivo
- ✅ API REST completa
- ✅ Metodología SCRUM + XP

---

## 3. Guión de Demostración

### 3.1 Introducción (2 min)

**Narración:**

> "Buenos días/tardes. Hoy les presento la Plataforma de Citas Médicas, un sistema web completo desarrollado siguiendo la metodología SCRUM combinada con prácticas de Extreme Programming.

> El sistema permite a pacientes reservar citas médicas, a médicos gestionar su agenda, y a administradores supervisar todo el sistema.

> La aplicación está construida con tecnologías modernas: Node.js y Express en el backend, con autenticación JWT, y un frontend responsivo con Tailwind CSS."

### 3.2 Página Principal (2 min)

**Acciones:**

1. Abrir `http://localhost:3000/index.html`
2. Mostrar diseño responsivo (redimensionar ventana)
3. Destacar elementos principales:
   - Logo y navegación
   - Secciones informativas
   - Botones de acceso

**Narración:**

> "Esta es la página principal de la plataforma. Como pueden ver, tiene un diseño moderno y responsivo que se adapta a diferentes tamaños de pantalla.

> Los usuarios pueden ver información sobre el servicio y acceder al login o registro desde aquí."

---

## 4. Flujo de Paciente

### 4.1 Registro de Nuevo Usuario

**Acciones:**

1. Clic en "Registrarse"
2. Completar formulario:
   - Nombre: "Demo Usuario"
   - Email: "demo@example.com"
   - Contraseña: "DemoPass123!"
3. Enviar formulario
4. Mostrar confirmación

**Narración:**

> "Vamos a simular el registro de un nuevo paciente. El sistema valida el formato del email y la fortaleza de la contraseña."

### 4.2 Inicio de Sesión

**Acciones:**

1. Ir a página de login
2. Introducir credenciales del paciente:
   - Email: `maria.lopez@example.test`
   - Contraseña: `Paciente123!`
3. Hacer clic en "Iniciar Sesión"
4. Observar redirección automática

**Narración:**

> "Ahora iniciamos sesión con un usuario de prueba. Observen cómo el sistema nos redirige automáticamente al dashboard de paciente basándose en nuestro rol."

### 4.3 Dashboard de Paciente

**Acciones:**

1. Explorar secciones del dashboard:
   - Próximas citas
   - Historial
   - Perfil
2. Mostrar información personalizada
3. Navegar por las opciones

**Narración:**

> "Este es el dashboard del paciente. Aquí puede ver sus próximas citas, acceder a su historial médico y gestionar su perfil.

> El diseño está optimizado para que el usuario encuentre fácilmente lo que necesita."

### 4.4 Reservar Nueva Cita

**Acciones:**

1. Clic en "Nueva Cita" o similar
2. Seleccionar especialidad
3. Seleccionar médico
4. Seleccionar fecha disponible
5. Seleccionar hora
6. Confirmar reserva
7. Ver confirmación

**Narración:**

> "El proceso de reserva de cita es muy intuitivo. El paciente selecciona la especialidad, luego el médico, y finalmente la fecha y hora disponibles.

> El sistema solo muestra horarios que están realmente disponibles, evitando conflictos."

### 4.5 Ver y Cancelar Cita

**Acciones:**

1. Ir a "Mis Citas"
2. Ver lista de citas
3. Seleccionar una cita
4. Mostrar opción de cancelar
5. (Opcional) Demostrar cancelación

**Narración:**

> "El paciente puede ver todas sus citas y, si lo necesita, cancelarlas con anticipación. El sistema tiene reglas de negocio que impiden cancelar citas con menos de 12 horas de antelación."

### 4.6 Cerrar Sesión

**Acciones:**

1. Clic en "Cerrar Sesión"
2. Confirmar redirección a página principal
3. Intentar acceder a dashboard sin sesión

**Narración:**

> "Al cerrar sesión, el token JWT se elimina del navegador y el usuario es redirigido a la página principal. Si intenta acceder directamente al dashboard sin sesión, será redirigido al login."

---

## 5. Flujo de Médico

### 5.1 Login como Médico

**Acciones:**

1. Ir a página de login
2. Credenciales:
   - Email: `carlos.ruiz@med.example.test`
   - Contraseña: `Doctor2025!`
3. Iniciar sesión

**Narración:**

> "Ahora veamos la perspectiva del médico. Iniciamos sesión con las credenciales del Dr. Carlos Ruiz."

### 5.2 Dashboard de Médico

**Acciones:**

1. Explorar agenda del día
2. Ver lista de pacientes
3. Mostrar citas programadas
4. Navegar por opciones

**Narración:**

> "El médico tiene un dashboard diferente, optimizado para sus necesidades. Puede ver su agenda del día, la lista de pacientes que atenderá, y acceder al historial de cada uno.

> Observen cómo el sistema adapta la interfaz según el rol del usuario."

### 5.3 Gestión de Citas

**Acciones:**

1. Ver detalles de una cita
2. Mostrar información del paciente
3. (Opcional) Demostrar acciones disponibles

**Narración:**

> "El médico puede ver los detalles de cada cita, incluyendo el motivo de consulta y los datos del paciente. Esto le permite prepararse antes de cada consulta."

---

## 6. Flujo de Administrador

### 6.1 Login como Administrador

**Acciones:**

1. Cerrar sesión actual
2. Login con:
   - Email: `admin@platform.example.test`
   - Contraseña: `AdminMaster!2025`

**Narración:**

> "Finalmente, veamos las funciones de administración. El administrador del sistema tiene acceso a todas las funcionalidades de gestión."

### 6.2 Dashboard de Administrador

**Acciones:**

1. Explorar panel de control
2. Mostrar estadísticas
3. Ver lista de usuarios
4. Ver lista de centros médicos
5. Demostrar opciones de gestión

**Narración:**

> "El administrador tiene una vista completa del sistema. Puede ver estadísticas globales, gestionar usuarios, médicos y centros médicos.

> Este nivel de acceso está protegido y solo disponible para usuarios con rol de administrador."

### 6.3 Gestión de Usuarios

**Acciones:**

1. Ir a sección de usuarios
2. Mostrar lista de usuarios
3. Demostrar filtros (si disponibles)
4. Mostrar opciones de gestión

**Narración:**

> "El administrador puede gestionar todos los usuarios del sistema, activar o desactivar cuentas, y asignar roles."

---

## 7. Checklist de Aceptación

### 7.1 Funcionalidades Core

| # | Funcionalidad | Estado | Verificado |
|---|---------------|--------|------------|
| 1 | Página principal carga correctamente | | ☐ |
| 2 | Formulario de registro funciona | | ☐ |
| 3 | Login de paciente funciona | | ☐ |
| 4 | Redirección por rol correcta | | ☐ |
| 5 | Dashboard de paciente muestra datos | | ☐ |
| 6 | Se puede crear una cita | | ☐ |
| 7 | Se puede ver lista de citas | | ☐ |
| 8 | Se puede cancelar una cita | | ☐ |
| 9 | Logout funciona correctamente | | ☐ |
| 10 | Dashboard de médico funciona | | ☐ |
| 11 | Dashboard de admin funciona | | ☐ |
| 12 | Rutas protegidas redirigen a login | | ☐ |

### 7.2 Aspectos Técnicos

| # | Aspecto | Estado | Verificado |
|---|---------|--------|------------|
| 1 | API responde en /api/health | | ☐ |
| 2 | JWT se genera correctamente | | ☐ |
| 3 | Tokens expiran correctamente | | ☐ |
| 4 | CORS configurado | | ☐ |
| 5 | Errores manejados correctamente | | ☐ |
| 6 | Diseño responsivo | | ☐ |

### 7.3 Seguridad

| # | Control | Estado | Verificado |
|---|---------|--------|------------|
| 1 | Contraseñas hasheadas (bcrypt) | | ☐ |
| 2 | Rutas protegidas con JWT | | ☐ |
| 3 | Validación de roles | | ☐ |
| 4 | Mensajes de error genéricos | | ☐ |

---

## 8. Resolución de Problemas

### 8.1 El servidor no arranca

**Síntoma:** Error al ejecutar `npm run dev`

**Soluciones:**
```bash
# Verificar que MongoDB está corriendo
mongosh --eval "db.adminCommand('ismaster')"

# Verificar que el puerto no está en uso
lsof -i :3000

# Reinstalar dependencias
rm -rf node_modules
npm install
```

### 8.2 Error de conexión a MongoDB

**Síntoma:** "MongoDB connection failed"

**Soluciones:**
1. Verificar que MongoDB está corriendo
2. Verificar URI en `.env`
3. Para MongoDB Atlas: verificar IP whitelist

### 8.3 Login no funciona

**Síntoma:** Error 401 al intentar login

**Soluciones:**
1. Verificar credenciales (case sensitive)
2. Ejecutar `npm run seed` para cargar usuarios
3. Verificar JWT_SECRET en `.env`

### 8.4 Dashboard no carga datos

**Síntoma:** Dashboard vacío o con errores

**Soluciones:**
1. Verificar consola del navegador (F12)
2. Verificar que el token está en localStorage
3. Verificar respuesta de API en Network tab

### 8.5 Problemas de CORS

**Síntoma:** Error de CORS en consola

**Soluciones:**
1. Verificar configuración de CORS en backend
2. Asegurar que frontend y backend están en mismo origen
3. Verificar headers en peticiones

---

## Notas para el Presentador

### Tips para una Demo Exitosa

1. **Practicar antes:** Realizar la demo completa al menos una vez antes
2. **Tener backup:** Tener screenshots listos por si algo falla
3. **Conocer los datos:** Memorizar credenciales de prueba
4. **Preparar respuestas:** Anticipar preguntas técnicas comunes
5. **Tiempo:** Vigilar el tiempo en cada sección

### Qué NO Hacer

- ❌ Mostrar código durante la demo de usuario
- ❌ Usar contraseñas reales o datos sensibles
- ❌ Improvisar sin haber probado antes
- ❌ Ignorar errores (explicarlos brevemente)

### Puntos Técnicos para Destacar

Si la audiencia es técnica, mencionar:
- Arquitectura MVC
- JWT stateless
- Bcrypt para hash de passwords
- Tailwind CSS para estilos
- Metodología SCRUM + XP

---

## Historial de Cambios

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | Nov 2025 | Equipo | Versión inicial |

---

**Documentos relacionados:**
- [04_PLAN_PRUEBAS.md](04_PLAN_PRUEBAS.md) - Plan de pruebas
- [00_MEMORIA_ING_SOFT.md](00_MEMORIA_ING_SOFT.md) - Memoria del proyecto
