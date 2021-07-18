'use strict';

const { promisify } = require('util');
const jwt = require('jsonwebtoken');

// A wrapper function for catching async functions
// and propagate the error down to error handler middleware
exports.catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

// Generate Hash Token
exports.generateHashToken = async (data, options) => {
    return await promisify(jwt.sign)(data, options);
};
