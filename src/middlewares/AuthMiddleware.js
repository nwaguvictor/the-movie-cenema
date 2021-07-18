'use strict';

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { JWT_KEY, ROLES } = require('../config');
const { catchAsync } = require('../helpers');
const AppError = require('../helpers/AppError');
const { UserService } = require('../services');

exports.auth = catchAsync(async (req, res, next) => {
    // Get token
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) return next(new AppError('Unauthorized access: you need to login first to proceed'));

    // Verify token
    const { id } = await promisify(jwt.verify)(token, JWT_KEY);
    const user = await UserService.getUser({ _id: id });

    // Verify User with token
    if (!user) return next(new AppError('Unauthorized access: user with token does not exist', 401));
    if (!user.isActivated) return next(new AppError('Unauthorized access: account has been deactivated', 401));
    if (!user.isVerified) return next(new AppError('Unauthorized access: please verify email address', 401));
    if (!ROLES.includes(user.role)) return next(AppError('Unauthorized access: access denied', 401));
    // Grant access
    req._user = user;
    next();
});
