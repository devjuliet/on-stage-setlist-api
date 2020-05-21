import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { SongTag } from './songs-tags.entity';
import { SetSong } from './set-songs.entity';
@Table({
  tableName: 'songs',
})
export class Song extends Model<Song> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_song',
  })
  public idSong: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public artist: string;

  @Column({
    type: DataType.STRING(20000),
    allowNull: false,
  })
  public lyric: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: true,
    defaultValue: null,
    field: 'chords_guitar',
  })
  public chordsGuitar: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: true,
    defaultValue: null,
    field: 'tab_guitar',
  })
  public tabGuitar: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: true,
    defaultValue: null,
    field: 'chords_bass',
  })
  public chordsBass: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: true,
    defaultValue: null,
    field: 'tab_bass',
  })
  public tabBass: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: true,
    defaultValue: null,
    field: 'chords_piano',
  })
  public chordsPiano: string;

  @Column({
    type: DataType.STRING(250),
    allowNull: true,
    defaultValue: null,
    field: 'tab_piano',
  })
  public tabPiano: string;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
  })
  public tempo: number;

  @HasMany(() => SongTag, 'idSongTag')
  songTags: SongTag[];

  @HasMany(() => SetSong, 'idSetSong')
  setSongs: SetSong[];
}
