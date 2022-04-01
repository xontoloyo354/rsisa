import { Column, Model, Table, Unique } from 'sequelize-typescript'

@Table({
  tableName: 'Users',
  timestamps: true,
  paranoid: true,
})
class User extends Model<User> {
  @Unique
  @Column
  public username: string

  @Column
  public fullname: string

  @Column
  public department: number

  @Column
  public password: string

  @Column
  public isActive: boolean

  @Column
  public createdAt: Date

  @Column
  public updatedAt: Date

  @Column
  public deletedAt: Date
}

export { User }
