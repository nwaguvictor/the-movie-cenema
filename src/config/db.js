'use strict';

const mongoose = require('mongoose');
const config = require('../config');

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

module.exports = function () {
    mongoose
        .connect(config.DB_URI, options)
        .then(() => console.log(':: Database Connected Successfully'))
        .catch((error) => {
            console.error(`:: Error: ${error.message}`);
            process.exit();
        });
};
