import { Request, Response } from 'express'
import { asyncHandler } from '../../cores/helpers/asyncHandler'
import { ResponseHandler } from '../../cores/helpers/responseHandler'
import { responseJsonBuilder, ResponseType } from '../../cores/helpers/responseType'
import SampleRepository from '../repository/sample.repository'

class SampleService {
  public static index = asyncHandler(async (req:Request, res: Response) => {
    try {
      const sample = await SampleRepository.getAll(
        req.query.search,
        req.query.offset,
        req.query.limit,
      )

      return ResponseHandler.jsonSuccess(res, {
        rows: sample.rows,
        total: sample.count,
      })
    } catch (error) {
      return responseJsonBuilder(res, error)
    }
  })

  public static create = asyncHandler(async (req:any, res: Response) => {
    try {
      const userId: number = Number(req.headers.id)

      const sample = await SampleRepository.create(userId, req.body)

      return responseJsonBuilder(res, {
        responseType: ResponseType.CREATED,
        message: 'Success',
        data: sample,
      })
    } catch (error) {
      return responseJsonBuilder(res, error)
    }
  })
  
  public static show = asyncHandler(async (req:Request, res: Response) => {
    try {
      const id: number = Number(req.params.id)
      const sample = await SampleRepository.get(id)

      return ResponseHandler.jsonSuccess(res, sample)
    } catch (error) {
      return responseJsonBuilder(res, error)
    }
  })

  public static update = asyncHandler(async (req:Request, res: Response) => {
    try {
      const id: number = Number(req.params.id)
      const userId: number = Number(req.headers.id)

      const sample = await SampleRepository.update(
        userId,
        id,
        req.body,
      )

      return ResponseHandler.jsonSuccess(res, sample)
    } catch (error) {
      return responseJsonBuilder(res, error)
    }
  })

  public static destroy = asyncHandler(async (req:Request, res: Response) => {
    try {
      const userId: number = Number(req.headers.id)
      const id: number =  Number(req.params.id)
      
      await SampleRepository.delete(userId, id)

      return responseJsonBuilder(res, {
        responseType: ResponseType.SUCCESS,
        message: 'Success',
      })
    } catch (error) {
      return responseJsonBuilder(res, error)
    }
  })
}

export default SampleService