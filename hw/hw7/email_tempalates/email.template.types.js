const { emailTemplatesTypesEnum } = require('../constants/email.template.type.unum');

module.exports = {
    [emailTemplatesTypesEnum.CREATED]: {
        templateName: 'userCreate',
        subject: 'U have created a new account'
    },
    [emailTemplatesTypesEnum.DELETED]: {
        templateName: 'userDelete',
        subject: 'Ur account deleted'
    },
    [emailTemplatesTypesEnum.UPDATED]: {
        templateName: 'userUpdate',
        subject: 'Ur account updated'
    }
};
