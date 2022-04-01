import { Request, Response } from 'express';
import { logger } from './logger';
import { responseJsonBuilder, ResponseType } from './responseType';

export const redirectBackIfError = (error: Error, req: Request, res: Response, val:any = null) => {
  if (error) {
    logger.error(error.message);

    if (res.locals.api) {
      responseJsonBuilder(res, {
        responseType: ResponseType.VALIDATION_ERROR,
        message: error.message,
      });
      return true;
    }
    res.redirect('back');
    return true;
  }
  return false;
};

export const redirectBackIfEmpty = (
  object: object,
  errorMessage: string,
  req: Request,
  res: Response,
  val:any = null,
) => {
  if (!object) {
    logger.error(errorMessage);

    if (res.locals.api) {
      responseJsonBuilder(res, {
        responseType: ResponseType.VALIDATION_ERROR,
        message: errorMessage,
      });
      return true;
    }
    res.redirect('back');
    return true;
  }
  return false;
};
