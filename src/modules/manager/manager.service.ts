import { Injectable, Inject } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { LiveEvent } from '../../models/live-events.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Genre } from '../../models/genres.entity';
import { BandMember } from '../../models/band-members.entity';
import { Song } from '../../models/songs.entity';
import { User } from '../../models/users.entity';
import { BandDto } from './dto/band.dto';
import { Op } from 'sequelize';
import { LiveDesigner } from '../../models/live-designers.entity';

@Injectable()
export class ManagerService {
  constructor(
    @Inject('BandRepository')
    private readonly bandRepository: typeof Band,
    @Inject('LiveDesignerRepository')
    private readonly liveDesignerRepository: typeof LiveDesigner,
    @Inject('BandMemberRepository')
    private readonly bandMemberRepository: typeof BandMember,
    @Inject('LiveEventRepository')
    private readonly liveEventRepository: typeof LiveEvent,
    @Inject('BandGenreRepository')
    private readonly bandGenreRepository: typeof BandGenre,
    @Inject('BandMemberRepository')
    private readonly bandMemberRepository: typeof BandMember,
    @Inject('LiveDesignerRepository')
    private readonly liveDesignerRepository: typeof LiveDesigner,
    @Inject('UserRepository')
    private readonly userRepository: typeof User,
  ) {}

  async findEventsByManagerId(id: number): Promise<ServerMessages> {
    try {
      const events = await this.liveEventRepository.findAll({
        include: [
          {
            model: Band,
            as: 'band',
            where: { idUserManager: id },
          },
        ],
      });

      return new ServerMessages(false, 'Success', events);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async findBandsByManagerId(id: number): Promise<ServerMessages> {
    try {
      const bands = await this.bandRepository.findAll({
        attributes: [
          'idBand',
          'name',
          'description',
          'urlLogo',
        ],
        where: { idUserManager: id },
        include: [
          {
            model: Genre,
            as: 'genres',
          },
        ],
      });

      return new ServerMessages(false, 'Success', bands);
    } catch (error) {
      //console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async findBandByIdAndByManagerId(
    managerId: number,
    id: number,
  ): Promise<ServerMessages> {
    try {
      const band = await this.bandRepository.findOne({
        where: {
          idBand: id,
          [Op.and]: [{ idUserManager: managerId }],
        },
        include: [
          {
            model: BandMember,
            as: 'bandMembers',
            include: [
              {
                model: User,
                as: 'user',
              },
            ],
          },
          {
            model: Song,
            as: 'songs',
          },
        ],
      });

      return new ServerMessages(false, 'Success', band);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async createBand(newBandData: BandDto): Promise<ServerMessages> {
    if (
      !newBandData.name ||
      !newBandData.description ||
      newBandData.idUserManager == null ||
      !newBandData.bandMembers ||
      !newBandData.genres ||
      !newBandData.sets ||
      newBandData.bandMembers.length == 0 ||
      newBandData.genres.length == 0
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    } else if (newBandData.name.length < 8) {
      return new ServerMessages(
        true,
        'El nombre dela banda debe contener almenos 8 caracteres.',
        {},
      );
    } else if (newBandData.description.length > 999) {
      return new ServerMessages(
        true,
        'Descripcion muy larga maximo de 1000.',
        {},
      );
    }

    var bandFinded = await this.bandRepository.findOne<Band>({
      attributes: [
        'idBand',
        'name',
        'idUserManager'
      ],
      where: { name: newBandData.name.toString(), idUserManager: newBandData.idUserManager.toString() },
    });

    if (bandFinded) {
      return new ServerMessages(true, 'Banda actualmente registrada por el manager.', {});
    } else {
      try {
        var newData = {
          name: newBandData.name,
          urlLogo: "",
          description: newBandData.description,
          idUserManager: newBandData.idUserManager
        };
        var newBand: Band = await this.bandRepository.create<Band>(newData, {});
        //Esto sirve por si se subira la imagen ya se setea de una vez
        if(newBandData.urlLogo.length > 0){
          newBand = await newBand.update({ urlLogo : 'band-image/'+newBand.idBand});
        }
         
        //Se crean nuevos generos de la banda
        newBandData.genres.forEach(async newGenre => {
          var newData = {
            idGenre: newGenre.idGenre,
            idBand: newBand.idBand,
          };
          await this.bandGenreRepository.create<BandGenre>(newData, {});
        });
        //Se crean nuevos miembros de la banda
        newBandData.bandMembers.forEach(async newMember => {
          var newData = {
            idUser: newMember.idMember,
            idBand: newBand.idBand,
          };
          await this.bandMemberRepository.create<BandMember>(newData, {});
        });
        //Se crean nuevos live designer de la banda
        newBandData.bandLiveDesigners.forEach(async newLiveDesigner => {
          var newDataLiveDesigner = {
            idUserDesigner: newLiveDesigner,
            idBand: newBand.idBand,
          };
          await this.liveDesignerRepository.create<LiveDesigner>(newDataLiveDesigner, {});
        });
        return new ServerMessages(false, 'Banda creada con exito', newBand);
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
    }
  }

  /* async updateBand(updatedBand: UpdatedBandDto): Promise<ServerMessages> {
    if (
      !updatedBand.name ||
      !updatedBand.description ||
      !updatedBand.idUserManager ||
      !updatedBand.bandMembers ||
      !updatedBand.genres ||
      !updatedBand.urlLogo ||
      !updatedBand.sets ||
      updatedBand.bandMembers.length == 0 ||
      updatedBand.genres.length == 0
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    } else if (updatedBand.name.length < 8) {
      return new ServerMessages(
        true,
        'El nombre de usuario debe contener almenos 8 caracteres.',
        {},
      );
    } else if (updatedBand.description.length > 999) {
      return new ServerMessages(
        true,
        'Descripcion muy larga maximo de 1000.',
        {},
      );
    }
    //Con esto se evitan incidencias en los nombres
    updatedUser.username = updatedUser.username.toLowerCase();
    updatedUser.email = updatedUser.email.toLowerCase();

    var user = await this.findOneByUsername(updatedUser.username.toString());
    //TO DO - Falta verificar que el correo y el usuario no lo tenga otro usuario
    try {
      user.name = updatedUser.name.toString();
      user.email = updatedUser.email.toString();
      user.haveImage = updatedUser.haveImage;
      user.username = updatedUser.username.toString();
      user.role = updatedUser.role;
      user.description = updatedUser.description;
      user.save();
      return new ServerMessages(false, 'Usuario actualizado con exito', user);
    } catch (error) {
      return new ServerMessages(true, 'A ocurrido un error', error);
    }
  } */
  async addBandMemberByUsername(
    managerId: number,
    idBand: number,
    username,
    isLiveDesigner,
  ): Promise<ServerMessages> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: username.username,
          type: { [Op.eq]: 0 },
        },
      });

      const idUser = user.idUser;

      if (isLiveDesigner.livedesigner == 'true') {
        await this.liveDesignerRepository.create({
          idUserDesigner: idUser,
          idBand: idBand,
        });
      }

      const bandMember = await this.bandMemberRepository.create({
        idUser: idUser,
        idBand: idBand,
      });

      return new ServerMessages(false, 'Success', bandMember);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async deleteBandById(managerId: number, id: number): Promise<ServerMessages> {
    try {
      const band = await this.bandRepository.destroy({
        where: { idBand: id, [Op.and]: [{ idUserManager: managerId }] },
      });
      return new ServerMessages(false, 'Success', band);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async updateBand(
    managerId: number,
    idBand: number,
    band: Band,
  ): Promise<ServerMessages> {
    try {
      const newBand = await this.bandRepository.update(band, {
        where: { idBand: idBand, [Op.and]: [{ idUserManager: managerId }] },
      });
      return new ServerMessages(false, 'Success', newBand);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async createLiveEvent(
    idManager: number,
    event: LiveEvent,
  ): Promise<ServerMessages> {
    try {
      const newEvent = await this.liveEventRepository.create(event);
      return new ServerMessages(false, 'Success', newEvent);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }
}
