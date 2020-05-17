//import { Sequelize, DataType } from 'sequelize';
import * as bcrypt from 'bcrypt';

import {
  Table,
  Column,
  Model,
  DataType,
  /* CreatedAt,
  UpdatedAt, */
  DeletedAt,
  BeforeUpdate,
  BeforeCreate,
  BelongsTo,
  HasOne
} from 'sequelize-typescript';
/* import { Band } from './band.entity'; */

@Table({
  tableName: 'usuarios',
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER({length : 10}),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public idusuarios : number;

  /* @HasOne(() => Band, 'user_id')
  band: Band; */

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  usuario : string;
  
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  nombre : string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  apellidos : string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  password : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  entidad : string;

  @Column({
    type: DataType.STRING(45),
    allowNull: false,
  })
  extension : string;

  @Column({
    type: DataType.INTEGER({length : 10}),
    allowNull: false,
  })
  rolusuario : number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  email : string;
  
  @BeforeCreate
  public static async hashPassword( user : User ) {
    // Generate a salt and use it to hash the user's password
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
    //a partir de aqui se hacen las acciones posteriores
  }

  public async validPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}