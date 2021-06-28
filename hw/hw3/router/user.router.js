const router = require('express').Router()
const userController = require('../controllers/user.controller')
const userMiddleWare = require('../middlewares/user.middlewares')

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleWare.checkIsUserPresent, userController.getUserById);

router.post('/', userController.createUser);

router.delete('/:userId', userMiddleWare.checkIsUserPresent, userController.deleteUserById);


module.exports = router;
