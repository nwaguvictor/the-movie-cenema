'use strict';

class AppError extends Error {
    constructor(message, code) {
        super(message);
        this.status = code >= 400 && code < 500 ? 'fail' : 'error';
        this.code = code;
        this.isOperational = true;

        Error.captureStackTrace(this, this.contructor);
    }
}

// Export Custom Error Class
module.exports = AppError;
