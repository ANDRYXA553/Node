const router = require('express').Router();

const { authControllers } = require('../controllers');
const { authMiddlewares } = require('../middlewares');

router.post('/login', authMiddlewares.authDataValidation,
    authMiddlewares.loginAndPasswordChecker,
    authControllers.userSignUp);

router.post('/logout', authMiddlewares.checkAccessToken,
    authControllers.logout);

router.post('/refresh', authMiddlewares.checkRefreshToken, authControllers.refresh);
module.exports = router;
