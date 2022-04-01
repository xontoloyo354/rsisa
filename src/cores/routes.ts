import express from 'express'
import { apiRouter } from '../routers/api'
import { webRouter } from '../routers/web'

const routes = (app: express.Application) => {
  app.use(webRouter)
  app.use(apiRouter)
}

export default routes
