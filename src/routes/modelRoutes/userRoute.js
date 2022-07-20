const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');
const Authorization = require('../../auth/authorization')
const jwtValidation = require('../../auth/jwtValidation')

// This routes will be appended to "http://localhost:3600/users"

router.post('/login', UserController.login)
router.post('/registration', UserController.nuevoUser)
router.get('/userById/:id', UserController.getUserById)
router.put('/update', UserController.updateUser) // add jwtValidation.checkToken as middleware

router.post('/reset', UserController.reset);
router.post('/usertoken', UserController.validateUserToken)
router.post('/password', UserController.updatePassword)


module.exports = router;
