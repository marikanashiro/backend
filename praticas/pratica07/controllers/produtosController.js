const mongoose = require('mongoose');

const Produto = require('../models/produtosModel');

async function criar(req, res) {
  try {
    const novoProduto = await Produto.create({
      nome: req.body.nome,
      preco: req.body.preco,
    });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
}

async function listar(req, res) {
  const produtosCadastrados = await Produto.find({});
  res.status(200).json(produtosCadastrados);
}

async function buscar(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }

  const produtoEncontrado = await Produto.findById(req.params.id);
  if (!produtoEncontrado) {
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }

  req.produto = produtoEncontrado;
  next();
}

function exibir(req, res) {
  res.status(200).json(req.produto);
}

async function atualizar(req, res) {
    if (!req.body.nome || req.body.preco == null) {
        return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
    }
  try {
    const produtoAtualizado = await Produto.findOneAndUpdate(
      { _id: req.params.id },
      { nome: req.body.nome, preco: req.body.preco },
      { runValidators: true, new: true }
    );
    res.status(200).json(produtoAtualizado);
  } catch (error) {
    res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
}

async function remover(req, res) {
  await Produto.findOneAndDelete({ _id: req.params.id });
  res.status(204).send();
}

module.exports = { criar, listar, buscar, exibir, atualizar, remover };