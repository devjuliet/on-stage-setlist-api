import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/loginUser.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwtPayload.interface';
import { User } from '../../models/users.entity';

import { ServerMessages } from './../../utils/serverMessages';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @Inject('UserRepository') private readonly userRepository: typeof User,
  ) {}

  async validateUserByPassword(loginAttempt: LoginUserDto) {
    // This will be used for the initial login
    let userToAttempt: User = await this.usersService.findOneByUsername(
      loginAttempt.username,
    );

    return new Promise(async (resolve, reject) => {
      let response: any;
      if (userToAttempt == null) {
        resolve(
          new ServerMessages(true, 'Usuario y/ó contraseña invalidos', {}),
        );
      } else {
        // Check the supplied password against the hash stored for this username
        let checPass = await userToAttempt.validPassword(loginAttempt.password);
        if (checPass) {
          // If there is a successful match, generate a JWT for the user
          response = this.createJwtPayload(userToAttempt.usuario);
          response.user = userToAttempt;

          resolve(new ServerMessages(false, 'Inicio Exitoso', response));
        } else {
          resolve(
            new ServerMessages(
              true,
              'Usuario y/ó contraseña invalidos',
              new UnauthorizedException(),
            ),
          );
        }
      }
    });
  }

  //Esta funcion nos ayuda a crear el middleware donde vamos a sacar el usuario segun los token que lleguen
  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    let user: any;
    user = await this.usersService.findOneByUsername(payload.usuario);

    if (user) {
      // If there is a successful match, generate a JWT for the user
      //let token = this.createJwtPayload(user.email);
      //return  new ServerMessages(false , "Inicio Exitoso", response ) ;
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(usuario) {
    let data: JwtPayload = {
      usuario: usuario,
    };

    let jwt = this.jwtService.sign(data);

    return {
      expiresIn: 60 * 60 * 24 * 365, //Token de un año de vida para evitar guardar datos personales en los dispositivos
      token: jwt,
    };
  }
}
