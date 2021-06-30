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
            // console.log(e.message);
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await User.create(req.body);
            res.status(statusCode.CREATED)
                .json(user);
        } catch (e) {
            console.log('-=-=-=-=-,', e);
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;
            res.status(statusCode.SUCCESS)
                .json(user);
        } catch (e) {
            console.log('================', e.message, e.status);
            // console.log(e.message);
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;
            await User.findByIdAndDelete({ _id: userId });
            res.status(statusCode.DELETED)
                .json(constants.USER_DELETED);
        } catch (e) {
            // console.log(e.message);
            next(e);
        }
    },

    updateUserById: async (err, req, res, next) => {
        try {
            const userToUpdate = req.body;
            const { user } = req;
            console.log('uuuuuuu', user);
            await User.findOneAndUpdate({ _id: user.id }, userToUpdate);
            res.status(statusCode.UPDATE)
                .json(constants.USER_UPDATED);
        } catch (e) {
            // console.log(e.message);
            next(e);
        }
    }

};
