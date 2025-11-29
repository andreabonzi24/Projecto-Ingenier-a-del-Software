const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sanitizeUserFields, isValidEmail, isStrongPassword } = require('../utils/validators');

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
    const { name, email, password, phone, ID, companyCard, healthCard } = sanitizeUserFields(req.body);

    // Validar campos requeridos
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, proporciona nombre, email y contraseña'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'El email no tiene un formato válido'
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas, números y un carácter especial'
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

@@ -69,60 +84,67 @@ const register = async (req, res) => {
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
    const { email, password } = sanitizeUserFields(req.body);

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, proporciona email y contraseña'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'El email no tiene un formato válido'
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
