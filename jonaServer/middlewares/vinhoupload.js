const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/images/vinhos')),
    filename: (req, file, cb) => {
        const generatorName = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname 
        cb(null, file.fieldname + '-' + generatorName)
    }
})

const upload = multer({ storage: storage})

const middleware = {}

middleware.upload = upload.single('imageProduto')

module.exports = middleware