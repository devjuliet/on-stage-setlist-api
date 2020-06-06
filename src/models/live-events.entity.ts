import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Band } from './bands.entity';
import { Setlist } from './setlists.entity';
import sequelize = require('sequelize');
import { Tag } from './tags.entity';

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
    type: DataType.STRING(1000),
    allowNull: false,
  })
  public location: string;

  @Column({
    type: DataType.STRING(150),
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
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_tag',
  })
  public idTag: number;

  @ForeignKey(() => Band)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_band',
  })
  public idBand: number;

  @BelongsTo(() => Band, 'idBand')
  band: Band;

  @HasOne(() => Setlist, 'idLiveEvent')
  setlist: Setlist;

  @BelongsTo(() => Tag, 'idTag')
  tag: Tag;
}
