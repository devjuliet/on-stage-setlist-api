import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Setlist } from './setlists.entity';
import { Tag } from './tags.entity';
@Table({
  tableName: 'setlist_tags',
})
export class SetlistTag extends Model<SetlistTag> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_setlist_tag',
  })
  public idSetlistTag: number;

  @ForeignKey(() => Setlist)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_setlist',
  })
  public idSetlist: number;

  @BelongsTo(() => Setlist, 'idSetlist')
  setlist: Setlist;

  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_tag',
  })
  public idTag: number;

  @BelongsTo(() => Tag, 'idTag')
  tag: Tag;
}
