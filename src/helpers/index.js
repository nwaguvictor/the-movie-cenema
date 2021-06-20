'use strict';

// A wrapper function for catching async functions
// and propagate the error down to error handler middleware
exports.catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
