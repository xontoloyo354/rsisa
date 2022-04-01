import { Op } from 'sequelize';
import ModelName from './ModuleName.model';
import { ModuleNameCreateRequest } from './ModuleName.schema';

class RepositoryNameRepository {
  public static async create(user: User, payload: ModuleNameCreateRequest): Promise<ModelName> {
    const data = await ModelName.create({
      ...payload,
      createdBy: user.id,
      updatedBy: user.id,
    });
    return data;
  }
  public static async getAll(search: any = ''): Promise<ModelName[]> {
    const data = await ModelName.findAll();
    return data;
  }
  public static async get(id: string): Promise<ModelName> {
    const data = await ModelName.findByPk(id);
    return data;
  }
  public static async datatable(search: any, offsets: string = '0', limits: string = '10') {
    const data = await ModelName.findAndCountAll({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.like]: `%${search}%`,
            },
          },
        ],
      },
      offset: parseInt(offsets, 10),
      limit: parseInt(limits, 10),
    });
    return data;
  }
  public static async update(
    user: User,
    id: string,
    payload: ModuleNameCreateRequest,
  ): Promise<ModelName> {
    await ModelName.update(payload, { where: { id } });
    const newData = await ModelName.findByPk(id);
    return newData;
  }
  public static async delete(user: User, id: string): Promise<boolean> {
    await ModelName.destroy({ where: { id } });
    return true;
  }
}
export default RepositoryNameRepository;
