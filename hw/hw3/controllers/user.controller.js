const { services } = require('../services');
const { constants } = require('../constants');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await services.findAll();
        res.json(users);
    },
    createUser: async (req, res) => {
        const user = await req.body;
        await services.insertUser(user);
        res.json(constants.USER_CREATED);
    },
    getUserById: (req, res) => {
        const { user } = req;
        res.json(user);
    },
    deleteUserById: async (req, res) => {
        const { userId } = req.user;
        await services.deleteUserById(userId);
        res.json(constants.USER_DELETED);
    },
    updateUserById: async (req, res) => {
        const { user } = req;
        const userForUpdate = req.body;
        await services.updateUserById(user, userForUpdate);
        res.json(constants.USER_UPDATED);
    }

};
