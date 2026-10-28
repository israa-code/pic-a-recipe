// Custom error class for handling errors within an HTTP response
class AppError extends Error { 
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;