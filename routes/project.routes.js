const express = require('express');

const projectController = require('../controllers/project.controllers');
const fileUpload = require('../middleware/fileUpload')

const router = express.Router();

router.get('/add', projectController.getAppProjectPage);
router.post('/add', fileUpload.single('image'), projectController.addProject);
router.get('/', projectController.getAllProjects);
router.get('/edit/:id', projectController.getEditProjectPage);
router.put('/edit/:id', fileUpload.single('image'), projectController.updateProject);
router.delete('/delete/:id', projectController.deleteProject);
router.get('/:id', projectController.getProject);

module.exports = router;