const express = require('express');

const Project = require('../models/project');
const Skill = require('../models/skill');

const router = express.Router();

router.get('/projects', (req, res) => {
    Project.find().then(projects => {
        if(projects.length > 0) {
            res.status(200).json(projects);
        } else {
            res.status(200).json('No Projects Yet.');
        }
    }).catch(error => {
            res.status(500).json(error.message);
    })
});

router.get('/skills', (req, res) => {
    Skill.find().then(skills => {
        if(skills.length > 0) {
            res.status(200).json(skills);
        } else {
            res.status(200).json('No Skills Yet.');
        }
    }).catch(error => {
            res.status(500).json(error.message);
    })
});


module.exports = router;