'use strict';

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../config');
const { catchAsync } = require('../helpers');
const AppError = require('../helpers/AppError');
const { UserService } = require('../services');

exports.auth = catchAsync(async (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    // Get token
    if (!token) {
        return next(new AppError('You need to login first to proceed', 400));
    }

    // Verify token
    const { id } = await promisify(jwt.verify)(token, config.JWT_KEY);
    const user = await UserService.getUser({ _id: id });

    // Verify User with token
    if (!user) {
        return next(new AppError('The user with the assigned token does not exist', 404));
    }

    // Grant access
    req._user = user;
    next();
});
