const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const Authorization = require('../auth/authorization')


router.get('/test',function(req, res) {
    res.send('Test ok');
})
router.post('/test-post', UserController.testPepe)

router.post('/login', UserController.login)
router.post('/registration', UserController.nuevoUser)
router.get('/userById/:id', Authorization, UserController.getUserById)

// router.put('/', Authorization, UserController.updateUser)
// router.post('/guardarImgUser',UserController.guardarImagenUser)
// router.post('/uploadImg',UploadController.uploadFilesImgUser);
// router.post('/imgUserByMail',Authorization,UserController.getImagenUserByMail)
// router.post('/sendEmail',MailController.sendEmail)


module.exports = router;
