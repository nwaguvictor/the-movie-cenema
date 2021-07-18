'use strict';

const AppError = require('../helpers/AppError');
const { UserModel } = require('../models');

class UserService {
    static getUser = async (filter) => {
        const user = await UserModel.findOne(filter);
        return user;
    };
}

module.exports = UserService;
