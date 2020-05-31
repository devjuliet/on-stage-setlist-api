import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

@Table({
  tableName: 'tags',
})
export class Tag extends Model<Tag> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_tag',
  })
  public idTag: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public name: string;

  /* @HasMany(() => LiveEventTag, 'idLiveEventTag')
  liveEventTags: LiveEventTag[];

  @HasMany(() => SetlistTag, 'idSetlistTag')
  setlistTags: SetlistTag[];

  @HasMany(() => SongTag, 'idSongTag')
  songTags: SongTag[]; */
}
