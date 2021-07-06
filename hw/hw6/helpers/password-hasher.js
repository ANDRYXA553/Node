const bcrypt = require('bcrypt');

const { ErrorHandler } = require('../errors');
const { errorMessages } = require('../errors');
const { statusCode } = require('../constants');

module.exports = {
    compare: async (hashedPassword, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordMatched) {
            throw new ErrorHandler(statusCode.WRONG_REQUEST,
                errorMessages.WRONG_EMAIL_OR_PASSWORD.message,
                errorMessages.WRONG_EMAIL_OR_PASSWORD.customCode);
        }
    },

    hash: (password) => bcrypt.hash(password, 10)
};
