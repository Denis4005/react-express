const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const authMiddlware = require('../middleware/auth.middlware')
const roleMiddlware = require('../middleware/role.middlware')

router.get('/users', authMiddlware, userController.getUser)
router.get('/user/:id', roleMiddlware('1'), userController.getOneUser)
router.put('/user', authMiddlware, userController.updateNameUser)
router.patch('/user', authMiddlware, userController.updatePasswordUser)
router.delete('/user/:id', roleMiddlware('1'), userController.deleteUser)

module.exports = router
