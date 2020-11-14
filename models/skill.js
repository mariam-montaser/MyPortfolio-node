const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skillName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Skill = mongoose.model('Skill', skillSchema, 'portfolioSkills');

module.exports = Skill;