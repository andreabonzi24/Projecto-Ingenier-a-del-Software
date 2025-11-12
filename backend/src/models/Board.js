const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del tablero es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member', 'viewer'],
      default: 'member'
    }
  }],
  columns: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: '#6b7280'
    }
  }],
  isTemplate: {
    type: Boolean,
    default: false
  },
  visibility: {
    type: String,
    enum: ['private', 'team', 'public'],
    default: 'private'
  },
  settings: {
    allowComments: {
      type: Boolean,
      default: true
    },
    allowAttachments: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

// Índices para búsquedas rápidas
boardSchema.index({ owner: 1 });
boardSchema.index({ 'members.userId': 1 });
boardSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Board', boardSchema);
