import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'genres',
})
export class Genre extends Model<Genre> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_genre',
  })
  public idGenre: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public name: string;
}
