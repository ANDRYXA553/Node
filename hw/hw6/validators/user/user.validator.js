const Joi = require('joi');

const { regexp } = require('../../constants');

module.exports = {
    createUser: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().regex(regexp.EMAIL_REGEXP)
            .required(),
        password: Joi.string().min(8).max(256)
            .required(),
        age: Joi.number().min(1).max(120),
    }),

    updateUser: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().regex(regexp.EMAIL_REGEXP),
        password: Joi.string().min(8).max(256).required(),
        age: Joi.number().min(1).max(120),
    })
};
