'use strict';

require('dotenv').config();

const config = {
    production: {
        DB_URI: process.env.MONGO_DB_URI,
        PORT: process.env.PORT,
    },
    development: {
        DB_URI: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/movie_cenema_db',
        PORT: process.env.PORT || 5000,
    },
};

const environment = process.env.NODE_ENV;

// Export environment configurations
module.exports = config[environment] || config['development'];
