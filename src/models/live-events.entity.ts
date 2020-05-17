import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Band } from './bands.entity';
import sequelize = require('sequelize');

@Table({
  tableName: 'live_events',
})
export class LiveEvent extends Model<LiveEvent> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_live_event',
  })
  public idLiveEvent: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public location: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public tour: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: sequelize.fn('current_timestamp'),
  })
  public date: Date;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public place: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public tag: string;

  @ForeignKey(() => Band)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_band',
  })
  public idBand: number;
}
