const router = require('express').Router();

const { userControllers } = require('../controllers');
const { userMiddlewares, authMiddlewares } = require('../middlewares');

router.get('/', userControllers.getAllUsers);

router.get('/:userId', userMiddlewares.checkIsUserPresent, userControllers.getUserById);

router.post('/', userMiddlewares.checkIsUserValidOnCreate, userMiddlewares.checkIsUserNameAvailable, userControllers.createUser);

router.delete('/:userId',
    authMiddlewares.checkAccessToken,
    userMiddlewares.checkIsUserPresent,
    userControllers.deleteUserById);

router.put('/:userId',
    authMiddlewares.checkAccessToken,
    userMiddlewares.checkIsUserValidOnUpdate,
    userMiddlewares.checkIsUserPresent,
    userControllers.updateUserById);

module.exports = router;
