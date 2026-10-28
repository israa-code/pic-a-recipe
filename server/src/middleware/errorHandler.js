const multer = require('multer');
const AppError = require('../errors/AppError');

const errorHandler = (error, req, res, next) => {
    if (res.headersSent) { //check if response headers have already been sent
        return next(error); 
    }

    if (error instanceof AppError) { //check AppError
        return res.status(error.statusCode).json({ error: error.message });
    }

    if (error instanceof multer.MulterError) { //check multer error
        const statusCode = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400;
        const message = error.code === 'LIMIT_FILE_SIZE'
            ? 'Image must be 10 MB or smaller.'
            : 'Invalid image upload.';
        return res.status(statusCode).json({ error: message });
    }

    if (error.status === 400) { //check for bad request errors
        return res.status(400).json({ error: 'Invalid request.' });
    }

    console.error('Unhandled server error:', error); //log any unhandled errors for debugging purposes
    return res.status(500).json({ error: 'Internal server error.' });
};

module.exports = errorHandler;