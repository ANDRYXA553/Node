const { passwordHasher } = require('../helpers');
const { statusCode } = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');
const { User } = require('../dataBase');
const { authValidator } = require('../validators');

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
    },

    authDataValidation: (req, res, next) => {
        try {
            const { error } = authValidator.onLoginValidation.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCode.WRONG_REQUEST,
                    error.details[0].message,
                    errorMessages.IN_VALID_DATA.customCode);
            }

            next();
        } catch (error) {
            next(error);
        }
    }
};
