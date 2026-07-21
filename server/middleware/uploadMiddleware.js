const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
     destination: (req, file, cb) =>cb(null, 'uploads/'),
     filename: (req, file, cb) =>{
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`)
     },
});



const fileFilter = (req, file, cb ) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase());
    if(ok) return cb(null, true);
    cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed'))
};



const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 1024 * 1024 * 5}, // 5MB
});



module.exports = upload;