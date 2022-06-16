var express = require('express');
var router = express.Router();
const paginaController = require('../controllers/paginaController')
const middleware = require('../middlewares/vinhoupload')

/* GET home page. */
router.get('/home', paginaController.home);
router.get('/sucesso', (req, res) => res.render('sucesso'))


router.get('/cadastrar', paginaController.register);
router.post('/cadastrar', middleware.upload, paginaController.adicionarProduto);


router.get('/login', paginaController.login);
router.get('/profile', paginaController.profile);

module.exports = router;
