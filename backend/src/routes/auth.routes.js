const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/auth.middleware');

/**
 * @route   POST /api/auth/register
 * @desc    Registrar nuevo usuario (solo pacientes)
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Login de usuario
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/me
 * @desc    Obtener información del usuario actual
 * @access  Private (requiere token)
 */
router.get('/me', authMiddleware, getMe);

module.exports = router;
