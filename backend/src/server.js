require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { securityHeaders } = require('./middlewares/securityHeaders');

// Importar rutas
const authRoutes = require('./routes/auth.routes');

// Crear aplicación Express
const app = express();

// Validar variables de entorno críticas
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
requiredEnvVars.forEach((variable) => {
  if (!process.env[variable]) {
    console.error(`❌ Falta la variable de entorno requerida: ${variable}`);
    process.exit(1);
  }
});

// Deshabilitar cabecera de tecnología y confiar en proxy inverso (útil en despliegues)
app.disable('x-powered-by');
app.set('trust proxy', 1);

// Conectar a la base de datos
connectDB();

// Configuración de CORS segura
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origen no permitido por la política CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors());
app.use(cors(corsOptions));
app.use(securityHeaders);
app.use('/api', rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../../web')));

// Rutas de la API
app.use('/api/auth', authRoutes);

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
