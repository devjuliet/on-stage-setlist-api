import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Tag } from './tags.entity';
import { LiveEvent } from './live-events.entity';
@Table({
  tableName: 'live_event_tags',
})
export class LiveEventTag extends Model<LiveEventTag> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_live_event_tags',
  })
  public idLiveEventTag: number;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_tag',
  })
  public idTag: number;

  @BelongsTo(() => Tag, 'idTag')
  tag: Tag;

  @ForeignKey(() => LiveEvent)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_live_event',
  })
  public idLiveEvent: number;

  @BelongsTo(() => LiveEvent, 'idLiveEvent')
  liveEvent: LiveEvent;
}
