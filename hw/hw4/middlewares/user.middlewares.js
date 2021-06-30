const { User } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../errors');
const { statusCode } = require('../constants');

module.exports = {
    checkIsUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const userById = await User.findById(userId);
            if (!userById) {
                throw new ErrorHandler(statusCode.WRONG_REQUEST,
                    errorMessages.RECORD_NOT_FOUND.message,
                    errorMessages.RECORD_NOT_FOUND.customCode);
            }
            req.user = userById;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsUserNameAvailable: async (req, res, next) => {
        try {
            const { name } = req.body;
            const isNameAvailable = await User.findOne({ name });
            if (isNameAvailable) {
                throw new ErrorHandler(statusCode.WRONG_REQUEST,
                    errorMessages.NAME_IS_ALREADY_TAKEN.message,
                    errorMessages.NAME_IS_ALREADY_TAKEN.customCode);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
