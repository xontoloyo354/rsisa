import { Response } from 'express';

export class ResponseHandler {
  public static jsonSuccess(res: Response, data: unknown, message?: string) {
    res.status(200)
      .json({
        message: message || 'Success',
        error: false,
        data,
      })
  }

  public static jsonError(res: Response, message?: string) {
    res.status(200)
      .json({
        message: message || 'Success with warning',
        error: true,
      })
  }

  public static unauthorized(res: Response, message?: string) {
    res.status(401)
      .json({
        message: message || 'Unathorized',
        error: true,
      })
  }

  public static serverError(res: Response, message?: string) {
    res.status(500)
      .json({
        message: message || 'Error Server',
        error: true,
      })
  }

  public static badRequest(res: Response, message?: string) {
    res.status(400)
      .json({
        message: message || 'Bad Request',
        error: true,
      })
  }
}