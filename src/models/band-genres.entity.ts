import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Band } from './bands.entity';
import { Genre } from './genres.entity';
@Table({
  tableName: 'band_genres',
})
export class BandGenre extends Model<BandGenre> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_band_genre',
  })
  public idBandGenre: number;

  @ForeignKey(() => Band)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_band',
  })
  public idBand: number;

  @BelongsTo(() => Band, 'idBand')
  band: Band;

  @ForeignKey(() => Genre)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_genre',
  })
  public idGenre: number;

  @BelongsTo(() => Band, 'idGenre')
  genre: Genre;
}
