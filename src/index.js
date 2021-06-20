const express = require('express');
const http = require('http');
const morgan = require('morgan');
const config = require('./config');
const initDB = require('./config/db');
const { movieRouter } = require('./routes');

const app = express();

// Middlewares
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use('/api/v1/movies', movieRouter);

const server = http.createServer(app);
server.listen(config.PORT, () => {
    console.log(':: Application started');
    initDB();
});
