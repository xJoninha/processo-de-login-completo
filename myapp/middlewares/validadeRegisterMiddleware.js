const path = require('path');
const { check } = require('express-validator');
// const { off } = require('process');

module.exports = [
    check('name')
        .notEmpty().withMessage('Tem de escrever um nome').bail()
        .trim(),
    check('email')
        .notEmpty().withMessage('Tem de escrever um email').bail()
        .trim().bail()
        .normalizedEmail().bail()
        .isEmail().withMessage('Digite um formato de email correto'),
    check('psw')
        .notEmpty().withMessage('Tem de escrever uma senha').bail()
        .isLength({ min: 6}).withMessage('A senha precisa ter 6 caracteres no minimo').bail()
        .trim(),
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptExtensions = ['.jpg', '.png', '.gif'];

        if(!file) {
            throw new Error('Precisa escolher um arquivo');
        } else {
            let fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtensions)) {
                throw new Error(`As extensões de arquivo permitidas são ${acceptedExtensions.join(', ')}`)
            }
        }

        return true;
    })
];