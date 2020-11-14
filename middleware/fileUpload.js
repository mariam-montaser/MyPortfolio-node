const path = require('path');

const multer = require('multer');

const MIMIE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let error = new Error('Invalid image type');
        const isValid = MIMIE_TYPE_MAP[file.mimetype];
        const imagePath = 'uploads/';
        if(isValid) {
            
            console.log('valid');
            error = null
        } else {
            console.log(file.mimetype);
        }
        cb(error, imagePath);
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIMIE_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext)
    }
})


module.exports = multer({storage})