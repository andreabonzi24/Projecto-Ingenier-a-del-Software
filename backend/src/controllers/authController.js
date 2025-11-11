const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Generar token JWT
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  );
};

/**
 * Registro de nuevos usuarios (solo pacientes)
 * POST /api/auth/register
 */
const register = async (req, res) => {
  try {
    const { name, email, password, phone, ID, companyCard, healthCard } = req.body;

    // Validar campos requeridos
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, proporciona nombre, email y contraseña'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El email ya está registrado'
      });
    }

    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario (siempre con role "paciente")
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'paciente',
      phone,
      ID,
      companyCard,
      healthCard
    });

    // Generar token
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario',
      error: error.message
    });
  }
};

/**
 * Login de usuarios
 * POST /api/auth/login
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, proporciona email y contraseña'
      });
    }

    // Buscar usuario por email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Actualizar último acceso
    user.lastAccess = new Date();
    await user.save();

    // Generar token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: 'Login correcto',
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
};

/**
 * Obtener información del usuario actual
 * GET /api/auth/me
 */
const getMe = async (req, res) => {
  try {
    // req.user viene del middleware de autenticación
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        ID: user.ID,
        companyCard: user.companyCard,
        healthCard: user.healthCard,
        specialty: user.specialty,
        licenseNumber: user.licenseNumber,
        centerId: user.centerId,
        createdAt: user.createdAt,
        lastAccess: user.lastAccess
      }
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener información del usuario',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};
