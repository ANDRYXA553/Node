const router = require('express').Router();

const { controllers } = require('../controllers');
const { middlewares } = require('../middlewares');

router.get('/', controllers.getAllUsers);

router.get('/:userId', middlewares.checkIsUserPresent, controllers.getUserById);

router.post('/', middlewares.checkIsUserNameAvailable, controllers.createUser);

router.delete('/:userId', middlewares.checkIsUserPresent, controllers.deleteUserById);

router.put('/:userId', middlewares.checkIsUserPresent, controllers.updateUserById);

module.exports = router;
