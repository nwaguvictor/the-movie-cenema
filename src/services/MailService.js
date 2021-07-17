'use strict';

const nodemailer = require('nodemailer');
const { MAIL_OPTIONS } = require('../config');

const transport = nodemailer.createTransport(MAIL_OPTIONS);

const MailService = {
    // Send welcome email
    async WelcomeEmail({ subject, text, html, user }) {
        return await transport.sendMail({
            from: 'Movie Cinema <hello@moviecinema.com>',
            to: user?.email,
            subject: subject || `Hello ${user?.name.split(' ')[0] || 'Customer'}!`,
            text,
            html,
        });
    },
    // Send password reset email
    async PasswordResetEmail() {},
};

module.exports = MailService;
