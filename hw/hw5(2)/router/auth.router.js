const router = require('express').Router();

const { authControllers } = require('../controllers');
const { authMiddlewares } = require('../middlewares');

router.post('/', authMiddlewares.authDataValidation, authMiddlewares.loginAndPasswordChecker, authControllers.userSignUp);

module.exports = router;
