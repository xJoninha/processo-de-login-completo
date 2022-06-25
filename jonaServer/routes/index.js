var express = require('express');
var router = express.Router();
const paginaController = require('../controllers/PaginaController')
const middleware = require('../middlewares/VinhoUpload')

/* GET home page. */
router.get('/', paginaController.home);
router.get('/sucesso', (req, res) => res.render('sucesso'))


router.get('/cadastrarProduto', paginaController.productRegister);
router.post('/cadastrarProduto', middleware.upload, paginaController.adicionarProduto);


router.get('/produtos', paginaController.produtos);

module.exports = router;
