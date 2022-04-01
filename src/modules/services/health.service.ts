import { NextFunction, Request, Response } from 'express'
import { ResponseHandler } from '../../cores/helpers/responseHandler'

class HealthService {
  public static index = async (req:Request, res: Response, next: NextFunction) => {
    try {
      return ResponseHandler.jsonSuccess(res, 'OK')
    } catch (error) {
      return ResponseHandler.serverError(res, error)
    }
  }
}

export default HealthService