'use strict';

const AppError = require('../helpers/AppError');
const { UserModel } = require('../models');

class AuthService {
    static signup = async ({ name, username, email, password, phone }) => {
        let user = await UserModel.findOne({ email });
        if (user) throw new AppError('email address already registered', 400);
        user = new UserModel({ name, username, email, password, phone });

        // Sign JWT token
        const token = await user.signToken();
        await user.save();
        return token;
    };
    static login = async ({ email, password }) => {
        if (!email || !password) {
            throw new AppError('email address and password field is required', 400);
        }

        let user = await UserModel.findOne({ email }).select('+password');

        if (!user) throw new AppError('email address or password is incorrect', 400);
        if (!(await user.confirmPassword(password))) {
            throw new AppError('email address or password is incorrect', 400);
        }

        const token = await user.signToken();
        return token;
    };
    static verifyMe = async ({ email }) => {
        return 1;
    };
    static requestPasswordReset = async ({ email }) => {
        let user = await UserModel.fineOne({ email });
        if (!user) throw new AppError('Please provide a registered email', 400);

        // send mail

        return 1;
    };
    static passwordReset = async ({ email }) => {
        return 1;
    };
    static updateMe = async ({ email }) => {
        return 1;
    };
    static updatePassword = async ({ email }) => {
        return 1;
    };
    static activateMe = async ({ email }) => {
        return 1;
    };
    static deactivateMe = async ({ email }) => {
        return 1;
    };
}

module.exports = AuthService;
