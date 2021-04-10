const router = require('express').Router();
const candidateController = require('../controller/candidateController');
const multer = require('multer');
const path = require('path')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'))
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage })

router.get('/', candidateController.front_page);
router.post('/upload', upload.single('upload_file'), candidateController.upload_file)

module.exports = router;