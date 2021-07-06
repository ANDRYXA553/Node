const { O_Auth } = require('../dataBase');
const { statusCode, constants } = require('../constants');
const { errorMessages, ErrorHandler } = require('../errors');
const { passwordHasher } = require('../helpers');
const { auth_service } = require('../services');

module.exports = {
    userSignUp: async (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCode.WRONG_REQUEST,
                    errorMessages.WRONG_EMAIL_OR_PASSWORD.message,
                    errorMessages.WRONG_EMAIL_OR_PASSWORD.customCode);
            }

            const { password: hashPassword, _id } = user;
            const { password } = req.body;

            await passwordHasher.compare(hashPassword, password);

            const tokenPair = auth_service.generateTokenPair();

            await O_Auth.create({ ...tokenPair, user: _id });

            res.status(statusCode.SUCCESS).json({ ...tokenPair, user });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);

            await O_Auth.remove({ accessToken });

            res.status(statusCode.SUCCESS).json(constants.SUCCESS_LOGOUT);
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { _id } = req.user;
            const tokenPair = auth_service.generateTokenPair();

            await O_Auth.create({ ...tokenPair, user: _id });

            res.status(statusCode.SUCCESS).json({ ...tokenPair });
        } catch
        (e) {
            next(e);
        }
    }

};
