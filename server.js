require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {
  checkCsrfError,
  csrfMiddleware,
  middlewareGlobal
} = require('./src/middlewares/middleware')

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.emit('pronto')
  })
  .catch(err => {
    console.log('erro aqui', err)
  })

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const path = require('path')
const routes = require('./routes')
const helmet = require('helmet')
const csrf = require('csurf')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/js', express.static(path.join(__dirname, 'dist', 'js')))
app.use(express.static(path.resolve(__dirname, 'dist', 'js')))

const sessionOpitions = session({
  secret: 'ntfgbhnjgbnbnedgbhaeugbhnhng',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})

app.use(sessionOpitions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csrf())

app.use(checkCsrfError)
app.use(csrfMiddleware)
app.use(middlewareGlobal)

app.use(routes)

app.on('pronto', () => {
  app.listen(3012, () => {})
})
