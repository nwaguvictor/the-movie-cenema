'use strict';

const { catchAsync } = require('../helpers');
const { AuthService } = require('../services');

class AuthController {
    static signup = catchAsync(async (req, res, next) => {
        const token = await AuthService.signup(req.body);
        res.status(200).json({ status: 'success', token });
    });
    static login = catchAsync(async (req, res, next) => {
        const token = await AuthService.login(req.body);
        res.status(200).json({ status: 'success', token });
    });
    static requestPasswordReset = catchAsync(async (req, res, next) => {
        res.status(200).json({ status: 'success' });
    });
    static passwordReset = catchAsync(async (req, res, next) => {
        res.status(200).json({ status: 'success' });
    });
}

module.exports = AuthController;
