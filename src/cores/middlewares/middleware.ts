import bodyParser from 'body-parser'
import compression from 'compression'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import expressStatusMonitor from 'express-status-monitor'
import lusca from 'lusca'
import morgan from 'morgan'
import { passport } from '../config/passport'
import 'reflect-metadata'
import { logger } from '../helpers/logger'

export const middleware = (app: express.Application) => {
  app.use(compression())
  app.use(cors())

  app.use(cookieParser())
  app.use(expressStatusMonitor())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(
    morgan('tiny', {
      stream: {
        write: message => {
          logger.info(message)
        },
      },
    }),
  )
  app.use((req, res, next) => {
    if (req.path.split('/')[1] === 'api' || req.is('multipart/form-data')) {
      next()
    } else {
      // lusca.csrf()(req, res, next)
      next()
    }
  })
  app.use(lusca.xframe('SAMEORIGIN'))
  app.use(lusca.xssProtection(true))
  app.disable('x-powered-by')
  const MySQLStore = require('connect-mysql')(session)
  const options = {
    config: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  }
  app.use(
    session({
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3,
      },
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      store: new MySQLStore(options),
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())
  app.use(flash())
  app.post(
    '/login',
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
      successRedirect: '/',
    }),
  )
}
