import { ChangeLogType } from '../changeLog.type'
import { ChangeLogModule } from '../enums/changeLog.enum'

interface IChangeLogObject {
  module: ChangeLogModule
  relatedId: number
  type: ChangeLogType
  description: string
  previousData?: object
  nextData?: object
  userId: number
}

export default IChangeLogObject