const db = require('../connect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('../secret.key')

class UserController {
  async getUser(req, res) {
    try {
      const users = await db.Users.findAll({
        attributes: { exclude: ['password'] },
      })
      res.json(users)
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'error' })
    }
  }
  async getOneUser(req, res) {
    try {
      const id = req.params.id
      const user = await db.Users.findOne({ where: { id: id } })
      if (!user) {
        return res.status(400).json(`Пользователь ${user} не зарегистрирован`)
      }
      res.json(user)
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'error' })
    }
  }
  async updateNameUser(req, res) {
    try {
      const { id, name } = req.body
      const token = req.headers.authorization.split(' ')[1]
      const { roles: userRoles, id: idUser } = jwt.verify(token, secret)
      const person = await db.Users.findOne({ where: { id: id } })

      if (!person) {
        return res.json('Пользователь не найден')
      }

      if (person.id !== idUser && userRoles !== '1') {
        return res.json('Нет доступа')
      }

      const uppPost = await db.Users.update(
        { name: name },
        {
          where: {
            id: id,
          },
        },
      )

      if (!uppPost[0]) {
        return res.json('update error')
      }

      res.json('Успех')
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'update error' })
    }
  }
  async updatePasswordUser(req, res) {
    try {
      const { id, password } = req.body
      const token = req.headers.authorization.split(' ')[1]
      const { roles: userRoles, id: idUser } = jwt.verify(token, secret)
      const person = await db.Users.findOne({ where: { id: id } })

      if (!person) {
        return res.json('Пользователь не найден')
      }

      if (person.id !== idUser && userRoles !== '1') {
        return res.json('Нет доступа')
      }

      const hashPswd = bcrypt.hashSync(password, 7)

      const uppPost = await db.Users.update(
        { password: hashPswd },
        {
          where: {
            id: id,
          },
        },
      )

      if (!uppPost[0]) {
        return res.json('update error')
      }

      res.json('Успех')
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'update error' })
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id
      const token = req.headers.authorization.split(' ')[1]
      const { roles: userRoles, id: idUser } = jwt.verify(token, secret)
      const user = await db.Users.findOne({ where: { id: id } })

      if (!user) {
        return res.status(400).json('Пользоватень не найден')
      }

      if (user.id !== idUser && userRoles !== '1') {
        return res.json('Нет доступа')
      }

      const deleteuser = await db.Users.destroy({ where: { id: id } })

      if (!deleteuser) {
        return res.status(400).json(`Ошибка Удаления`)
      }

      res.json('Успех')
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'error' })
    }
  }
}
module.exports = new UserController()
