const express = require('express');
const router = express.Router();
const {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  addMember
} = require('../controllers/boardController');
const { protect } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(protect);

router.route('/')
  .get(getBoards)
  .post(createBoard);

router.route('/:id')
  .get(getBoard)
  .put(updateBoard)
  .delete(deleteBoard);

router.route('/:id/members')
  .post(addMember);

module.exports = router;
