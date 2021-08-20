'use strict';

const crypto = require('crypto');
const UserService = require('./UserService');
const MailService = require('./MailService');
const logger = require('../helpers/logger');
const AppError = require('../helpers/AppError');

class AuthService {
    static signup = async (userData) => {
        // Check if user already exist
        let user = await UserService.getUser({ email: userData.email });
        if (user) throw new AppError('A user with email address already registered');

        // Create user
        user = await UserService.createUser(userData);

        // Send Welcome Email to user (test)
        setTimeout(async () => {
            try {
                await MailService.WelcomeEmail({
                    user: { email: user.email, name: user.name },
                    text: `Welcome!. We're delighted to have you.`,
                    html: `<h2>Welcome!</h2> <p>We're delighted to have you.</p>`,
                });
            } catch (error) {
                logger.error('Server Error: Error sending email', error);
            }
        }, 5000);

        // Sign JWT token
        const token = await user.signToken();
        return token;
    };
    static login = async ({ email, password }) => {
        // Confirm user input
        if (!email || !password) throw new AppError('email address and password field is required');

        // Check for valid user with email address
        let user = await UserService.getUser({ email });
        if (!user) throw new AppError('email address or password is incorrect');

        // Confirm user password
        if (!(await user.confirmPassword(password))) {
            throw new AppError('email address or password is incorrect');
        }

        // Sign JWT token
        const token = await user.signToken();
        return token;
    };
    static requestPasswordReset = async (email) => {
        // Get user with given input
        let user = await UserService.getUser({ email });
        if (!user) throw new AppError('Please provide a registered email', 404);

        // Create hash token
        const token = await user.createPasswordResetToken();

        // try sending password reset email
        try {
            await MailService.PasswordResetEmail({ email: user.email, token });
            await user.save();
            return true;
        } catch (error) {
            user.passwordResetToken = undefined;
            user.tokenExpires = undefined;
            await user.save();
            throw new AppError('Server error: an error has occured, please try later', 500);
        }
    };
    static passwordReset = async ({ password, token }) => {
        // Get user using token
        const hashToken = crypto.createHash('sha256').update(token).digest('hex');
        let user = await UserService.getUser({ passwordResetToken: hashToken });
        if (!user) throw new AppError('Invalid token provided, please request again', 401);
        if (Date.now() > new Date(user.tokenExpires).getTime()) {
            throw new AppError('Token expired, please request another token', 401);
        }

        user.password = password;
        user.passwordResetToken = undefined;
        user.tokenExpires = undefined;

        // Sign new token
        const freshToken = user.signToken();
        await user.save();

        return freshToken;
    };
    static verifyMe = async ({ email }) => {
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
