import { ErrorThrower } from '../../cores/helpers/errorThrower'
import { ResponseType } from '../../cores/helpers/responseType'

const payloadValidation = async (schema: any, data: any) => {
  const { value, error } = schema.validate(data)

  if (error) {
    throw new ErrorThrower({
      responseType: ResponseType.VALIDATION_ERROR,
      message: error.message,
    })
  }

  return value
}

export default payloadValidation