import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'sets',
})
export class Set extends Model<Set> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_set',
  })
  public idSet: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public name: string;
}
