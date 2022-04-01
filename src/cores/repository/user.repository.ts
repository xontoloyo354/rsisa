import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import { ErrorThrower } from '../../cores/helpers/errorThrower'
import { ResponseType } from '../../cores/helpers/responseType'
import { ChangeLogService } from '../../cores/services/changeLog.service'
import { ChangeLogType } from '../../cores/typings/changeLog.type'
import { ChangeLogModule } from '../../cores/typings/enums/changeLog.enum'
import payloadValidation from '../../modules/facades/payloadValidation.facade'
import { User } from '../models/user.model'

class UserRepository {
  public static async getAll(
    search: any = '',
    offsets: any = '0',
    limits: any = '10',
  ): Promise<{ count: number; rows: User[] }> {
    return await User.findAndCountAll({
      attributes: {
        exclude: ['deletedAt'],
      },
      where:
        search.length > 0
          ? {
              [Op.or]: [{ category: search }],
            }
          : {},
      offset: Number(offsets),
      limit: Number(limits),
    })
  }

  public static async datatable(
    search: any,
    offsets: string = '0',
    limits: string = '10',
  ): Promise<{ count: number; rows: User[] }> {
    const user = await User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            fullname: {
              [Op.like]: `%${search}%`,
            },
          },
          {
            id: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      offset: parseInt(offsets, 10),
      limit: parseInt(limits, 10),
    })
    return user
  }

  public static async create(userId: number, data: any): Promise<User> {
    data.password = await bcrypt.hash(data.password, 256)
    const createUser = await User.create(data)

    if (!createUser) {
      throw new ErrorThrower({
        responseType: ResponseType.SERVER_ERROR,
        message: 'Creating User has been failed',
      })
    }

    const user = await User.findByPk(createUser.id, {
      attributes: { exclude: ['updatedAt', 'deletedAt'] },
    })

    ChangeLogService.getInstance().create({
      userId,
      module: ChangeLogModule.user,
      relatedId: user.id,
      type: ChangeLogType.CREATE,
      description: 'Create User',
      previousData: {},
      nextData: user,
    })

    return user
  }

  public static async get(id: number): Promise<User> {
    return await User.findByPk(id, {
      attributes: { exclude: ['deletedAt'] },
    })
  }

  public static async update(userId: number, id: number, data: any): Promise<User> {
    const isExists = await User.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'deletedAt'],
      },
    })

    if (!isExists) {
      throw new ErrorThrower({
        responseType: ResponseType.NOT_FOUND,
        message: 'User ID is not found',
      })
    }

    if (data.password != null) {
      data.password = await bcrypt.hash(data.password, 256)
    } else {
      delete data.password
    }

    const updateUser = await User.update(data, {
      where: { id },
    })

    if (!updateUser) {
      throw new ErrorThrower({
        responseType: ResponseType.SERVER_ERROR,
        message: 'Updating User has been failed',
      })
    }

    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'deletedAt'],
      },
    })

    ChangeLogService.getInstance().create({
      userId,
      module: ChangeLogModule.user,
      relatedId: user.id,
      type: ChangeLogType.UPDATE,
      description: 'Update User',
      previousData: isExists,
      nextData: user,
    })

    return user
  }

  public static async delete(userId: number, id: number): Promise<void> {
    const user = await User.findByPk(id)

    if (!user) {
      throw new ErrorThrower({
        responseType: ResponseType.NOT_FOUND,
        message: 'User ID is not found',
      })
    }

    User.destroy({
      where: { id },
    })

    ChangeLogService.getInstance().create({
      userId,
      module: ChangeLogModule.user,
      relatedId: id,
      type: ChangeLogType.DELETE,
      description: 'Delete User',
      previousData: user,
      nextData: {},
    })
  }

  public static async getByUsername(username: string): Promise<User> {
    const user = await User.findOne({ where: { username } })
    return user
  }
}

export default UserRepository
