import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Tag } from './tags.entity';
import { Song } from './songs.entity';
@Table({
  tableName: 'song_tags',
})
export class SongTag extends Model<SongTag> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_song_tag',
  })
  public idSongTag: number;

  @ForeignKey(() => Song)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_song',
  })
  public idSong: number;

  @BelongsTo(() => Song, 'idSong')
  song: Song;

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
