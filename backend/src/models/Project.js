const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del proyecto es obligatorio'],
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
  team: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: {
      type: String,
      enum: ['owner', 'maintainer', 'developer', 'viewer'],
      default: 'developer'
    }
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['planning', 'active', 'on_hold', 'completed', 'cancelled'],
    default: 'planning'
  },
  milestones: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date,
    order: Number
  }],
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board'
  }],
  tags: [String],
  visibility: {
    type: String,
    enum: ['private', 'team', 'public'],
    default: 'team'
  },
  settings: {
    defaultView: {
      type: String,
      enum: ['board', 'roadmap', 'table', 'calendar'],
      default: 'roadmap'
    },
    sprintDuration: {
      type: Number,
      default: 14 // días
    }
  },
  statistics: {
    totalTasks: {
      type: Number,
      default: 0
    },
    completedTasks: {
      type: Number,
      default: 0
    },
    progressPercentage: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Índices para búsquedas rápidas
projectSchema.index({ owner: 1 });
projectSchema.index({ 'team.userId': 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ startDate: 1, endDate: 1 });

// Método para calcular el progreso
projectSchema.methods.calculateProgress = function() {
  if (this.statistics.totalTasks === 0) {
    this.statistics.progressPercentage = 0;
  } else {
    this.statistics.progressPercentage = Math.round(
      (this.statistics.completedTasks / this.statistics.totalTasks) * 100
    );
  }
  return this.statistics.progressPercentage;
};

module.exports = mongoose.model('Project', projectSchema);
