const db = require('../connect')
const jwt = require('jsonwebtoken')
const { secret } = require('../secret.key')

class PostController {
  async createPost(req, res) {
    try {
      const { title, content } = req.body

      const token = req.headers.authorization.split(' ')[1]
      const { id: idUser } = jwt.verify(token, secret)

      const newPost = await db.Posts.create({
        title,
        content,
        user_id: idUser,
      })

      res.json(newPost)
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'create error' })
    }
  }

  async getPostUser(req, res) {
    try {
      const id = req.query.user_id
      const post = await db.Posts.findOne({ where: { user_id: id } })
      if (!post) {
        return res.status(400).json(`Пользователь ${id} не зарегистрирован`)
      }
      res.json(post)
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'error' })
    }
  }

  async getPostAll(req, res) {
    try {
      const posts = await db.Posts.findAll()
      res.json(posts)
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'error' })
    }
  }

  async getOnePost(req, res) {
    try {
      const id = req.params.id
      const post = await db.Posts.findOne({ where: { id: id } })
      if (!post) {
        return res.status(400).json(`Поста ${id} не существует`)
      }
      res.json(post)
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'error' })
    }
  }

  async updatePost(req, res) {
    try {
      const { id, title, content } = req.body
      const myFile = req.files.undefined
      const fileName = myFile.name
      const token = req.headers.authorization.split(' ')[1]
      const { roles: userRoles, id: idUser } = jwt.verify(token, secret)
      const post = await db.Posts.findOne({ where: { id: id } })

      if (!post) {
        return res.json('Такого поста нет')
      }

      if (post.user_id !== idUser && userRoles !== '1') {
        return res.json('Нет доступа')
      }
      myFile.mv(`${__dirname}/../public/${fileName}`, err => {
        if (err) {
          console.log(err)
          return res.status(500).send({ msg: 'Error occurred' })
        }
      })
      const uppPost = await db.Posts.update(
        { title, content, user_id: post.user_id },
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

  async deletePost(req, res) {
    try {
      const id = req.params.id
      const token = req.headers.authorization.split(' ')[1]
      const { roles: userRoles, id: idUser } = jwt.verify(token, secret)
      const post = await db.Posts.findOne({ where: { id: id } })
      if (!post) {
        return res.status(400).json(`Поста ${id} не существует`)
      }

      if (post.user_id !== idUser && userRoles !== '1') {
        return res.status(400).json('Нет доступа')
      }

      const deletepost = await db.Posts.destroy({ where: { id: id } })

      if (!deletepost) {
        return res.status(400).json(`Ошибка Удаления`)
      }

      res.json('Успех')
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'error' })
    }
  }

  async deletePostsUser(req, res) {
    try {
      const id = req.query.user_id
      const token = req.headers.authorization.split(' ')[1]
      const { roles: userRoles, id: idUser } = jwt.verify(token, secret)
      const post = await db.Posts.findOne({ where: { user_id: id } })

      if (!post) {
        return res.status(400).json(`Поста ${id} не существует`)
      }
      console.log(post.user_id, idUser)
      if (post.user_id !== idUser && userRoles !== '1') {
        return res.json('Нет доступа')
      }

      const deletepost = await db.Posts.destroy({ where: { user_id: id } })

      if (!deletepost) {
        return res.status(400).json(`Ошибка Удаления`)
      }

      res.json('Успех')
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'error' })
    }
  }
}
module.exports = new PostController()
