var express = require('express');
var router = express.Router();
const controller = require('../controllers/UserController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/registro', controller.registrarUsuario)
router.post('/registro', controller.adicionarUsuario)

router.get('/login', controller.login);
router.get('/profile', controller.profile);

module.exports = router;
