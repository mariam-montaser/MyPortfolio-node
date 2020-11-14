const Admin = require('../models/admin');

const encPass = require('../middleware/encPass');
const auth = require('../middleware/auth');

exports.getLoginPage = (req, res) => {
    res.render('login', {
        pageTitle: 'Login'
    })
}

exports.signup = (req, res) => {
    const { username, email, password } = req.body;
    encPass.EncryptePass(password).then(hashedPassword => {
        const newAdmin = new Admin({ username, email, password: hashedPassword });
        return newAdmin.save().then(admin => {
            res.status(201).json({ success: true, message: 'admin created. Please login' });
        })
    }).catch(error => {
        res.status(500).json(error);
    })

}



exports.login = (req, res) => {
    console.log('data', req.body);
    const { username, password } = req.body;
    Admin.findOne({ username }).then(admin => {
        if (admin) {
            encPass.ComparePasswords(password, admin.password).then(same => {
                if (same) {
                    // return auth.CreateToken({ username }).then(token => {
                    //     res.status(200).json({ success: true, message: 'valid intery', token });
                    // })
                    res.redirect('/')
                }
            }).catch(error => {
                console.log(error)
                // res.status(400).json({ success: false, message: error.message });
                res.send('Error');
                
            })
        } else {
            // res.status(400).json({ success: false, message: 'invalid username or password' });
        }
    })
}

exports.editProfile = (req, res) => {
    // const { username, password } = req.body;
    // encPass.EncryptePass(password).then(hashedPassword => {
    //     const updatedAdmin = new Admin({ username, password: hashedPassword });
    //     return Admin.save().then(admin => {
    //         res.status(201).json({ success: true, message: 'admin created. Please login' });
    //     })
    // }).catch(error => {
    //     res.status(500).json(error);
    // })
}