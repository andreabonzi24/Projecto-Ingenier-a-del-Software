const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título de la tarjeta es obligatorio'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  assignees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  labels: [{
    name: String,
    color: String
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'review', 'done'],
    default: 'todo'
  },
  dueDate: {
    type: Date
  },
  startDate: {
    type: Date
  },
  estimatedHours: {
    type: Number
  },
  actualHours: {
    type: Number
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  checklist: [{
    text: String,
    completed: {
      type: Boolean,
      default: false
    }
  }],
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }],
  archived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índices para búsquedas rápidas
cardSchema.index({ board: 1, columnId: 1, order: 1 });
cardSchema.index({ assignees: 1 });
cardSchema.index({ dueDate: 1 });
cardSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Card', cardSchema);
