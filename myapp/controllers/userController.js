const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')

const User = require('../models/User')

const controller = {
    register: (req, res) => {
        return res.render('userRegisterForm');
    },
    processRegister: (req, res) => {
        const resultValidations = validationResult(req);

        if (resultValidations.errors.length > 0) {
            return res.render('userRegisterForm', {
                errors: resultValidations.mapped(),
                oldData: req.body
            });
        }

        let userExists = User.findUserByField('email', req.body.email);

        if(userExists) {
            return res.render('userRegisterForm', {
                errors: {
                    email: {
                        msg: 'Este email já está registrado'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            psw: bcrypt.hashSync(req.body.psw, 10),
            avatar: req.file.filename
        }

        
        let userToCreated = User.create(userToCreate);

        return res.redirect('/user/login');

    },

    login: (req, res) => {
        return res.render('userLoginForm');
    },
    loginProcess: (req, res) => {
        let userToLogin = User.findUserByField('email', req.body.email);

        if(userToLogin) {
            let isPasswordVerified = bcrypt.compareSync(req.body.psw, userToLogin.psw)

            if(isPasswordVerified) {
                return res.send('OK')
            }
        }

        return res.render('userLoginForm', {
            errors: {
                email: {
                    msg: 'Este email não foi encontrado'
                }
            }
        })
    },
    profile: (req, res) => {
        return res.render('userProfile');
    },

    logout: (req, res) => {
        res.clearCookies('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}