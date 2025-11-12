# 📋 Sistema de Tableros y Project Roadmaps

Documentación completa del sistema de gestión de tableros tipo Kanban y roadmaps de proyectos estilo GitHub.

## 📑 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Modelos de Datos](#modelos-de-datos)
3. [API Endpoints](#api-endpoints)
4. [Interfaces de Usuario](#interfaces-de-usuario)
5. [Guía de Uso](#guía-de-uso)
6. [Ejemplos de Uso](#ejemplos-de-uso)

---

## 🎯 Introducción

El sistema incluye dos componentes principales:

### Tableros (Boards)
- Tableros Kanban personalizables
- Gestión de tarjetas con drag-and-drop
- Columnas configurables
- Asignación de miembros y permisos
- Prioridades y etiquetas

### Project Roadmaps
- Gestión de proyectos con líneas de tiempo
- Milestones y sprints
- Múltiples vistas (Roadmap, Timeline, Table)
- Gráficos Gantt
- Seguimiento de progreso

---

## 🗄️ Modelos de Datos

### Board (Tablero)

```javascript
{
  _id: ObjectId,
  title: String,              // Título del tablero
  description: String,        // Descripción opcional
  owner: ObjectId,            // Usuario propietario
  members: [{                 // Miembros del tablero
    userId: ObjectId,
    role: String              // 'owner', 'admin', 'member', 'viewer'
  }],
  columns: [{                 // Columnas del tablero
    title: String,
    order: Number,
    color: String
  }],
  visibility: String,         // 'private', 'team', 'public'
  settings: {
    allowComments: Boolean,
    allowAttachments: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Card (Tarjeta)

```javascript
{
  _id: ObjectId,
  title: String,              // Título de la tarjeta
  description: String,        // Descripción detallada
  board: ObjectId,            // ID del tablero
  columnId: ObjectId,         // ID de la columna
  order: Number,              // Orden dentro de la columna
  assignees: [ObjectId],      // Usuarios asignados
  labels: [{                  // Etiquetas personalizadas
    name: String,
    color: String
  }],
  priority: String,           // 'low', 'medium', 'high', 'urgent'
  status: String,             // 'todo', 'in_progress', 'review', 'done'
  dueDate: Date,              // Fecha límite
  startDate: Date,            // Fecha de inicio
  estimatedHours: Number,
  actualHours: Number,
  attachments: [{             // Archivos adjuntos
    name: String,
    url: String,
    type: String
  }],
  comments: [{                // Comentarios
    author: ObjectId,
    content: String,
    createdAt: Date
  }],
  checklist: [{               // Lista de verificación
    text: String,
    completed: Boolean
  }],
  dependencies: [ObjectId],   // Tarjetas dependientes
  archived: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Project (Proyecto)

```javascript
{
  _id: ObjectId,
  title: String,              // Título del proyecto
  description: String,        // Descripción
  owner: ObjectId,            // Usuario propietario
  team: [{                    // Equipo del proyecto
    userId: ObjectId,
    role: String              // 'owner', 'maintainer', 'developer', 'viewer'
  }],
  startDate: Date,            // Fecha de inicio
  endDate: Date,              // Fecha de finalización
  status: String,             // 'planning', 'active', 'on_hold', 'completed', 'cancelled'
  milestones: [{              // Milestones del proyecto
    title: String,
    description: String,
    dueDate: Date,
    completed: Boolean,
    completedAt: Date,
    order: Number
  }],
  boards: [ObjectId],         // Tableros asociados
  tags: [String],             // Etiquetas
  visibility: String,         // 'private', 'team', 'public'
  settings: {
    defaultView: String,      // 'board', 'roadmap', 'table', 'calendar'
    sprintDuration: Number    // Duración del sprint en días
  },
  statistics: {
    totalTasks: Number,
    completedTasks: Number,
    progressPercentage: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 API Endpoints

### Autenticación

Todos los endpoints requieren autenticación JWT en el header:
```
Authorization: Bearer <token>
```

### Boards (Tableros)

#### Listar Tableros
```
GET /api/boards
```
Respuesta:
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

#### Obtener Tablero
```
GET /api/boards/:id
```

#### Crear Tablero
```
POST /api/boards
Content-Type: application/json

{
  "title": "Mi Tablero",
  "description": "Descripción del tablero",
  "visibility": "private"
}
```

#### Actualizar Tablero
```
PUT /api/boards/:id
Content-Type: application/json

{
  "title": "Nuevo Título",
  "description": "Nueva descripción"
}
```

#### Eliminar Tablero
```
DELETE /api/boards/:id
```

#### Agregar Miembro
```
POST /api/boards/:id/members
Content-Type: application/json

{
  "userId": "user_id",
  "role": "member"
}
```

### Cards (Tarjetas)

#### Listar Tarjetas de un Tablero
```
GET /api/boards/:boardId/cards
```

#### Crear Tarjeta
```
POST /api/boards/:boardId/cards
Content-Type: application/json

{
  "title": "Nueva Tarea",
  "description": "Descripción de la tarea",
  "columnId": "column_id",
  "priority": "high",
  "dueDate": "2025-12-31"
}
```

#### Actualizar Tarjeta
```
PUT /api/cards/:id
Content-Type: application/json

{
  "title": "Título actualizado",
  "status": "in_progress"
}
```

#### Mover Tarjeta
```
PUT /api/cards/:id/move
Content-Type: application/json

{
  "columnId": "new_column_id",
  "order": 0
}
```

#### Eliminar Tarjeta
```
DELETE /api/cards/:id
```

#### Agregar Comentario
```
POST /api/cards/:id/comments
Content-Type: application/json

{
  "content": "Texto del comentario"
}
```

#### Actualizar Checklist
```
PUT /api/cards/:id/checklist
Content-Type: application/json

{
  "checklist": [
    { "text": "Item 1", "completed": true },
    { "text": "Item 2", "completed": false }
  ]
}
```

### Projects (Proyectos)

#### Listar Proyectos
```
GET /api/projects
```

#### Obtener Proyecto
```
GET /api/projects/:id
```

#### Crear Proyecto
```
POST /api/projects
Content-Type: application/json

{
  "title": "Nuevo Proyecto",
  "description": "Descripción del proyecto",
  "startDate": "2025-01-01",
  "endDate": "2025-12-31"
}
```

#### Actualizar Proyecto
```
PUT /api/projects/:id
Content-Type: application/json

{
  "status": "active",
  "description": "Nueva descripción"
}
```

#### Eliminar Proyecto
```
DELETE /api/projects/:id
```

#### Agregar Miembro al Equipo
```
POST /api/projects/:id/team
Content-Type: application/json

{
  "userId": "user_id",
  "role": "developer"
}
```

#### Actualizar Milestone
```
PUT /api/projects/:id/milestones/:milestoneId
Content-Type: application/json

{
  "completed": true
}
```

#### Obtener Roadmap
```
GET /api/projects/:id/roadmap
```
Respuesta incluye:
- Información del proyecto
- Lista de milestones
- Tareas con sus fechas y progreso

---

## 🖥️ Interfaces de Usuario

### Tableros (boards.html)

**Características:**
- Vista de lista de tableros
- Vista Kanban con columnas personalizables
- Drag-and-drop para mover tarjetas
- Modal para crear tableros
- Modal para crear tarjetas
- Indicadores de prioridad con colores
- Contador de tarjetas por columna

**Acceso:**
```
http://localhost:3000/boards.html
```

### Project Roadmaps (project_roadmaps.html)

**Características:**
- Lista de proyectos con estadísticas
- Vista Roadmap con gráfico Gantt
- Vista Timeline cronológica
- Vista Table tabular
- Gestión de milestones
- Indicadores de progreso
- Badges de estado

**Acceso:**
```
http://localhost:3000/project_roadmaps.html
```

---

## 📖 Guía de Uso

### Crear un Tablero

1. Accede a `boards.html`
2. Click en "Nuevo Tablero"
3. Completa el formulario:
   - Título (requerido)
   - Descripción (opcional)
   - Visibilidad (privado/equipo/público)
4. Click en "Crear"

El tablero se crea con 4 columnas por defecto:
- Por hacer
- En progreso
- En revisión
- Completado

### Crear Tarjetas

1. Abre un tablero
2. Click en "Nueva Tarjeta"
3. Completa el formulario:
   - Título (requerido)
   - Descripción
   - Columna destino
   - Prioridad
   - Fecha límite
4. Click en "Crear"

### Mover Tarjetas (Drag & Drop)

1. Click y mantén presionado sobre una tarjeta
2. Arrastra a la columna deseada
3. Suelta para mover la tarjeta

### Crear un Proyecto

1. Accede a `project_roadmaps.html`
2. Click en "Nuevo Proyecto"
3. Completa el formulario:
   - Título (requerido)
   - Descripción
   - Fecha de inicio
   - Fecha de fin
4. Click en "Crear"

### Ver Roadmap

1. Abre un proyecto
2. El roadmap se muestra por defecto con:
   - Milestones en la parte superior
   - Gráfico Gantt de tareas

### Cambiar de Vista

En el roadmap, usa las pestañas:
- **Roadmap**: Vista de gráfico Gantt
- **Timeline**: Vista cronológica
- **Table**: Vista tabular

---

## 💡 Ejemplos de Uso

### Ejemplo 1: Crear un Tablero con cURL

```bash
curl -X POST http://localhost:3000/api/boards \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Desarrollo Web",
    "description": "Tablero para tareas de desarrollo",
    "visibility": "team"
  }'
```

### Ejemplo 2: Crear una Tarjeta

```bash
curl -X POST http://localhost:3000/api/boards/BOARD_ID/cards \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implementar login",
    "description": "Crear sistema de autenticación",
    "columnId": "COLUMN_ID",
    "priority": "high",
    "dueDate": "2025-12-15"
  }'
```

### Ejemplo 3: Crear un Proyecto con JavaScript

```javascript
const response = await fetch('http://localhost:3000/api/projects', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Portal de Pacientes',
    description: 'Desarrollo del portal web para pacientes',
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    milestones: [
      {
        title: 'Diseño UI/UX',
        dueDate: '2025-02-01',
        order: 0
      },
      {
        title: 'Desarrollo Backend',
        dueDate: '2025-04-01',
        order: 1
      },
      {
        title: 'Launch',
        dueDate: '2025-06-30',
        order: 2
      }
    ]
  })
});

const data = await response.json();
console.log(data);
```

### Ejemplo 4: Obtener Roadmap de un Proyecto

```javascript
const response = await fetch(`http://localhost:3000/api/projects/${projectId}/roadmap`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();

// data.data contiene:
// - project: información del proyecto
// - milestones: lista de milestones
// - tasks: tareas con fechas y progreso
```

### Ejemplo 5: Mover una Tarjeta

```javascript
const response = await fetch(`http://localhost:3000/api/cards/${cardId}/move`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    columnId: newColumnId,
    order: 0
  })
});
```

---

## 🔧 Configuración

### Variables de Entorno

Asegúrate de tener configurado en tu `.env`:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
MONGODB_URI=mongodb://localhost:27017/medical-appointments
```

### Iniciar el Sistema

```bash
# Backend
cd backend
npm install
npm run dev

# El frontend se sirve automáticamente desde /web
```

---

## 🎨 Personalización

### Colores de Prioridad

Puedes personalizar los colores en `boards.js`:

```javascript
const priorityColors = {
  'low': 'bg-gray-100 text-gray-700',
  'medium': 'bg-blue-100 text-blue-700',
  'high': 'bg-orange-100 text-orange-700',
  'urgent': 'bg-red-100 text-red-700'
};
```

### Columnas por Defecto

Para cambiar las columnas por defecto, modifica `boardController.js`:

```javascript
const defaultColumns = [
  { title: 'Backlog', order: 0, color: '#6b7280' },
  { title: 'To Do', order: 1, color: '#ef4444' },
  { title: 'In Progress', order: 2, color: '#f59e0b' },
  { title: 'Done', order: 3, color: '#10b981' }
];
```

---

## 📊 Estadísticas y Métricas

El sistema automáticamente calcula:
- Progreso de proyectos (%)
- Número de tareas totales
- Número de tareas completadas
- Progreso de tarjetas basado en checklist

---

## 🛡️ Seguridad

- Autenticación JWT requerida en todos los endpoints
- Verificación de permisos por rol
- Solo el propietario puede eliminar tableros/proyectos
- Control de acceso basado en visibilidad

---

## 📝 Notas

- Las tarjetas archivadas no se muestran en la vista Kanban
- Los milestones completados se muestran con un checkmark
- El gráfico Gantt se ajusta automáticamente a las fechas del proyecto
- El drag-and-drop funciona solo dentro del mismo tablero

---

## 🔄 Próximas Funcionalidades

- Notificaciones en tiempo real
- Exportación de roadmaps a PDF
- Vista de calendario
- Filtros avanzados
- Búsqueda global
- Plantillas de tableros
- Automatizaciones

---

*Documentación actualizada: Noviembre 2025*
