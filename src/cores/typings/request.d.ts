import { Request } from 'express'
import { User } from '../models/user.model'

export interface RSISARequest extends Request {
  user: User
  userRoles: object
}
