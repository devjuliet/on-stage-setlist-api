import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from './users.entity';
import { Setlist } from './setlists.entity';
import { Set } from './sets.entity';
import { LiveEvent } from './live-events.entity';
import { BandMember } from './band-members.entity';
import { LiveDesigner } from './live-designers.entity';
import { BandGenre } from './band-genres.entity';
import { Genre } from './genres.entity';
import { Song } from './songs.entity';
@Table({
  tableName: 'bands',
})
export class Band extends Model<Band> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_band',
  })
  public idBand: number;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    field: 'url_logo',
  })
  public urlLogo: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  public description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_user_manager',
  })
  public idUserManager: number;

  @BelongsTo(() => User, 'idUserManager')
  manager: User;

  @HasMany(() => Setlist, 'idSetlist')
  setlists: Setlist[];

  @HasMany(() => Set, 'idBand')
  sets: Set[];

  @HasMany(() => LiveEvent, 'idLiveEvent')
  liveEvents: LiveEvent[];

  @HasMany(() => BandMember, 'idBand')
  bandMembers: BandMember[];

  @HasMany(() => Song, 'idBand')
  songs: Song[];

  @HasMany(() => LiveDesigner, 'idBand')
  liveDesigners: LiveDesigner[];

  /*@HasMany(() => BandGenre, 'idBandGenre')
  bandGenres: BandGenre[];*/

  @BelongsToMany(
    () => Genre,
    () => BandGenre,
  )
  genres: Genre[];
}
