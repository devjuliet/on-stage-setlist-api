import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './users.entity';
import { Band } from './bands.entity';

@Table({
  tableName: 'live_designers',
})
export class LiveDesigner extends Model<LiveDesigner> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_live_designer',
  })
  public idLiveDesigner: number;

  @ForeignKey(() => Band)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_band',
  })
  public idBand: number;

  @BelongsTo(() => Band, 'idBand')
  band: Band;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'id_user_designer',
  })
  public idUserDesigner: number;

  @BelongsTo(() => User, 'idUserDesigner')
  user: User;
  
}
