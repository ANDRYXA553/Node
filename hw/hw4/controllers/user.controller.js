const { constants } = require('../constants');
const { User } = require('../dataBase');
const { statusCode } = require('../constants');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(statusCode.SUCCESS)
                .json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            await User.create(req.body);
            res.status(statusCode.CREATED)
                .json(constants.USER_CREATED);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;
            res.status(statusCode.SUCCESS)
                .json(user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { id } = req.user;
            await User.findOneAndDelete({ _id: id });
            res.status(statusCode.DELETED)
                .json(constants.USER_DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const userToUpdate = req.body;
            const { id } = req.user;
            await User.findOneAndUpdate({ _id: id }, userToUpdate);
            res.status(statusCode.UPDATE)
                .json(constants.USER_UPDATED);
        } catch (e) {
            next(e);
        }
    }

};
