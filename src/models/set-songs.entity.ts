import { Set } from './sets.entity';
import { Song } from './songs.entity';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table({
  tableName: 'set_songs',
})
export class SetSong extends Model<SetSong> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_set_songs',
  })
  public idSetSong: number;

  @ForeignKey(() => Set)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_set',
  })
  public idSet: number;

  @ForeignKey(() => Song)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_song',
  })
  public idSong: number;

  /*@BelongsTo(() => Song, 'idSong')
  song: Song;*/
}
