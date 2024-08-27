const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/produto/:id', produtoController.getProdutoById);
router.get('/produtos', produtoController.getAllProdutos);
router.post('/produto/cadastrar', produtoController.cadastrarProduto);
router.post('/produto/atualizar', produtoController.atualizarProduto);
router.post('/produto/excluir', produtoController.excluirProduto);

module.exports = router;
