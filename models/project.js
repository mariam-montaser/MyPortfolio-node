const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true
    },
    projectLink: {
        type: String,
        required: true
    },
    githubLink: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    create_at:{
        type: Date,
        default: Date.now()
    }
},
{
    timestamps: true
});

const Project = mongoose.model('Project', ProjectSchema, 'portfolioProjects');

module.exports = Project;