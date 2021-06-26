'use strict';

const AppError = require('../helpers/AppError');
const logger = require('../helpers/logger');

const mongooseDuplicateError = (error) => {
    const [key, value] = Object.entries(error.keyValue)[0];
    const message = `${key} with value: '${value}' already exist`;
    return new AppError(message);
};

const mongooseValidationError = ({ errors }) => {
    let message;
    for (let key in errors) {
        message = errors[key].message;
    }
    return new AppError(message);
};

const mongooseCastError = ({ path, value }) => {
    const message = `Invalid ${path}: ${value}`;

    return new AppError(message);
};

module.exports = (error, req, res, next) => {
    let err = { ...error };

    if (error.name === 'MongoError') err = mongooseDuplicateError(error);
    if (error.name === 'ValidationError') err = mongooseValidationError(error);
    if (error.name === 'CastError') err = mongooseCastError(error);

    if (!(err instanceof AppError)) {
        err.statusCode = error.statusCode || 500;
        err.status = 'error';
        err.message = error.message || 'Internal Server error, please try again later';

        logger.error(`:: 💥${error}`);
    }

    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
