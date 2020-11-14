const Project = require('../models/project');

exports.getAppProjectPage = (req, res) => {
    res.render('add-project', {pageTitle: 'Add Project'})
}

exports.addProject = (req, res) => {
    console.log(req.file);
    console.log(req.body);
    const { projectName, projectLink, githubLink } = req.body;
    const url = req.protocol + '://' + req.get('host');
    const newProject = new Project({ 
        projectName, 
        projectLink, 
        githubLink, 
        imagePath: url + '/images/' + req.file.filename
    });
    newProject.save().then(project => {
        res.redirect('/projects');
    }).catch(error => {
        console.log(error);
        
    })
}

exports.getEditProjectPage = (req, res) => {
    const _id = req.params.id;
    Project.findOne({ _id }).then(project => {
        res.render('edit-project', {
            pageTitle: 'Edit Project',
            project
        })
    }).catch(error => {
        res.send(error.message);
    })
    
}

exports.updateProject = (req, res) => {
    console.log(req.file);
    const _id = req.params.id;
    const { projectName, projectLink, githubLink } = req.body;
    let image;
    Project.findOne({ _id }).then(fetchedProject => {
            if(req.file) {
                const url = req.protocol + '://' + req.get('host');
                image = url + '/images/' +  req.file.filename
            } else {
                image = fetchedProject.imagePath
            }
            fetchedProject.projectName = projectName;
            fetchedProject.projectLink = projectLink;
            fetchedProject.githubLink = githubLink;
            fetchedProject.imagePath = image;
            return fetchedProject.save()
    })
    .then(updatedProject => {
        res.redirect('/projects');
    }).catch(error => {
        res.send(error.message);
    })
}

exports.deleteProject = (req, res) => {
    const _id = req.params.id;
    Project.findOneAndRemove({ _id }, { multi: false }).then(() => {
        res.redirect('/projects')
    }).catch(error => {
        console.log(error);
        res.send(error.message);
    })
}

exports.getProject = (req, res) => {
    const _id = req.params.id;
    Project.findOne({ _id }).then(project => {
        res.status(200).json({ success: true, data: project });
    }).catch(error => {
        res.status(500).json(error);
    })
}

exports.getAllProjects = (req, res) => {
    Project.find().then(projects => {
        res.render('projects', {
            pageTitle: 'Projects',
            projects
        })
    }).catch(error => {
        res.send(error.message);
    })
}