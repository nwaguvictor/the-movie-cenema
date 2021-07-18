'use strict';

require('dotenv').config();

const { APP_NAME, CLIENT_URI, MONGO_DB_URI, PORT, JWT_KEY, JWT_EXPIRES, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } =
    process.env;

const config = {
    production: {
        APP_NAME,
        CLIENT_URI,
        JWT_KEY,
        JWT_EXPIRES,
        DB_URI: MONGO_DB_URI,
        PORT: PORT || 5000,
        ROLES: ['admin', 'customer'],
        MAIL_OPTIONS: {
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: true,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS,
            },
        },
    },
    development: {
        APP_NAME,
        CLIENT_URI,
        JWT_KEY,
        JWT_EXPIRES,
        DB_URI: 'mongodb://localhost:27017/movie_cenema_db',
        PORT: PORT || 5000,
        ROLES: ['admin', 'customer'],
        MAIL_OPTIONS: {
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: false,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS,
            },
        },
    },
    test: {
        APP_NAME,
        CLIENT_URI,
        JWT_KEY,
        JWT_EXPIRES,
        DB_URI: 'mongodb://localhost:27017/movie_cenema_test_db',
        PORT: PORT || 2021,
        ROLES: ['admin', 'customer'],
        MAIL_OPTIONS: {
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: false,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS,
            },
        },
    },
};

const environment = process.env.NODE_ENV;

// Export environment configurations
module.exports = config[environment] || config['development'];
