var express = require('express');
var router = express.Router();


// Controllers

const usersController = require('../controllers/userController')

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware')
const validations = require('../middlewares/validadeRegisterMiddleware')

// Formulário de registro
router.get('/register', usersController.register)

// Processar o registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister)

// Formulário de login
router.get('/login', usersController.login)

// Processamento do formulário de login
router.post('/login', usersController.loginProcess)

// Perfil de usuário
router.get('/profile/', usersController.profile)

// Processar o login
// router.post('/login', usersController.loginProcess)

// Logout
// router.get('/logout/', usersController.logout)

module.exports = router;
