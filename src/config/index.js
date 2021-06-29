'use strict';

require('dotenv').config();

const { MONGO_DB_URI, PORT, JWT_KEY, JWT_EXPIRES } = process.env;

const config = {
    production: {
        DB_URI: MONGO_DB_URI,
        PORT: PORT,
        JWT_KEY: JWT_KEY,
        JWT_EXPIRES: JWT_EXPIRES,
    },
    development: {
        DB_URI: MONGO_DB_URI || 'mongodb://localhost:27017/movie_cenema_db',
        PORT: PORT || 5000,
        JWT_KEY: JWT_KEY,
        JWT_EXPIRES: JWT_EXPIRES,
    },
    test: {
        DB_URI: MONGO_DB_URI || 'mongodb://localhost:27017/movie_cenema_test_db',
        PORT: PORT || 2021,
        JWT_KEY: JWT_KEY,
        JWT_EXPIRES: JWT_EXPIRES,
    },
};

const environment = process.env.NODE_ENV;

// Export environment configurations
module.exports = config[environment] || config['development'];
