const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const session = require('express-session')
// const Order = require('./src/models/Order')

// loading the config files
dotenv.config({ path: './config/config.env' })
const mongoUrl = process.env.DB_URL

const PORT = 3000


const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

const start = async () => {
  const app = express()

  const mongooseDb = await mongoose.connect(mongoUrl)

  const admin = new AdminJS({
    resources: []
  })

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize()
  } else admin.watch()

  const sessionStore = MongoStore.create({
    mongoUrl,
    client: mongoose.connection.getClient(),
    collectionName: 'sessions',
  })

  app.use(
    session({
      secret: 'sessionsecret',
      resave: true,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
      store: sessionStore,
    })
  )

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'development',
        secure: process.env.NODE_ENV === 'development',
      },
      name: 'adminjs',
    }
  )
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()