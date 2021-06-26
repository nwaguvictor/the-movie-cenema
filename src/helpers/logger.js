'use strict';

const { createLogger, format, transports } = require('winston');
const config = require('../config');
require('winston-mongodb');

const logger = createLogger({
    level: 'info',
    format: format.combine(format.colorize(), format.json()),
    transports: [
        new transports.File({ filename: 'errors.log', level: 'error' }),
        new transports.MongoDB({
            db: config.DB_URI,
            options: { useUnifiedTopology: true },
            collection: 'logs',
            level: 'error',
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format: format.simple() }));
}

module.exports = logger;
