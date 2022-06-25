const express = require('express');
const fs = require('fs');
const { parse } = require('path');
const path = require('path')
const Produto = require('../models/Produto')

const helper = {
    read: (fileName) => 
        fs.readFileSync(
            path.join(__dirname, `../data/${fileName}`), 'utf-8'),

    write: (fileName, data) => 
        fs.writeFileSync(
            path.join(__dirname, `../data/${fileName}`),
            JSON.stringify(data, null, 2), 'utf-8')
}


const getProdutos = () => JSON.parse(helper.read('produtos.json'))

const setProdutos = (produtos) => helper.write('produtos.json', produtos);


// Verificar codigo lixo
// const getProdutoPorId = (id) =>
//     getProdutos().find((produto) => produto.id == id);

// const getProximoId = async () => {
//     const produtos = await getProdutos();
//     const newId = parseInt(produtos[produtos.length - 1].id) + 1;
//     return newId
// }
// Verificar codigo lixo

const controller = {}

controller.home = (req, res) => res.render('home')


controller.productRegister = (req, res) => {
    res.render('productRegister', {
        title: req.path == '/cadastrarProduto' ? `Cadastro` : `Home`,
    })
}


controller.adicionarProduto = async (req, res) => {
    const produtos = await getProdutos();
    const id = await Produto.generateId();
    const { tipoVinho, nomeProduto, precoProduto } = req.body;
    const produtoFileName = req.file.filename;
    const novoProduto = {
        id,
        tipoVinho,
        nomeProduto,
        precoProduto,
        imageProduto: produtoFileName || null
    };
    produtos.push(novoProduto);
    setProdutos(produtos);
    res.redirect('/sucesso')
}


controller.produtos = async (req, res) => 
res.render("produtos", { title: 'Todos os produtos', produtos: await getProdutos() });



module.exports = controller