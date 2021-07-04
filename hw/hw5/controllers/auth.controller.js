const { statusCode } = require('../constants');

module.exports = {
    userSignUp: (req, res, next) => {
        try {
            const { user } = req;
            res.status(statusCode.SUCCESS).json(user);
        } catch (e) {
            next(e);
        }
    }
};
