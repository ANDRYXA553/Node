const router = require('express').Router();

const { userControllers } = require('../controllers');
const { userMiddlewares } = require('../middlewares');

router.get('/', userControllers.getAllUsers);

router.get('/:userId', userMiddlewares.checkIsUserPresent, userControllers.getUserById);

router.post('/', userMiddlewares.checkIsUserValidOnCreate, userMiddlewares.checkIsUserNameAvailable, userControllers.createUser);

router.delete('/:userId', userMiddlewares.checkIsUserPresent, userControllers.deleteUserById);

router.put('/:userId',
    userMiddlewares.checkIsUserValidOnUpdate,
    userMiddlewares.checkIsUserPresent,
    userControllers.updateUserById);

module.exports = router;
