import { detailedDiff } from 'deep-object-diff';
import { logger } from '../helpers/logger';
import ChangeLog from '../models/changeLog.model';
import { ChangeLogModule } from '../typings/enums/changeLog.enum';
import IChangeLogObject from '../typings/interfaces/changeLog.interface';

export class ChangeLogService {
  public static getInstance(): ChangeLogService {
    if (!ChangeLogService.instance) {
      ChangeLogService.instance = new ChangeLogService();
    }

    return ChangeLogService.instance;
  }

  private static instance: ChangeLogService;

  private constructor() {}

  public async create(object: IChangeLogObject) {
    try {
      const nextData: {} = detailedDiff(
        JSON.parse(JSON.stringify(object.previousData)),
        JSON.parse(JSON.stringify(object.nextData)),
      )

      await ChangeLog.create({
        userId: object.userId,
        module: ChangeLogModule[object.module],
        relatedId: object.relatedId,
        type: object.type,
        description: object.description,
        previousData: JSON.stringify(object.previousData ? object.previousData : {}),
        nextData:
          Object.keys(object.previousData).length > 0 && Object.keys(object.nextData).length > 0
            ? JSON.stringify(nextData)
            : JSON.stringify(object.nextData),
      });
    } catch (error) {
      logger.error(error.message, 'ChangeLogService create');
    }
  }
}
