'use strict';

const nodemailer = require('nodemailer');
const { MAIL_OPTIONS, CLIENT_URI, APP_NAME } = require('../config');

const transport = nodemailer.createTransport(MAIL_OPTIONS);

const MailService = {
    // Send welcome email
    async WelcomeEmail({ user, subject, text, html }) {
        return await transport.sendMail({
            from: `${APP_NAME} <hello@moviecinema.com>`,
            to: user?.email,
            subject: subject || `Hello ${user?.name.split(' ')[0] || 'Customer'}!`,
            text,
            html,
        });
    },
    // Send password reset email
    async PasswordResetEmail({ email, token }) {
        return await transport.sendMail({
            from: `${APP_NAME} <support@moviecinema.com>`,
            to: email,
            subject: 'Password Reset',
            text: token,
            html: `
            <p>Password Reset Link<p>
            <a href="${CLIENT_URI}/password-reset/${token}">Reset my password</a>
            <p>Link will expire in 10mins.</p>
            <p>If you did not make a request to reset password, please ignore.</p>
            `,
        });
    },
};

module.exports = MailService;
