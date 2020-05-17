import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './users.entity';
import sequelize = require('sequelize');
@Table({
  tableName: 'user_history',
})
export class UserHistory extends Model<UserHistory> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_user_history',
  })
  public idUserHistory: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: sequelize.fn('current_timestamp'),
  })
  public date: Date;

  @Column({
    type: DataType.STRING(500),
    allowNull: false,
  })
  public description: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    field: 'band_name',
  })
  public bandName: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_user',
  })
  public idUser: string;
}
