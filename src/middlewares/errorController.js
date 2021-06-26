'use strict';

const AppError = require('../helpers/AppError');
const logger = require('../helpers/logger');

const mongooseDuplicateError = (error) => {
    const [key, value] = Object.entries(error.keyValue)[0];
    const message = {
        type: 'Duplaication Error',
        errorMessage: `${key} with value: '${value}' already exist`,
    };
    return new AppError(message);
};

const mongooseValidationError = ({ errors }) => {
    let message = { type: 'Validation Error', errorMessage: {} };
    for (let key in errors) {
        message.errorMessage[key] = errors[key].message;
    }
    return new AppError(message);
};

const mongooseCastError = ({ path, value }) => {
    const message = {
        type: 'Cast Error',
        errorMessage: `Invalid ${path}: ${value}`,
    };
    return new AppError(message);
};

module.exports = (error, req, res, next) => {
    if (error.name === 'MongoError') error = mongooseDuplicateError(error);
    if (error.name === 'ValidationError') error = mongooseValidationError(error);
    if (error.name === 'CastError') error = mongooseCastError(error);

    if (!(error instanceof AppError)) {
        error.statusCode = error.status || 500;
        error.status = 'error';
        error.message = error.message || 'Internal Server error, please try again later';

        logger.error(`:: 💥${error}`);
    }

    return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    });
};
