const multer = require("multer")
const fs = require("fs");
const { log } = require("console");
const path = require("path")

const audioStorage=multer.diskStorage({
    destination: (req, file, cb) => {
        const existsFile = "uploads/audio"
        if(!fs.existsSync(existsFile)) {  // fileni mavjudligini tekshiriberadi
   fs.mkdirSync(existsFile, {recursive: true}) // uploads papkasini yaratiberadi
    }
    cb(null,existsFile)
},
filename: (req, file, cb ) => {
    const uniqueSuffex = `audio-${Date.now()}${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname)

    cb(null,`${uniqueSuffex}${ext}`)
}
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = /mp3|ogg|mpeg|occ|mp4|aac|wav|flac|aiff|wma|alac|dsd|opus/

    console.log(file);
    

    const extTypes = allowedTypes.test(path.extname(file.originalname).toLowerCase())

    if(extTypes) {
        cb(null, true)
    }else {
        cb(new Error("Not allowed file type"))
    }
}

const upload = multer({
    storage: audioStorage,
    limits: {fileSize: 100 * 1024 *1024},
    fileFilter

})

module.exports = upload