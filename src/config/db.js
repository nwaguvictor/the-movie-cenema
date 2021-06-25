'use strict';

const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../helpers/logger');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
};

// Disable autoIndex on production
if (process.env.NODE_ENV === 'production') options.autoIndex = false;

module.exports = async function () {
    mongoose
        .connect(config.DB_URI, options)
        .then(() => logger.info(':: Database Connected Successfully'))
        .catch((error) => {
            logger.error(`:: Error: ${error.message}`);
            // process.exit();
        });

    mongoose.connection.on('disconnected', () => logger.warn(':: Database disconnected from MongoDB'));
};
