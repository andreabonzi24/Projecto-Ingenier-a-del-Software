const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  addTeamMember,
  updateMilestone,
  getRoadmap
} = require('../controllers/projectController');
const { protect } = require('../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(protect);

router.route('/')
  .get(getProjects)
  .post(createProject);

router.route('/:id')
  .get(getProject)
  .put(updateProject)
  .delete(deleteProject);

router.route('/:id/team')
  .post(addTeamMember);

router.route('/:id/milestones/:milestoneId')
  .put(updateMilestone);

router.route('/:id/roadmap')
  .get(getRoadmap);

module.exports = router;
