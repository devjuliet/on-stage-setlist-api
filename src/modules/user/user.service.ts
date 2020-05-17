import { Injectable, Inject } from '@nestjs/common';
// import { USER_REPOSITORY } from '../utils/constants';
import { User } from '../../models/user.entity';
//Normalmente se usa para formatear el objeto que recibimos en el request
import { CreateUserDto } from './dto/createUser.dto';
import { validators } from '../../utils/validators'
import { LoginUserDto } from './dto/loginUser.dto';
import { ServerMessage } from '../../utils/dtos/serverMessages.dto';

@Injectable()
export class UserService {
  constructor(
    //Es una manera de dar de alta el repositorio de la tabla de usuarios
    @Inject('UserRepository') private readonly userRepository: typeof User,
    /* @Inject('BandRepository') private readonly bandRepository: typeof Band, */
  ) { }

  /* async consultaEjemplo() {
    let response: any = {};

    try {
      response.newband = await this.bandRepository.findAll<Band>({
        attributes: ['band_id', 'name', 'photo', 'base_price', 'reviews', 'score'],
        where: { active: 1 },
        order: [
          ['created_at', 'DESC'],
        ],
        limit: 10,
        include: [{
          model: State,
          attributes: [['name', 'name']],
        }, {
          model: Town,
          attributes: [['name', 'name']],
        }, {
          model: BandSlider,
          attributes: [['url', 'url']],
          limit: 1
        }],
      }).map((band: any) => {
        return Object.assign(
          {
            band_id: band.band_id,
            name: band.name,
            photo: (new String(JSON.stringify(band.sliders[0])))
              .substring(8, new String(
                JSON.stringify(band.sliders[0])).length - 2),
            base_price: band.base_price,
            reviews: band.reviews,
            score: band.score,
            town_name: band.town.name,
            state_name: band.state.name
          })
      });

      return response;
    } catch (error) {
      return error;
    }
  } */

  /* async testUserWithBand(bandId : string) {
    return await this.userRepository.findOne<User>({include: [Band] ,where: {username: bandId}});
    //return await this.bandRepository.findOne<Band>({include: [User] ,where: {band_id: bandId}});
  }

  

  async findOneByEmail(useremail : string): Promise<User> {
    return await this.userRepository.findOne<User>({where: {email: useremail}});
  } */

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      attributes: ['idusuarios', 'usuario', 'nombre', 'apellidos', 'password', 'entidad', 'extension', 'rolusuario'],
      where: { usuario: username }
    });
  }

  async getAllUsers(): Promise<ServerMessage> {
    try {
      var userList = await this.userRepository.findAll<User>();
      return new ServerMessage(false, "Lista de usuarios obtenida", userList);
    } catch (error) {
      return new ServerMessage(true, "Error obteniendo lista de usuarios", {});
    }
  }

  async registerUser(createUser: CreateUserDto): Promise<ServerMessage> {
    if (!createUser.usuario || !createUser.nombre || !createUser.apellidos || !createUser.password || !createUser.extension
      || !createUser.entidad || !createUser.rolusuario || !createUser.email) {
      return new ServerMessage(true, "Peticion incompleta", {});
    }
    var user = await this.findOneByUsername(createUser.usuario);

    if (!user) {
      try {
        var newUser: User = await this.userRepository.create<User>(createUser, {});
        return new ServerMessage(false, "Usuario creado con exito", newUser);
      } catch (error) {
        return new ServerMessage(true, "A ocurrido un error", error);
      }
    } else {
      return new ServerMessage(true, "Usuario actualmente registrado", {});
    }
  }
}