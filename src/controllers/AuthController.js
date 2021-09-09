'use strict';

const { catchAsync } = require('../helpers');
const { AuthService } = require('../services');
const AppError = require('../helpers/AppError');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');
const { UserService } = require('../services');

class AuthController {
    static signup = catchAsync(async (req, res, next) => {
        const token = await AuthService.signup(req.body);
        res.status(200).json({ status: 'success', token });
    });
    static verify = catchAsync(async (req, res, next) => {
        await AuthService.verifyMe(req.query);
        res.status(200).json({ status: 'success' });
    });
    static login = catchAsync(async (req, res, next) => {
        const token = await AuthService.login(req.body);
        res.status(200).json({ status: 'success', token });
    });
    static requestPasswordReset = catchAsync(async (req, res, next) => {
        const { email } = req.body;
        if (!email) return next(new AppError('Please provide email address'));
        await AuthService.requestPasswordReset(email);

        res.status(200).json({
            status: 'success',
            message: 'A reset password link was sent to this email address',
        });
    });
    static passwordReset = catchAsync(async (req, res, next) => {
        const { token } = req.params;
        const { password, passwordConfirm } = req.body;

        // Confirm user inputs
        if (!token) return next(new AppError('Please use the link sent to your email address'));
        if (!password) return next(new AppError('Password field is required'));
        if (!passwordConfirm) return next(new AppError('Password confirm field is required'));

        if (password !== passwordConfirm) {
            return next(new AppError('Password and confirm password does not match'));
        }

        const freshToken = await AuthService.passwordReset({ password, token });
        res.status(200).json({ status: 'success', token: freshToken });
    });
}

module.exports = AuthController;
