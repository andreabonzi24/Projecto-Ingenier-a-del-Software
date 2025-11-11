const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del centro es obligatorio'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'La dirección es obligatoria'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true
  },
  specialties: [{
    type: String,
    trim: true
  }],
  workingHours: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Center', centerSchema);
