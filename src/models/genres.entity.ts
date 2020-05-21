import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { BandGenre } from './band-genres.entity';

@Table({
  tableName: 'genres',
})
export class Genre extends Model<Genre> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_genre',
  })
  public idGenre: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  public name: string;

  @HasMany(() => BandGenre, 'idBandGenre')
  bandGenres: BandGenre[];
}
