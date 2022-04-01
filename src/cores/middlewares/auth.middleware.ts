import { NextFunction, Response } from 'express'
import { apiAuthentication } from '../config/passport'
import { RSISARequest } from '../typings/request'

const isAuthenticated = (req: RSISARequest, res: Response, next: NextFunction) => {
  if (process.env.AUTH_DISABLED === 'yes') {
    return next()
  }
  if (res.locals.api === true) {
    return apiAuthentication(req, res, next)
  }
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

export default isAuthenticated