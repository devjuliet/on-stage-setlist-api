import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Band } from './bands.entity';
import { LiveEvent } from './live-events.entity';
import { HasMany } from 'sequelize-typescript';
import { SetlistSet } from './setlist-sets.entity';
import { Tag } from './tags.entity';
@Table({
  tableName: 'setlists',
})
export class Setlist extends Model<Setlist> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_setlist',
  })
  public idSetlist: number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  public name: string;

  @ForeignKey(() => LiveEvent)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    unique: true,
    field: 'id_live_event',
  })
  public idLiveEvent: number;

  @BelongsTo(() => LiveEvent, 'idLiveEvent')
  liveEvent: LiveEvent;

  @ForeignKey(() => Band)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_band',
  })
  public idBand: number;

  @BelongsTo(() => Band, 'idBand')
  band: Band;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_tag',
  })
  public idTag: number;
  
  @BelongsTo(() => Tag, 'idTag')
  tag: Tag;
  
  @HasMany(() => SetlistSet, 'idSetlistSet')
  setlistSets: SetlistSet[];
  
}
