const Router = require('express')
const router = new Router()
const controller = require('../controller/auth.controller')
const { check } = require('express-validator')

router.post(
  '/registration',
  [
    check('name', 'Имя пользователя должно быть больше 5 символов').isLength({
      min: 5,
    }),
    check('password', 'Пароль должен быть больше 8 символов').isLength({
      min: 8,
    }),
    check('roles', 'Либо 0, либо 1').isLength({
      min: 1,
    }),
  ],
  controller.registration,
)
router.post('/login', controller.login)
router.post('/provlogin', controller.provlogin)

module.exports = router
