const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { keys, constants: { TOKEN_TYPES } } = require('../constants');

const verifyPromise = promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const accessToken = jwt.sign({}, keys.ACCESS_TOKEN, { expiresIn: '7m' });
        const refreshToken = jwt.sign({}, keys.REFRESH_TOKEN, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: async (token, tokenType = TOKEN_TYPES.ACCESS) => {
        const key = tokenType === TOKEN_TYPES.ACCESS ? keys.ACCESS_TOKEN : keys.REFRESH_TOKEN;

        await verifyPromise(token, key);
    }
};
