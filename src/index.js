'use strict';

const express = require('express');
const http = require('http');
const config = require('./config');
const logger = require('./helpers/logger');
const initDB = require('./config/db');
const { userRouter, movieRouter } = require('./routes');
const AppError = require('./helpers/AppError');
const middlewares = require('./middlewares');
const errorController = require('./middlewares/errorController');

// Uncaught Exception
process.on('uncaughtException', (error) => {
    logger.error(`💥:: Error`, error);
    logger.on('end', () => {
        process.exit(1);
    });
});

const app = express();

// Middlewares
middlewares(app);

// Routes
app.use('/', userRouter);
app.use('/api/v1/movies', movieRouter);

// Routes not defined
app.all('*', (req, res, next) => {
    return next(new AppError(`Endpoint: ${req.originalUrl} not found`, 404));
});

// Application Error Handler
app.use(errorController);

// Start Server
const server = http.createServer(app);
server.listen(config.PORT, () => {
    initDB();
    if (process.env.NODE_ENV !== 'production') {
        logger.info(
            `:: Application started on Port: ${config.PORT} Env: ${process.env.NODE_ENV}`
        );
    }
});

// For any unhandled promise
process.on('unhandledRejection', (error) => {
    logger.error(`💥:: Server closed... and process stops`, error);
    logger.on('end', () => {
        server.close();
        process.exit(1);
    });
});

module.exports = server;
