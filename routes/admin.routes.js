const express = require('express');

const adminController = require('../controllers/admin.controllers');

const router = express.Router();

router.get('/login', adminController.getLoginPage);
router.post('/login', adminController.login);
// router.put('/edit', adminController.editProfile);
router.post('/signup', adminController.signup);


module.exports = router;