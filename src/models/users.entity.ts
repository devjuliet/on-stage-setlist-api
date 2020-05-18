//import { Sequelize, DataType } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { BandMember } from './band-members.entity';
import { Band } from './bands.entity';
import { UserHistory } from './user-history.entity';
import { LiveDesigner } from './live-designers.entity';

import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  HasMany,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_user',
  })
  public idUser: number;

  /* @HasOne(() => Band, 'user_id')
  band: Band; */
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    defaultValue: '0',
    comment: 'Si el usuario es de tipo 0 es que no es manager ni live designer',
    field: 'type',
  })
  type: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  username: string;

  @HasMany(() => BandMember, 'idUser')
  bandMembers: BandMember[];

  @HasMany(() => Band, 'idUserManager')
  managers: Band[];

  @HasMany(() => UserHistory, 'idUser')
  userHistories: UserHistory[];

  @HasMany(() => LiveDesigner, 'idUserDesigener')
  liveDesigners: LiveDesigner[];

  @BeforeCreate
  public static async hashPassword(user: User) {
    // Generate a salt and use it to hash the user's password
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
    //a partir de aqui se hacen las acciones posteriores
  }

  public async validPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}
