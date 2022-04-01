import { Router } from 'express'

export const group = (cb: any) => {
  const route = Router()
  cb(route)
  return route
}