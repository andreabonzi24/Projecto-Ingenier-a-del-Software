const Board = require('../models/Board');
const Card = require('../models/Card');

// @desc    Obtener todos los tableros del usuario
// @route   GET /api/boards
// @access  Private
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({
      $or: [
        { owner: req.user.id },
        { 'members.userId': req.user.id }
      ]
    })
    .populate('owner', 'name email')
    .populate('members.userId', 'name email')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: boards.length,
      data: boards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener tableros',
      error: error.message
    });
  }
};

// @desc    Obtener un tablero por ID
// @route   GET /api/boards/:id
// @access  Private
exports.getBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members.userId', 'name email');

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    // Verificar que el usuario tiene acceso
    const hasAccess = board.owner._id.toString() === req.user.id ||
      board.members.some(m => m.userId._id.toString() === req.user.id);

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para acceder a este tablero'
      });
    }

    res.json({
      success: true,
      data: board
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener tablero',
      error: error.message
    });
  }
};

// @desc    Crear un nuevo tablero
// @route   POST /api/boards
// @access  Private
exports.createBoard = async (req, res) => {
  try {
    const { title, description, columns, visibility } = req.body;

    // Columnas por defecto si no se proporcionan
    const defaultColumns = columns || [
      { title: 'Por hacer', order: 0, color: '#ef4444' },
      { title: 'En progreso', order: 1, color: '#f59e0b' },
      { title: 'En revisión', order: 2, color: '#3b82f6' },
      { title: 'Completado', order: 3, color: '#10b981' }
    ];

    const board = await Board.create({
      title,
      description,
      owner: req.user.id,
      columns: defaultColumns,
      visibility: visibility || 'private'
    });

    const populatedBoard = await Board.findById(board._id)
      .populate('owner', 'name email');

    res.status(201).json({
      success: true,
      data: populatedBoard
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear tablero',
      error: error.message
    });
  }
};

// @desc    Actualizar un tablero
// @route   PUT /api/boards/:id
// @access  Private
exports.updateBoard = async (req, res) => {
  try {
    let board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    // Verificar que el usuario es el dueño o admin
    const isOwner = board.owner.toString() === req.user.id;
    const isAdmin = board.members.some(
      m => m.userId.toString() === req.user.id && m.role === 'admin'
    );

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para actualizar este tablero'
      });
    }

    board = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    .populate('owner', 'name email')
    .populate('members.userId', 'name email');

    res.json({
      success: true,
      data: board
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar tablero',
      error: error.message
    });
  }
};

// @desc    Eliminar un tablero
// @route   DELETE /api/boards/:id
// @access  Private
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    // Solo el dueño puede eliminar el tablero
    if (board.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Solo el dueño puede eliminar este tablero'
      });
    }

    // Eliminar todas las tarjetas asociadas
    await Card.deleteMany({ board: req.params.id });

    await board.deleteOne();

    res.json({
      success: true,
      message: 'Tablero eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar tablero',
      error: error.message
    });
  }
};

// @desc    Agregar miembro al tablero
// @route   POST /api/boards/:id/members
// @access  Private
exports.addMember = async (req, res) => {
  try {
    const { userId, role } = req.body;
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    // Verificar permisos
    if (board.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Solo el dueño puede agregar miembros'
      });
    }

    // Verificar si el usuario ya es miembro
    const isMember = board.members.some(m => m.userId.toString() === userId);
    if (isMember) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya es miembro de este tablero'
      });
    }

    board.members.push({ userId, role: role || 'member' });
    await board.save();

    const updatedBoard = await Board.findById(board._id)
      .populate('owner', 'name email')
      .populate('members.userId', 'name email');

    res.json({
      success: true,
      data: updatedBoard
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al agregar miembro',
      error: error.message
    });
  }
};
