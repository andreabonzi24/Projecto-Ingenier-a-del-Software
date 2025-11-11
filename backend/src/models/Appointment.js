const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: [true, 'El ID del paciente es obligatorio']
  },
  doctorId: {
    type: String,
    required: [true, 'El ID del médico es obligatorio']
  },
  centerId: {
    type: String,
    required: [true, 'El ID del centro es obligatorio']
  },
  date: {
    type: String,
    required: [true, 'La fecha es obligatoria']
  },
  time: {
    type: String,
    required: [true, 'La hora es obligatoria']
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada', 'completada'],
    default: 'pendiente'
  },
  notes: {
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

// Índices para búsquedas rápidas
appointmentSchema.index({ patientId: 1 });
appointmentSchema.index({ doctorId: 1 });
appointmentSchema.index({ centerId: 1 });
appointmentSchema.index({ date: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
