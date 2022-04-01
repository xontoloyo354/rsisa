import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
@Table({
  tableName: 'TableName',
  timestamps: true,
  paranoid: true,
})
class ModelName extends Model<ModelName> {
  @ForeignKey(() => User)
  @Column
  public createdBy: number;

  @BelongsTo(() => User, 'createdBy')
  public userCreate: string;

  @ForeignKey(() => User)
  @Column
  public updatedBy: number;

  @BelongsTo(() => User, 'updatedBy')
  public userUpdate: User;

  @ForeignKey(() => User)
  @Column
  public deletedBy: number;

  @BelongsTo(() => User, 'deletedBy')
  public userDelete: User;
}

export default ModelName;
