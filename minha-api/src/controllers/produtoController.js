const fs = require('fs');
const path = require('path');

const produtosPath = path.join(__dirname, '../../data/produtos.json');

function getProdutos() {
  const data = fs.readFileSync(produtosPath);
  return JSON.parse(data);
}

function saveProdutos(produtos) {
  fs.writeFileSync(produtosPath, JSON.stringify(produtos, null, 2));
}

exports.getProdutoById = (req, res) => {
  const produtos = getProdutos();
  const produto = produtos.find(p => p.id === parseInt(req.params.id));

  if (!produto) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  res.json(produto);
};

exports.getAllProdutos = (req, res) => {
  const produtos = getProdutos();
  res.json(produtos);
};

exports.cadastrarProduto = (req, res) => {
  const produtos = getProdutos();
  const novoProduto = {
    id: produtos.length ? produtos[produtos.length - 1].id + 1 : 1,
    nome: req.body.nome,
    quantidade: req.body.quantidade
  };

  produtos.push(novoProduto);
  saveProdutos(produtos);

  res.status(201).json(novoProduto);
};

exports.atualizarProduto = (req, res) => {
  const produtos = getProdutos();
  const produto = produtos.find(p => p.id === parseInt(req.body.id));

  if (!produto) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  produto.quantidade = req.body.quantidade;
  saveProdutos(produtos);

  res.json(produto);
};

exports.excluirProduto = (req, res) => {
  let produtos = getProdutos();
  const produtoIndex = produtos.findIndex(p => p.id === parseInt(req.body.id));

  if (produtoIndex === -1) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }

  produtos.splice(produtoIndex, 1);
  saveProdutos(produtos);

  res.status(204).send();
};
