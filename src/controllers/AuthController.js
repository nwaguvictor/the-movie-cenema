'use strict';

const { catchAsync } = require('../helpers');
const { AuthService, MailService } = require('../services');

class AuthController {
    static signup = catchAsync(async (req, res, next) => {
        const { email, name } = req.body;
        const token = await AuthService.signup(req.body);

        // Send Welcome Email (test)
        setTimeout(async () => {
            await MailService.WelcomeEmail({
                user: { email, name },
                text: `Welcome!. We're delighted to have you.`,
                html: `<h2>Welcome!</h2> <p>We're delighted to have you.</p>`,
            });
        }, 5000);

        // Send response
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
