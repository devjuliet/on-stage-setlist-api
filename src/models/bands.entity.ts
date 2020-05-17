import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './users.entity';
@Table({
  tableName: 'bands',
})
export class Band extends Model<Band> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_band',
  })
  public idBand: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    field: 'url_logo',
  })
  public urlLogo: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  public description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_user_manager',
  })
  public idUserManager: string;
}
