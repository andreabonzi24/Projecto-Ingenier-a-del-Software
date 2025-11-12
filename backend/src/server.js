require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Importar rutas
const authRoutes = require('./routes/auth.routes');
const boardRoutes = require('./routes/boards');
const cardRoutes = require('./routes/cards');
const projectRoutes = require('./routes/projects');

// Crear aplicación Express
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../../web')));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/boards/:boardId/cards', cardRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/projects', projectRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Ruta raíz de la API
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'API de Plataforma de Citas Médicas',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me (requiere token)'
      },
      boards: {
        list: 'GET /api/boards',
        create: 'POST /api/boards',
        get: 'GET /api/boards/:id',
        update: 'PUT /api/boards/:id',
        delete: 'DELETE /api/boards/:id'
      },
      cards: {
        list: 'GET /api/boards/:boardId/cards',
        create: 'POST /api/boards/:boardId/cards',
        update: 'PUT /api/cards/:id',
        delete: 'DELETE /api/cards/:id'
      },
      projects: {
        list: 'GET /api/projects',
        create: 'POST /api/projects',
        roadmap: 'GET /api/projects/:id/roadmap'
      }
    }
  });
});

// Manejo de rutas no encontradas de la API
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta de API no encontrada'
  });
});

// Servir el frontend para cualquier otra ruta
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../web/index.html'));
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor solo si no está en Vercel (entorno serverless)
// En Vercel, la exportación de 'app' es suficiente
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ═══════════════════════════════════════════════════════');
    console.log(`   Servidor iniciado en modo ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Puerto: ${PORT}`);
    console.log(`   URL: http://localhost:${PORT}`);
    console.log(`   API: http://localhost:${PORT}/api`);
    console.log('🚀 ═══════════════════════════════════════════════════════');
    console.log('');
  });
}

// Exportar la aplicación para Vercel
module.exports = app;
