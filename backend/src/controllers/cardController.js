const Card = require('../models/Card');
const Board = require('../models/Board');

// @desc    Obtener todas las tarjetas de un tablero
// @route   GET /api/boards/:boardId/cards
// @access  Private
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({ 
      board: req.params.boardId,
      archived: false 
    })
    .populate('assignees', 'name email')
    .populate('comments.author', 'name email')
    .sort({ order: 1 });

    res.json({
      success: true,
      count: cards.length,
      data: cards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener tarjetas',
      error: error.message
    });
  }
};

// @desc    Crear una nueva tarjeta
// @route   POST /api/boards/:boardId/cards
// @access  Private
exports.createCard = async (req, res) => {
  try {
    const { title, description, columnId, assignees, labels, priority, dueDate } = req.body;

    const card = await Card.create({
      title,
      description,
      board: req.params.boardId,
      columnId,
      assignees,
      labels,
      priority,
      dueDate
    });

    const populatedCard = await Card.findById(card._id)
      .populate('assignees', 'name email');

    res.status(201).json({
      success: true,
      data: populatedCard
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear tarjeta',
      error: error.message
    });
  }
};

// @desc    Actualizar una tarjeta
// @route   PUT /api/cards/:id
// @access  Private
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )
    .populate('assignees', 'name email')
    .populate('comments.author', 'name email');

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Tarjeta no encontrada'
      });
    }

    res.json({
      success: true,
      data: card
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar tarjeta',
      error: error.message
    });
  }
};

// @desc    Mover tarjeta a otra columna
// @route   PUT /api/cards/:id/move
// @access  Private
exports.moveCard = async (req, res) => {
  try {
    const { columnId, order } = req.body;

    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { columnId, order },
      { new: true }
    )
    .populate('assignees', 'name email');

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Tarjeta no encontrada'
      });
    }

    res.json({
      success: true,
      data: card
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al mover tarjeta',
      error: error.message
    });
  }
};

// @desc    Eliminar una tarjeta
// @route   DELETE /api/cards/:id
// @access  Private
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Tarjeta no encontrada'
      });
    }

    await card.deleteOne();

    res.json({
      success: true,
      message: 'Tarjeta eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar tarjeta',
      error: error.message
    });
  }
};

// @desc    Agregar comentario a una tarjeta
// @route   POST /api/cards/:id/comments
// @access  Private
exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Tarjeta no encontrada'
      });
    }

    card.comments.push({
      author: req.user.id,
      content,
      createdAt: new Date()
    });

    await card.save();

    const updatedCard = await Card.findById(card._id)
      .populate('comments.author', 'name email');

    res.json({
      success: true,
      data: updatedCard
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al agregar comentario',
      error: error.message
    });
  }
};

// @desc    Actualizar checklist de una tarjeta
// @route   PUT /api/cards/:id/checklist
// @access  Private
exports.updateChecklist = async (req, res) => {
  try {
    const { checklist } = req.body;
    
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { checklist },
      { new: true }
    )
    .populate('assignees', 'name email');

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Tarjeta no encontrada'
      });
    }

    res.json({
      success: true,
      data: card
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar checklist',
      error: error.message
    });
  }
};
