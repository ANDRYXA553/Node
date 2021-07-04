const router = require('express').Router();

const { authControllers } = require('../controllers');
const { authMiddlewares } = require('../middlewares');

router.post('/', authMiddlewares.loginAndPasswordChecker, authControllers.userSignUp);
