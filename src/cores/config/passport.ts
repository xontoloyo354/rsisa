import bcrypt from 'bcrypt'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { logger } from '../helpers/logger'
import { ErrorThrower } from '../helpers/errorThrower'
import { ResponseType } from '../helpers/responseType'
import { User } from '../models/user.model'
import { RSISARequest } from '../typings/request'

passport.serializeUser((user: User, done: any) => {
  done(null, user.id)
})

passport.deserializeUser((id: any, done: any) => {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(error => done(error))
})

/**
 * Sign in using phone and password
 */
 passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true,
      passwordField: 'password',
      session: true,
      usernameField: 'username',
    },
    async (req: any, username: string, password: string, done: any) => {
      try {
        logger.debug('Passport Local Strategy', username)
        console.log('local', username, password)
        const user = await User.findOne({ where: { username } })
        if (!user) {
          throw Error('No.HP tidak ditemukan')
        }
        logger.debug('Passport Local Strategy', user.fullname)

        const result = bcrypt.compareSync(password, user.password)
        if (!result) {
          throw Error('No.HP atau password salah')
        }

        return done(null, user)
      } catch (error) {
        logger.debug('Passport Local Strategy', error)
        return done(null, false, { message: error.message })
      }
    },
  ),
)

/**
 * Login Required middleware.
 */
const apiAuthentication = (req: RSISARequest, res: Response, next: NextFunction) => {
  if (!req.headers.authorization && !req.headers.auth) {
    throw new ErrorThrower({ message: 'NO_TOKEN', responseType: ResponseType.UNAUTHORIZED })
    // res.redirect('back')
  }
  let token = req.headers.authorization || req.headers.auth.toString()
  token = token.slice(7, token.length)
  jwt.verify(token, process.env.SESSION_SECRET, (error: any, decoded: any) => {
    if (error || decoded === null) {
      throw new ErrorThrower({ message: 'Token Not Valid', responseType: ResponseType.FORBIDDEN })
    } else {
      req.user = decoded
      return next()
    }
  })
}

export {
  passport,
  apiAuthentication
}
