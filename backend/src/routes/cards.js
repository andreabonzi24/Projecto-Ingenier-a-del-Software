const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getCards,
  createCard,
  updateCard,
  moveCard,
  deleteCard,
  addComment,
  updateChecklist
} = require('../controllers/cardController');
const { protect } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas para tarjetas dentro de un tablero
router.route('/')
  .get(getCards)
  .post(createCard);

// Rutas para una tarjeta específica
router.route('/:id')
  .put(updateCard)
  .delete(deleteCard);

router.route('/:id/move')
  .put(moveCard);

router.route('/:id/comments')
  .post(addComment);

router.route('/:id/checklist')
  .put(updateChecklist);

module.exports = router;
