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
import { SetlistSet } from './setlist-sets.entity';
import { Band } from './bands.entity';
import { Song } from './songs.entity';

@Table({
  tableName: 'sets',
})
export class Set extends Model<Set> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_set',
  })
  public idSet: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: true,
    defaultValue: '',
  })
  public description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'have_image',
  })
  haveImage: boolean;

  @ForeignKey(() => Band)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_band',
  })
  public idBand: number;

  @BelongsTo(() => Band, 'idBand')
  band: Band;

  @HasMany(() => SetlistSet, 'idSetlistSet')
  setlistSets: SetlistSet[];

  /*@HasMany(() => SetSong, 'idSetSong')
  setSongs: SetSong[];*/

  @BelongsToMany(
    () => Song,
    () => SetSong,
  )
  songs: Song[];
}
