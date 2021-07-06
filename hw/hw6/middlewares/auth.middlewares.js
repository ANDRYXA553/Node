const { statusCode, constants } = require('../constants');
const { User, O_Auth } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../errors');
const { passwordHasher } = require('../helpers');
const { authValidator } = require('../validators');
const { auth_service } = require('../services');

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
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);

            if (!accessToken) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED,
                    errorMessages.NO_TOKEN.message,
                    errorMessages.NO_TOKEN.customCode);
            }

            await auth_service.verifyToken(accessToken);

            const tokenFromBase = await O_Auth.findOne({ accessToken });

            if (!tokenFromBase) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED,
                    errorMessages.WRONG_TOKEN.message,
                    errorMessages.WRONG_TOKEN.customCode);
            }

            req.user = tokenFromBase.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get(constants.AUTHORIZATION);

            if (!refreshToken) {
                throw new ErrorHandler(statusCode.UNAUTHORIZED,
                    errorMessages.NO_TOKEN.message,
                    errorMessages.NO_TOKEN.customCode);
            }

            await auth_service.verifyToken(refreshToken, constants.TOKEN_TYPES.REFRESH);

            const { user } = await O_Auth.findOne({ refreshToken });

            await O_Auth.deleteOne({ refreshToken });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
