const multer = require('multer')



const MINE_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}

const fileUpload = multer({
    limits: 500000, // limit file size to 5mb

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
    cb(null, 'uploads/images')
        },
        filename: (req, file, cb) => {
         const ext = MINE_TYPE_MAP[file.mimetype]
         cb(null, `${Date.now()}-${Math.floor(Math.random()*100000000000)}.${ext}`) //use to name the image
        }
    }), //for direction and file name

    fileFilter: (req, file, cb) => {
        const isValid = !!MINE_TYPE_MAP[file.mimetype]
        let error = isValid ? null : new Error('Invalid mime type')
        cb(error, isValid)
    }, //adding a wrong file should now not be possible
})

module.exports = fileUpload