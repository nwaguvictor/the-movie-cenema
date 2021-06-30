'use strict';

const nodemailer = require('nodemailer');
const { MAIL_OPTIONS } = require('../config');

const transport = nodemailer.createTransport(MAIL_OPTIONS);

module.exports = {
    // Send welcome email
    async WelcomeEmail(options) {
        return await transport.sendMail({
            from: '"Movie Cinema" <hello@moviecinema.com>',
            to: options?.user,
            subject: options?.subject,
            text: options?.text,
            html: options?.html,
        });
    },
    // Send password reset email
    async PasswordResetEmail() {},
};
