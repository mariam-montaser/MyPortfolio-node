const Skill = require('../models/skill');

exports.getAddSkillPage = (req, res) => {
    res.render('add-skill', {pageTitle: 'Add Skill'});
}

exports.addSkill = (req, res) => {
    const {skillName, category} = req.body;
    const newSkill = new Skill({
        skillName,
        category
    });
    newSkill.save().then(skill => {
        res.redirect('/skills')
    }).catch(error => {
        console.log(error);
        res.send(error.message)
    })
}

exports.deleteSkill = (req, res) => {
    const _id = req.params.id;
    Skill.deleteOne({_id}).then(() => {
        res.redirect('/skills');
    }).catch(error => res.send(error.message))
}

exports.getSkills = (req, res) => {
    Skill.find().sort({'category': -1}).then(skills => {
        res.render('skills', {
            pageTitle: 'Skills',
            skills
    })
    }).catch(error => res.send(error.message))
}