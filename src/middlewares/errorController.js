'use strict';

const AppError = require('../helpers/AppError');

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
    let err = { ...error };

    if (error.name === 'MongoError') err = mongooseDuplicateError(error);
    if (error.name === 'ValidationError') err = mongooseValidationError(error);
    if (error.name === 'CastError') err = mongooseCastError(error);

    if (!(err instanceof AppError)) {
        err.code = err.status || 500;
        err.status = err.status || 'error';
        err.message = err.message || 'Server error, please try again later';
    }

    return res.status(err.code).json({
        status: err.status,
        message: err.message,
    });
};
