import { NextFunction, Router } from 'express'
import { group } from '../cores/helpers/groupHandler'
import fileMiddleware from '../cores/middlewares/file.middleware'
import SampleService from '../modules/services/sample.service'
import HealthyService from '../modules/services/health.service'

const apiRouters = Router()

apiRouters.use('/v1', group((router: Router, next: NextFunction) => {
  // Base
  router.get('/health', HealthyService.index)
  router.get('/check-auth', HealthyService.index)

  // Sample
  router.get('/samples', SampleService.index)
  router.post('/samples', fileMiddleware, SampleService.create)
  router.get('/samples/:id', SampleService.show)
  router.put('/samples/:id', SampleService.update)
  router.delete('/samples/:id', SampleService.destroy)
}))

const apiRouter = Router()
apiRouter.use('/api', apiRouters)

export { apiRouter }
