import { NextFunction, Router } from 'express'
import DashboardControler from '../cores/controllers/dashboard.controller'
import AuthControler from '../cores/controllers/auth.controller'
import { group } from '../cores/helpers/groupHandler'
import HealthService from '../modules/services/health.service'
import UserController from '../cores/controllers/user.controller'

import MessageControler from '../modules/controller/massageLetter.controller'

const webRouter = Router()
webRouter.use(
  '/',
  group((router: Router, next: NextFunction) => {
    router.get('/', DashboardControler.index)
    router.get('/messageDireksi', MessageControler.direksi)
    router.get('/messageSekretariat', MessageControler.sekretariat)

    router.use(
      '/master',
      group((router: Router, next: NextFunction) => {
        router.use(
          '/user',
          group((router: Router, next: NextFunction) => {
            router.get('/', UserController.index)
            router.get('/json', UserController.json)
            router.get('/check-username', UserController.checkUsername)
            router.post('/create', UserController.create)
            router.put('/:userId/update', UserController.update)
            router.delete('/:userId/delete', UserController.delete)
          }),
        )
      }),
    )

    router.get('/login', AuthControler.login)
    router.get('/logout', AuthControler.logout)
  }),
)

export { webRouter }
