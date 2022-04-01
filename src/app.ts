import chalk from 'chalk'
import dotenv, { config } from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import moment from 'moment'
import path, { resolve } from 'path'
import 'reflect-metadata'
import { sequelize } from './cores/config/database'
import { ResponseHandler } from './cores/helpers/responseHandler'
import { middleware } from './cores/middlewares/middleware'
import { models } from './cores/models'
import routes from './cores/routes'

config({ path: resolve(__dirname, '../../.env') })

dotenv.config()
moment.locale('id')

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.settings()
    middleware(this.app)
    routes(this.app)
    this.handleError()
  }

  public async listen() {
    models(sequelize)
    this.app.listen(this.app.get('port'), () => {
      console.log(`${chalk.green('✓')} server started at http://localhost:${this.app.get('port')}`)
    })
  }

  private handleError() {
    this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      let message = typeof error === 'string' ? error : error.message
      if (error.errors) {
        const messages = error.errors.map((el: any) => {
          return el.message
        })
        message = messages.join(', ')
      }
      return ResponseHandler.serverError(res, message)
    })
  }

  private settings() {
    this.app.set('host', '0.0.0.0')
    this.app.set('port', process.env.PORT || 8080)
    this.app.set('views', path.join(__dirname, '../views'))
    this.app.set('view engine', 'pug')
    this.app.use('/assets', express.static('views/assets'))
  }
}
const server = new App()
server.listen()
