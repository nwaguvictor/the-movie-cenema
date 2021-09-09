'use strict';

const { UserModel } = require('../models');

class UserService {
    static getUser = async (filter, options) => {
        const user = await UserModel.findOne(filter, options).select('+password -__v');
        return user;
    };
    static createUser = async ({ name, username, email, password, phone }) => {
        const user = await UserModel.create({ name, username, email, password, phone });
        return user;
    };
    static updateUser = async ({ email, userData }) => {
        const user = await UserModel.findOneAndUpdate({ email }, userData, {
            runValidation: true,
            new: true,
        });
        return user;
    };
}

module.exports = UserService;
