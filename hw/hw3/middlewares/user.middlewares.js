const userService = require('../services/user.service');
const { dbPath } = require('../constants/db.constants');

module.exports = {
    checkIsUserPresent: async (req, res, next) => {
        const { userId } = req.params;
        const userById = await userService.findUserById(userId);
        console.log(dbPath);
        if (!userById) {
            res.json('user not found');
            throw new Error('user not found');
        }
        req.user = userById;
        next();
    }
};
