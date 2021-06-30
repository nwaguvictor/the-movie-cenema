'use strict';

require('dotenv').config();

const { MONGO_DB_URI, PORT, JWT_KEY, JWT_EXPIRES, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } =
    process.env;

const config = {
    production: {
        DB_URI: MONGO_DB_URI,
        PORT: PORT,
        JWT_KEY: JWT_KEY,
        JWT_EXPIRES: JWT_EXPIRES,
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
        DB_URI: MONGO_DB_URI || 'mongodb://localhost:27017/movie_cenema_db',
        PORT: PORT || 5000,
        JWT_KEY: JWT_KEY,
        JWT_EXPIRES: JWT_EXPIRES,
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
        DB_URI: MONGO_DB_URI || 'mongodb://localhost:27017/movie_cenema_test_db',
        PORT: PORT || 2021,
        JWT_KEY: JWT_KEY,
        JWT_EXPIRES: JWT_EXPIRES,
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
};

const environment = process.env.NODE_ENV;

// Export environment configurations
module.exports = config[environment] || config['development'];
