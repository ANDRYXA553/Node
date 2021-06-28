const { services } = require('../services');
const { errConstants } = require('../constants');

try {
    module.exports = {
        checkIsUserPresent: async (req, res, next) => {
            const { userId } = req.params;
            const userById = await services.findUserById(userId);
            if (!userById) {
                res.json(errConstants.USER_NOT_FOUND);
                throw new Error(errConstants.USER_NOT_FOUND);
            }
            req.user = userById;
            next();
        },

        checkIsUserNameAvailable: async (req, res, next) => {
            const { name } = req.body;
            const users = await services.findAll();
            const isNameAvailable = users.find((user) => user.name === name);
            if (isNameAvailable) {
                res.json(errConstants.USER_NAME_TAKEN);
                throw new Error(errConstants.USER_NAME_TAKEN);
            }
            next();
        }
    };
} catch (e) {
    console.log(e);
}
