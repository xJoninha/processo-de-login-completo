const express = require('express');
const fs = require('fs');
const { parse } = require('path')
const path = require('path');
const { validationResult } = require('express-validator')

const bcrypt = require('bcrypt');
const User = require('../models/User')



const helper = {
    read: (fileName) =>
        fs.readFileSync(
            path.join(__dirname, `../data/${fileName}`), 'utf-8'),

    write: (fileName, data) =>
        fs.writeFileSync(
            path.join(__dirname, `../data/${fileName}`),
            JSON.stringify(data, null, 2), 'utf-8')
}

const getUsuarios = () => JSON.parse(helper.read('users.json'))

const setUsuarios = (usuarios) => helper.write('users.json', usuarios)


const controller = {}

controller.registrarUsuario = (req, res) => {
    res.render('userRegister', {
        title: req.path == '/users/registro' ? `Registro` : `Home`,
    })
}

controller.adicionarUsuario = (req, res) => {
    const resultValidations = validationResult(req);

    if (resultValidations.errors.length > 0) {
        return res.render('userRegister', {
            errors: resultValidations.mapped(),
            oldData: req.body
        });
    }

    let userToCreate = {
        ...req.body,
        userPassword: bcrypt.hashSync(req.body.userPassword, 10)
    }

    let userCreated = User.create(userToCreate)

    return res.redirect('/sucesso')
}

// controller.adicionarUsuario = async (req, res) => {
//     const usuarios = await getUsuarios();
//     const { userAdmin, userName, userEmail, userPassword } = req.body;
//     const novoUsuario = {
//         userAdmin,
//         userName,
//         userEmail,
//         userPassword
//     };
//     usuarios.push(novoUsuario);
//     setUsuarios(usuarios);
//     res.redirect('/sucesso')
// }

controller.todosUsuarios = async (req, res) => 
res.render('usuarios', { title: 'Todos os usuarios', usuarios: await getUsuarios() });





controller.profile = (req, res) => res.render('profile')
controller.login = (req, res) => res.render('loginForm')

module.exports = controller;