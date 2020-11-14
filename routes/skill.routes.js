const express = require('express');

const skillController = require('../controllers/skill.controllers');

const router = express.Router();

router.get('/add', skillController.getAddSkillPage);
router.post('/add', skillController.addSkill);
router.get('/', skillController.getSkills);
router.delete('/delete/:id', skillController.deleteSkill);

module.exports = router;