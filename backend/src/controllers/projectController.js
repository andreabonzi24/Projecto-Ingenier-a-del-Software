const Project = require('../models/Project');
const Board = require('../models/Board');
const Card = require('../models/Card');

// @desc    Obtener todos los proyectos del usuario
// @route   GET /api/projects
// @access  Private
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { 'team.userId': req.user.id }
      ]
    })
    .populate('owner', 'name email')
    .populate('team.userId', 'name email')
    .populate('boards')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyectos',
      error: error.message
    });
  }
};

// @desc    Obtener un proyecto por ID
// @route   GET /api/projects/:id
// @access  Private
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('team.userId', 'name email')
      .populate('boards');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    // Verificar acceso
    const hasAccess = project.owner._id.toString() === req.user.id ||
      project.team.some(m => m.userId._id.toString() === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para acceder a este proyecto'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyecto',
      error: error.message
    });
  }
};

// @desc    Crear un nuevo proyecto
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    const { title, description, startDate, endDate, milestones, visibility } = req.body;

    const project = await Project.create({
      title,
      description,
      owner: req.user.id,
      startDate,
      endDate,
      milestones: milestones || [],
      visibility: visibility || 'team'
    });

    const populatedProject = await Project.findById(project._id)
      .populate('owner', 'name email');

    res.status(201).json({
      success: true,
      data: populatedProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear proyecto',
      error: error.message
    });
  }
};

// @desc    Actualizar un proyecto
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    // Verificar permisos
    const isOwner = project.owner.toString() === req.user.id;
    const isMaintainer = project.team.some(
      m => m.userId.toString() === req.user.id && m.role === 'maintainer'
    );

    if (!isOwner && !isMaintainer) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para actualizar este proyecto'
      });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    .populate('owner', 'name email')
    .populate('team.userId', 'name email')
    .populate('boards');

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar proyecto',
      error: error.message
    });
  }
};

// @desc    Eliminar un proyecto
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    // Solo el dueño puede eliminar
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Solo el dueño puede eliminar este proyecto'
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: 'Proyecto eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar proyecto',
      error: error.message
    });
  }
};

// @desc    Agregar miembro al equipo
// @route   POST /api/projects/:id/team
// @access  Private
exports.addTeamMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    // Verificar permisos
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Solo el dueño puede agregar miembros al equipo'
      });
    }

    // Verificar si ya es miembro
    const isMember = project.team.some(m => m.userId.toString() === userId);
    if (isMember) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya es miembro de este proyecto'
      });
    }

    project.team.push({ userId, role: role || 'developer' });
    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate('owner', 'name email')
      .populate('team.userId', 'name email');

    res.json({
      success: true,
      data: updatedProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al agregar miembro al equipo',
      error: error.message
    });
  }
};

// @desc    Actualizar milestone
// @route   PUT /api/projects/:id/milestones/:milestoneId
// @access  Private
exports.updateMilestone = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    const milestone = project.milestones.id(req.params.milestoneId);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone no encontrado'
      });
    }

    Object.assign(milestone, req.body);
    
    if (req.body.completed && !milestone.completedAt) {
      milestone.completedAt = new Date();
    }

    await project.save();

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar milestone',
      error: error.message
    });
  }
};

// @desc    Obtener roadmap del proyecto (vista de línea de tiempo)
// @route   GET /api/projects/:id/roadmap
// @access  Private
exports.getRoadmap = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('boards');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    // Obtener todas las tarjetas de los tableros del proyecto
    const cards = await Card.find({
      board: { $in: project.boards.map(b => b._id) }
    })
    .populate('assignees', 'name email')
    .sort({ startDate: 1 });

    // Construir roadmap
    const roadmap = {
      project: {
        title: project.title,
        startDate: project.startDate,
        endDate: project.endDate,
        status: project.status,
        progress: project.statistics.progressPercentage
      },
      milestones: project.milestones,
      tasks: cards.map(card => ({
        id: card._id,
        title: card.title,
        startDate: card.startDate,
        dueDate: card.dueDate,
        status: card.status,
        priority: card.priority,
        assignees: card.assignees,
        progress: card.checklist.length > 0 
          ? Math.round((card.checklist.filter(c => c.completed).length / card.checklist.length) * 100)
          : 0
      }))
    };

    res.json({
      success: true,
      data: roadmap
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener roadmap',
      error: error.message
    });
  }
};
