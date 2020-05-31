import { Injectable, Inject } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { User } from '../../models/users.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Op } from 'sequelize';
import { UserHistory } from '../../models/user-history.entity';
import { Genre } from '../../models/genres.entity';
import { BandMember } from '../../models/band-members.entity';
import { BandDto } from '../manager/dto/band.dto';

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const singerA = a.name.toUpperCase();
  const singerB = b.name.toUpperCase();

  let comparison = 0;
  if (singerA > singerB) {
    comparison = 1;
  } else if (singerA < singerB) {
    comparison = -1;
  }
  return comparison;
}
@Injectable()
export class SearchService {
  constructor(
    @Inject('BandRepository')
    private readonly bandRepository: typeof Band,
    @Inject('UserRepository')
    private readonly userRepository: typeof User,
  ) {}

  async findMembersAndBandByName(name): Promise<ServerMessages> {
    try {
      //TO DO - Esta busqueda regresa los usuarios que tienen 0 solamente
      const members = await this.userRepository.findAll({
        where: {
          name: { [Op.like]: '%' + name.name + '%' },
          type: { [Op.eq]: 0 },
        },
        order: [['name', 'ASC']],
      }).map((member: User) => {
        return Object.assign({
          id : member.idUser,
          name : member.name,
          haveImage : member.haveImage,
          description : member.description.length == 0 ? "Sin descripcion" : member.description,
          role : member.role,
          genres : [],
          isBand : false,
        })
      });
      const bands = await this.bandRepository.findAll({
        where: {
          name: { [Op.like]: '%' + name.name + '%' },
        },
        order: [['name', 'ASC']],
        include: [{
            model: Genre,
            as: 'genres',
          }]
      }).map((band: Band) => {
        return Object.assign({
          id : band.idBand,
          name : band.name,
          haveImage : band.urlLogo.length == 0 ? false : true,
          description : band.description.length == 0 ? "Sin descripcion" : band.description,
          role : -1,
          genres : band.genres.map((genre: Genre) => {
            return Object.assign({
              id : genre.idGenre,
              name : genre.name
            })
          }),
          isBand : true,
        })
      });;

      const list: any = members;
      bands.forEach(element => list.push(element));
      let newList = [];
      newList = list;
      newList.sort(compare);

      return new ServerMessages(false, 'Sucess', newList);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async findBandById(idBand): Promise<ServerMessages> {
    try {
      const band = await this.bandRepository.findOne({
        where: { idBand:  idBand },
        include : [{
          model: Genre,
          as: 'genres',
        },{
          model: BandMember,
          as: 'bandMembers',
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
        },]
      });

      if(band == null || band == undefined){
        return new ServerMessages(true, 'La banda no existe', {});
      }else{
        let dataBand = new BandDto();
        dataBand.idBand = band.idBand;
        dataBand.name = band.name;
        dataBand.description = band.description;
        dataBand.urlLogo = band.urlLogo;
        dataBand.idUserManager = band.idUserManager;
        dataBand.genres = band.genres.map((genre: any) => {
          return Object.assign(
            {
              idGenre: genre.idGenre,
              name: genre.name,
            })
        });;
        dataBand.bandMembers = band.bandMembers.map((member: any) => {
          return Object.assign(
            {
              idMember: member.idMember,
              idUser: member.idUser,
              role: member.user.role,
              name: member.user.name,
              haveImage: member.user.haveImage
            })
        });
        return new ServerMessages(false, 'Banda obtenida con exito', dataBand);
      }
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async findUserByUsername(search): Promise<ServerMessages> {
    try {
      let user = await this.userRepository.findOne<User>({
        attributes: [
          'idUser',
          'name',
          'type',
          'role',
          'description',
          'haveImage',
        ],
        where: { username: search.username },
        include: [{
          model: UserHistory,
          attributes: ['bandName','description', 'date'],
        }],
      });

      return new ServerMessages(false, 'Sucess', user);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async findUserProfileById(idUser): Promise<ServerMessages> {
    try {
      let user = await this.userRepository.findOne<User>({
        attributes: [
          'idUser',
          'name',
          'type',
          'role',
          'description',
          'haveImage',
        ],
        where: { idUser: idUser },
        include: [{
          model: UserHistory,
          attributes: ['bandName','description', 'date'],
        }],
      });
      if(user == null || user == undefined){
        return new ServerMessages(true, 'El perfil no existe', {});
      }else{
        return new ServerMessages(false, 'Perfil del artista obtenido con exito', user);
      }
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }
}
