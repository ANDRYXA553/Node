const { User } = require('../dataBase');
const { ErrorHandler, errorMessages } = require('../errors');
const { statusCode } = require('../constants');

module.exports = {
    checkIsUserPresent: async (req, res, next) => {
        try {
            const { userId } = req.params;
            console.log('userrrr');
            const userById = await User.findById(userId);
            console.log('userrrr', userById);
            if (!userById) {
                throw new ErrorHandler(statusCode.WRONG_REQUEST,
                    errorMessages.RECORD_NOT_FOUND.message,
                    errorMessages.RECORD_NOT_FOUND.code);
            }
            req.user = userById;
            next();
        } catch (e) {
            console.log('--------------', e.code);
            // res.status(statusCode.WRONG_REQUE nST).json(e.message);
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
                    errorMessages.NAME_IS_ALREADY_TAKEN.code);
            }
            next();
        } catch (e) {
            console.log('--------------', e.code);
            // console.log(e)
            // res.status(statusCode.WRONG_REQUEST)
            //     .json(e);
            next(e);
        }
    }
};
