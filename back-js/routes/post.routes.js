const Router = require('express')
const router = new Router()
const postController = require('../controller/post.controller')
const authMiddlware = require('../middleware/auth.middlware')

router.post('/post', authMiddlware, postController.createPost)
router.get('/post', authMiddlware, postController.getPostUser)
router.get('/posts', authMiddlware, postController.getPostAll)
router.get('/post/:id', authMiddlware, postController.getOnePost)
router.put('/post', authMiddlware, postController.updatePost)
router.delete('/post/:id', authMiddlware, postController.deletePost)
router.delete('/post', authMiddlware, postController.deletePostsUser)

module.exports = router
