const { constants, statusCode, emailTemplateTypesEnum: { emailTemplatesTypesEnum } } = require('../constants');

const { User } = require('../dataBase');
const { passwordHasher } = require('../helpers');
const { mail_service } = require('../services');

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
            const { password, email, name } = req.body;

            const newPassword = await passwordHasher.hash(password);

            await User.create({ ...req.body, password: newPassword });

            await mail_service.sendMail(email, emailTemplatesTypesEnum.CREATED, { userName: name });

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
            const { id, email, name } = req.user;

            await User.findOneAndDelete({ _id: id });

            await mail_service.sendMail(email, emailTemplatesTypesEnum.DELETED, { userName: name });

            res.status(statusCode.DELETED)
                .json(constants.USER_DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const userToUpdate = req.body;
            const { id, email, name } = req.user;

            await User.findOneAndUpdate({ _id: id }, userToUpdate);

            await mail_service.sendMail(email, emailTemplatesTypesEnum.UPDATED, { userName: name });

            res.status(statusCode.UPDATE)
                .json(constants.USER_UPDATED);
        } catch (e) {
            next(e);
        }
    }

};
