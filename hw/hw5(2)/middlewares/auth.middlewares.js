const { passwordHasher } = require('../helpers');
const { statusCode } = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');
const { User } = require('../dataBase');

module.exports = {
    loginAndPasswordChecker: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                throw new ErrorHandler(statusCode.WRONG_REQUEST,
                    errorMessages.WRONG_EMAIL_OR_PASSWORD.message,
                    errorMessages.WRONG_EMAIL_OR_PASSWORD.customCode);
            }

            await passwordHasher.compare(user.password, password);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
