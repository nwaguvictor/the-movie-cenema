'use strict';

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 400;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';

        Error.captureStackTrace(this, this.contructor);
    }
}

module.exports = AppError;
