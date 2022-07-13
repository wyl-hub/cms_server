const multer = require('koa-multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/imgs')
    },
    filename: function(req, file, cb) {
        const fileFormat = file.originalname.split('.')
        cb(null, `${Date.now()}${fileFormat[0].slice(0, 3)}.${fileFormat[fileFormat.length - 1]}`)
    }
})

const upload = multer({ storage })

module.exports = upload