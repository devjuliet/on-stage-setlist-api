import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { SetSong } from './set-songs.entity';
import { Band } from './bands.entity';
import { Tag } from './tags.entity';
import { Set } from './sets.entity';
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
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'chords_guitar',
  })
  public chordsGuitar: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'tab_guitar',
  })
  public tabGuitar: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'chords_bass',
  })
  public chordsBass: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'tab_bass',
  })
  public tabBass: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'chords_piano',
  })
  public chordsPiano: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'tab_piano',
  })
  public tabPiano: boolean;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: true,
    defaultValue: null,
  })
  public tempo: number;

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

  @BelongsTo(() => Band, 'idBand')
  band: Band;

  @BelongsTo(() => Tag, 'idTag')
  tag: Tag;

  /*@HasMany(() => SetSong, 'idSetSong')
  setSongs: SetSong[];*/

  /* @HasMany(() => BandGenre, 'idBandGenre')
  bandGenres: BandGenre[];*/

  @BelongsToMany(
    () => Set,
    () => SetSong,
  )
  sets: Set[];
}
