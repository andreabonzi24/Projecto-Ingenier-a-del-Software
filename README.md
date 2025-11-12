# 🏥 Plataforma de Citas Médicas con Sistema de Gestión de Proyectos

API REST completa para gestión de citas médicas con autenticación JWT, incluyendo sistema de tableros Kanban y roadmaps de proyectos estilo GitHub.

## ✨ Nuevas Características

### 📋 Sistema de Tableros Kanban
- Gestión de tableros con columnas personalizables
- Drag & drop para mover tarjetas
- Prioridades, etiquetas y fechas límite
- Comentarios y listas de verificación
- Gestión de miembros con roles

**Acceso:** [http://localhost:3000/boards.html](http://localhost:3000/boards.html)

### 🗺️ Project Roadmaps (Estilo GitHub)
- Visualización de proyectos con líneas de tiempo
- Gráficos Gantt interactivos
- Gestión de milestones
- Múltiples vistas (Roadmap, Timeline, Table)
- Seguimiento de progreso en tiempo real

**Acceso:** [http://localhost:3000/project_roadmaps.html](http://localhost:3000/project_roadmaps.html)

**📖 Documentación completa:** [docs/BOARDS_AND_ROADMAPS.md](docs/BOARDS_AND_ROADMAPS.md)

## 🚀 Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env` en esta carpeta:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=mi_clave_ultrasecreta_123
MONGODB_URI=mongodb://localhost:27017/medical-appointments
```

### 3. Cargar datos iniciales
```bash
npm run seed
```

### 4. Iniciar el servidor
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

El servidor estará disponible en: **http://localhost:3000**

---

## 📋 Usuarios de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| **Paciente** | maria.lopez@example.test | `Paciente123!` |
| **Médico** | carlos.ruiz@med.example.test | `Doctor2025!` |
| **Admin Sistema** | admin@platform.example.test | `AdminMaster!2025` |
| **Admin Centro** | laura.martinez@hospital.example.test | `CentroAdmin2025!` |

---

## 🛣️ Endpoints Principales

### Autenticación

- `POST /api/auth/register` - Registrar nuevo paciente
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (requiere token)

### Tableros y Tarjetas

- `GET /api/boards` - Listar tableros del usuario
- `POST /api/boards` - Crear nuevo tablero
- `GET /api/boards/:id` - Obtener tablero específico
- `PUT /api/boards/:id` - Actualizar tablero
- `DELETE /api/boards/:id` - Eliminar tablero
- `GET /api/boards/:boardId/cards` - Listar tarjetas
- `POST /api/boards/:boardId/cards` - Crear tarjeta
- `PUT /api/cards/:id/move` - Mover tarjeta entre columnas

### Proyectos y Roadmaps

- `GET /api/projects` - Listar proyectos del usuario
- `POST /api/projects` - Crear nuevo proyecto
- `GET /api/projects/:id` - Obtener proyecto específico
- `GET /api/projects/:id/roadmap` - Obtener roadmap del proyecto
- `PUT /api/projects/:id` - Actualizar proyecto

### Health Check

- `GET /api/health` - Verificar estado del servidor
- `GET /api` - Información de la API

---

## 📖 Documentación Completa

### Nuevas Características:
- **[Sistema de Tableros y Roadmaps](docs/BOARDS_AND_ROADMAPS.md)** - Guía completa de uso
- **[Resumen de Seguridad](docs/SECURITY_SUMMARY.md)** - Análisis de seguridad

### Documentación General:
- **[Documentación Master](docs/00_MASTER_DOCUMENTATION.md)** - Documentación completa del backend

Incluye:
- Arquitectura completa
- Ejemplos de uso con cURL
- Ejemplos de integración con JavaScript
- Flujos de autenticación
- Guía de despliegue en Vercel
- Troubleshooting

---

## 🏗️ Estructura

```
backend/
├── src/
│   ├── server.js              # Servidor Express
│   ├── config/db.js           # Configuración MongoDB
│   ├── models/                # Modelos Mongoose
│   ├── controllers/           # Controladores
│   ├── routes/                # Rutas de la API
│   ├── middlewares/           # Middlewares
│   └── utils/seed.js          # Script de población
├── package.json
└── .env.example
```

---

## 🔐 Ejemplo de Login

```javascript
const response = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'maria.lopez@example.test',
    password: 'Paciente123!'
  })
});

const data = await response.json();
// { success: true, token: "...", role: "paciente" }
```

---

## 📦 Tecnologías

- **Node.js** + **Express.js** - Framework web
- **MongoDB** + **Mongoose** - Base de datos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas

---

## 🆘 Problemas Comunes

### MongoDB no conecta
- Verifica que MongoDB esté corriendo
- Verifica `MONGODB_URI` en `.env`

### Puerto en uso
- Cambia `PORT` en `.env`
- O mata el proceso: `kill -9 $(lsof -t -i:3000)`

---

## ✨ Estado

✅ **100% Funcional** - Listo para desarrollo y producción

---

*Ver [documentación completa](docs/00_MASTER_DOCUMENTATION.md) para más detalles.*
