import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'ChangeLog',
})
class ChangeLog extends Model<ChangeLog> {
  @Column
  public module: string;

  @Column
  public relatedId: string;

  @Column
  public userId: number;

  @Column
  public type: string;

  @Column
  public description: string;

  @Column
  public previousData: string;

  @Column
  public nextData: string;
}

export default ChangeLog
