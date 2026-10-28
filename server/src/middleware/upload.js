const multer = require('multer');
const AppError = require('../errors/AppError');

/* SECURITY: Improve File Validation */
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new AppError(`${file.mimetype} is not allowed. Allowed types are JPEG, PNG, WebP, HEIC, and HEIF.`, 400));
    }
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MiB
});

module.exports = upload;