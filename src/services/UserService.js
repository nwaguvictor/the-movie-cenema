const AppError = require('../helpers/AppError');
const UserModel = require('../models/UserModel');

class UserService {
    static signup = async ({ name, username, email, password, phone }) => {
        let user = await UserModel.findOne({ email });
        if (user) throw new AppError('email address already registered', 400);
        user = new UserModel({ name, username, email, password, phone });
        const token = await user.signToken();

        // Send Registration Email
        await user.save();
        return token;
    };
    static login = async ({ email, password }) => {
        if (!email || !password) throw new AppError('email address and password field is required', 400);
        let user = await UserModel.findOne({ email }).select('+password');

        if (!user) throw new AppError('email address or password is incorrect', 400);
        if (!(await user.confirmPassword(password))) {
            throw new AppError('email address or password is incorrect', 400);
        }

        const token = await user.signToken();
        return token;
    };
}

module.exports = UserService;
