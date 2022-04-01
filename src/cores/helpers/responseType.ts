import { Response } from 'express';

interface IJSONResponseBuilder {
  responseType: ResponseType;
  data?: any;
  message?: string;
}

export const responseJsonBuilder = (res: Response, response: IJSONResponseBuilder) => {
  res.status(response.responseType.status);
  res.json({
    error: response.responseType.error,
    message: response.message ?? response.responseType.message,
    data: response.data,
  });
};
export class ResponseType {

  public static SUCCESS = new ResponseType(200, false, 'Success');
  public static CREATED = new ResponseType(201, false, 'Created');
  public static ACCEPTED = new ResponseType(202, false, 'Accepted');
  public static NOCONTENT = new ResponseType(204, false, 'Accepted');
  public static NOT_MODIFIED = new ResponseType(304, false, 'Not Modified');
  public static FORBIDDEN = new ResponseType(400, true, 'Forbidden');
  public static VALIDATION_ERROR = new ResponseType(400, true, 'Validation Error');
  public static UNAUTHORIZED = new ResponseType(401, true, 'Unauthorized');
  public static NOT_FOUND = new ResponseType(404, true, 'Not found');
  public static SERVER_ERROR = new ResponseType(500, true, 'Server Error');
  public status: number;
  public error: boolean;
  public message: string;

  constructor(status: number, error: boolean, message: string) {
    this.status = status;
    this.error = error;
    this.message = message;
  }
}