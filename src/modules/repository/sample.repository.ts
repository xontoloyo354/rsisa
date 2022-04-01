import { Op } from 'sequelize'
import { ErrorThrower } from '../../cores/helpers/errorThrower'
import { ResponseType } from '../../cores/helpers/responseType'
import { ChangeLogService } from '../../cores/services/changeLog.service'
import { ChangeLogType } from '../../cores/typings/changeLog.type'
import { ChangeLogModule } from '../../cores/typings/enums/changeLog.enum'
import payloadValidation from '../facades/payloadValidation.facade'
import Sample from '../models/sample.model'
import { SampleRequestSchema } from '../schemas/sample.schema'

class SampleRepository {
  public static async getAll(
    search: any = '',
    offsets: any = '0',
    limits: any = '10',
  ): Promise<{ count: number; rows: Sample[] }> {
    return await Sample.findAndCountAll({
      attributes: {
        exclude: ['deletedAt'],
      },
      where: search.length > 0 ? {
        [Op.or]: [
          {category: search},
        ],
      } : {},
      offset: Number(offsets),
      limit: Number(limits),
    })
  }
  
  public static async create(userId:number, data: any): Promise<Sample> {
    const value = await payloadValidation(SampleRequestSchema, data)

    const createSample = await Sample.create(value)

    if (!createSample) {
      throw new ErrorThrower({
        responseType: ResponseType.SERVER_ERROR,
        message: 'Creating Sample has been failed',
      })
    }

    const sample = await Sample.findByPk(
      createSample.id, {
        attributes: {exclude: ['updatedAt', 'deletedAt']},
      })

    ChangeLogService.getInstance().create({
      userId,
      module: ChangeLogModule.sample,
      relatedId: sample.id,
      type: ChangeLogType.CREATE,
      description: 'Create Sample',
      previousData: {},
      nextData: sample,
    })

    return sample
  }

  public static async get(id: number): Promise<Sample> {
    return await Sample.findByPk(id, {
      attributes: {exclude: ['deletedAt']},
    })
  }

  public static async update(userId:number, id:number, data: any): Promise<Sample> {
    const isExists = await Sample.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'deletedAt'],
      },
    })

    if (!isExists) {
      throw new ErrorThrower({
        responseType: ResponseType.NOT_FOUND,
        message: 'Sample ID is not found',
      })
    }
    
    const value = await payloadValidation(SampleRequestSchema, data)

    const updateSample = await Sample.update(value, {
      where: {id},
    })

    if (!updateSample) {
      throw new ErrorThrower({
        responseType: ResponseType.SERVER_ERROR,
        message: 'Updating Sample has been failed',
      })
    }

    const sample = await Sample.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'deletedAt'],
      },
    })

    ChangeLogService.getInstance().create({
      userId,
      module: ChangeLogModule.sample,
      relatedId: sample.id,
      type: ChangeLogType.UPDATE,
      description: 'Update Sample',
      previousData: isExists,
      nextData: sample,
    })

    return sample
  }

  public static async delete(userId: number, id: number): Promise<void> {
    const sample = await Sample.findByPk(id)

    if (!sample) {
      throw new ErrorThrower({
        responseType: ResponseType.NOT_FOUND,
        message: 'Sample ID is not found',
      })
    }

    Sample.destroy({
      where: {id},
    })

    ChangeLogService.getInstance().create({
      userId,
      module: ChangeLogModule.sample,
      relatedId: id,
      type: ChangeLogType.DELETE,
      description: 'Delete Sample',
      previousData: sample,
      nextData: {},
    })
  }
}

export default SampleRepository