import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Setlist } from './setlists.entity';
import { Set } from './sets.entity';
@Table({
  tableName: 'setlist_sets',
})
export class SetlistSet extends Model<SetlistSet> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_setlist_set',
  })
  public idSetlistSet: number;

  @ForeignKey(() => Setlist)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_setlist',
  })
  public idSetlist: number;

  @BelongsTo(() => Setlist, 'idSetlist')
  setlist: Setlist;

  @ForeignKey(() => Set)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_set',
  })
  public idSet: number;

  @BelongsTo(() => Set, 'idSet')
  oneSet: Set;
}
