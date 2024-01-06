const multer = require('multer');

const PATHS = {
    imgPath: './files/images'
}

function getUniqueFileName(originalname) {
    return `${Date.now()}-${originalname}`;
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadFolder = PATHS.imgPath;
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        const uniqueFilename = getUniqueFileName(file.originalname);
        cb(null, uniqueFilename);
    },
});

const upload = multer({ storage: storage });

module.exports = {
    upload,
    getUniqueFileName,
    PATHS
};