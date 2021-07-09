const nodeMailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { keys: { SYSTEM_EMAIL, SYSTEM_EMAIL_PASSWORD }, statusCode } = require('../constants');
const { emailTemplatesTypes } = require('../email_tempalates');
const { errorMessages, ErrorHandler } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email_tempalates')
    }
});

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: SYSTEM_EMAIL,
        pass: SYSTEM_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const template = emailTemplatesTypes[emailAction];

    if (!template) {
        throw new ErrorHandler(statusCode.WRONG_REQUEST,
            errorMessages.WRONG_TEMPLATE_TYPE.message,
            errorMessages.WRONG_TEMPLATE_TYPE.customCode);
    }

    const html = await templateParser.render(template.templateName, context);

    await transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: template.subject,
        html
    });
};

module.exports = {
    sendMail
};
