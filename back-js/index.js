const express = require('express')
const cors = require('cors')

const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const authRoutes = require('./routes/auth.routes')

const PORT = process.env.PORT || 4000
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!!!!!')
})
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}
app.use('/public', express.static('public'))
app.use(cors(corsOptions))
app.use(express.json())

app.use('/api', userRoutes)
app.use('/api', postRoutes)
app.use('/auth', authRoutes)

app.get('/health', (req, res) => res.sendStatus(200))
const start = () => {
  try {
    app.listen(PORT, () =>
      console.log(
        `App listening at http://localhost:${PORT}`,
        process.env.DATABASE_URL,
      ),
    )
  } catch (err) {
    console.log(err)
  }
}
start()
