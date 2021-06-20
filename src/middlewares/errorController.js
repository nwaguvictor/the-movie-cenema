'use strict';

module.exports = (err, req, res, next) => {
    return res.status(err.code).json({ status: err.status, message: err.message });
};
