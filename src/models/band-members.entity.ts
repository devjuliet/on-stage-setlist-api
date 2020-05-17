import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './users.entity';
import { Band } from './bands.entity';
@Table({
  tableName: 'band_members',
})
export class BandMember extends Model<BandMember> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_member',
  })
  public idMember: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
  })
  public role: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_user',
  })
  public idUser: string;

  @ForeignKey(() => Band)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_band',
  })
  public idBand: string;
}
