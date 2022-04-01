import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Samples',
  timestamps: true,
  paranoid: true,
})

class Sample extends Model<Sample> {
  @Column
  public category: string;
  
  @Column
  public title: string;

  @Column
  public body: string;

  @Column
  public isVerified: boolean;

  @Column
  public createdAt: Date;

  @Column
  public updatedAt: Date;

  @Column
  public deletedAt: Date;
}

export default Sample
