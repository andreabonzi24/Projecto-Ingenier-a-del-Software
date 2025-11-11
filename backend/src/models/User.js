const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email no válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['paciente', 'medico', 'admin_sistema', 'admin_centro'],
    default: 'paciente',
    required: true
  },
  phone: {
    type: String,
    trim: true
  },
  ID: {
    type: String,
    trim: true
  },
  companyCard: {
    type: String,
    trim: true
  },
  healthCard: {
    type: String,
    trim: true
  },
  specialty: {
    type: String,
    trim: true
  },
  licenseNumber: {
    type: String,
    trim: true
  },
  centerId: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastAccess: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice para búsquedas rápidas por email
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);
