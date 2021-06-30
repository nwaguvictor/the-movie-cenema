const { catchAsync } = require('../helpers');
const UserService = require('../services/UserService');

class UserController {
    static signup = catchAsync(async (req, res, next) => {
        const token = await UserService.signup(req.body);
        res.status(200).json({ status: 'success', token });
    });
    static login = catchAsync(async (req, res, next) => {
        const token = await UserService.login(req.body);
        res.status(200).json({ status: 'success', token });
    });
    static requestPasswordReset = catchAsync(async (req, res, next) => {
        const token = await UserService.login(req.body);
        res.status(200).json({ status: 'success', token });
    });
    static passwordReset = catchAsync(async (req, res, next) => {
        const token = await UserService.login(req.body);
        res.status(200).json({ status: 'success', token });
    });
}

module.exports = UserController;
