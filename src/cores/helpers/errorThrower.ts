import { ResponseType } from './responseType';

class ErrorThrower extends Error {
  public responseType: ResponseType
  public message: string
  public data: object
  constructor({ message = 'Internal Server Error', responseType = ResponseType.SERVER_ERROR, data = null }: { message: string, responseType?: ResponseType, data?: object }) {
    super();

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;

    this.message = message ||
      'Internal Server Error';

    this.responseType = responseType;
  }
}
export { ErrorThrower };

