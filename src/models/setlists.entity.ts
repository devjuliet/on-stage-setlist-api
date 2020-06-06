import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Band } from './bands.entity';
import { LiveEvent } from './live-events.entity';
import { HasMany } from 'sequelize-typescript';
import { SetlistSet } from './setlist-sets.entity';
import { Tag } from './tags.entity';
import { LiveDesigner } from './live-designers.entity';
import { User } from './users.entity';
import { Set } from './sets.entity';

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
    allowNull: true,
    field: 'id_live_event',
  })
  public idLiveEvent: number;


  @ForeignKey(() => Band)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_band',
  })
  public idBand: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_tag',
  })
  public idTag: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_live_designer',
  })
  public idLiveDesigner: number;
  
  @BelongsTo(() => LiveEvent, 'idLiveEvent')
  liveEvent: LiveEvent;

  @BelongsTo(() => Band, 'idBand')
  band: Band;

  @BelongsTo(() => Tag, 'idTag')
  tag: Tag;

  @BelongsTo(() => User, 'idLiveDesigner')
  liveDesigner: User;

  @HasMany(() => SetlistSet, 'idSetlist')
  setlists: SetlistSet[];
  
  @BelongsToMany(() => Set, () => SetlistSet)
  sets: Set[];
}
