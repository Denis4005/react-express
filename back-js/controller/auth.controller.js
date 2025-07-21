const { validationResult } = require('express-validator')
const db = require('../connect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('../secret.key')

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  }
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Ошибка при ргистрации', errors })
      }
      {
        const { name, password, roles } = req.body
        const pretender = await db.Users.findOne({ where: { name: name } })
        if (pretender) {
          return res.status(400).json('Пользователь уже существует')
        }
        const hashPswd = bcrypt.hashSync(password, 7)
        await db.Users.create({
          name: name,
          password: hashPswd,
          roles: roles,
        })
        res.json('Пользователь создан')
      }
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'registration error' })
    }
  }

  async login(req, res) {
    try {
      const { name, password } = req.body
      const pretender = await db.Users.findOne({ where: { name: name } })

      if (!pretender) {
        return res.status(400).json(`Пользователь ${name} не зарегистрирован`)
      }
      const validPswd = bcrypt.compareSync(password, pretender.password)
      if (!validPswd) {
        return res.status(400).json({ message: 'Неверный пароль' })
      }

      const token = generateAccessToken(pretender.id, pretender.roles)
      return res.json({ token: token })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'login error' })
    }
  }
  async provlogin(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({ message: 'Пользователь не авторизован' })
      }
      const decodeToken = jwt.verify(token, secret)
      const user = await db.Users.findOne({ where: { id: decodeToken.id } })
      const newtoken = generateAccessToken(decodeToken.id, decodeToken.roles)
      return res.json({ name: user.name, token: newtoken })
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'login error' })
    }
  }
}
module.exports = new AuthController()
