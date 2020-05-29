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
import { BandGenre } from '../../models/band-genres.entity';
import { SetSong } from '../../models/set-songs.entity';
import { Set } from '../../models/sets.entity';
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
    @Inject('UserRepository')
    private readonly userRepository: typeof User,
    @Inject('SetRepository')
    private readonly setRepository: typeof Set,
  ) { }

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
      let allBandData: BandDto = new BandDto();

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
          }, {
            model: Genre,
            as: 'genres',
          }, {
            model: LiveDesigner,
            as: 'liveDesigners',
          }, {
            model: Set,
            as: 'sets'
          },
        ],
      });

      allBandData.idBand = band.idBand;
      allBandData.name = band.name;
      allBandData.description = band.description;
      allBandData.urlLogo = band.urlLogo;
      allBandData.idUserManager = band.idUserManager;
      allBandData.genres = band.genres;

      band.bandMembers.forEach((member) => {
        allBandData.bandMembers.push({
          idMember: member.idMember,
          idUser: member.idUser,
          role: member.user.role,
          name: member.user.name,
          haveImage: member.user.haveImage
        });
      });

      band.liveDesigners.forEach((liveDesigners) => {
        allBandData.bandLiveDesigners.push(liveDesigners.idUserDesigner)
      });

      band.sets.forEach((set) => {
        allBandData.sets.push({ idSet: set.idSet, name: set.name, urlImage: set.urlImage, description: set.description })
      });
      //return new ServerMessages(false, 'Datos de la banda cargados', await this.setRepository.findAll());
      return new ServerMessages(false, 'Datos de la banda cargados', allBandData);
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
        if (newBandData.urlLogo.length > 0) {
          newBand = await newBand.update({ urlLogo: 'band-image/' + newBand.idBand });
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

  async deleteBandById(managerId: number, idBand: number): Promise<ServerMessages> {
    try {
      const bandForDelete : Band = await this.bandRepository.findOne({
        where: { idBand: idBand, idUserManager: managerId },
      });

      await this.bandGenreRepository.destroy({
        where: { idBand: bandForDelete.idBand },
      });

      //Eliminar todos los live designes de la banda
      await this.liveDesignerRepository.destroy({
        where: { idBand: bandForDelete.idBand },
      });
      //Eliminar todos los musicos de la banda
      await this.bandMemberRepository.destroy({
        where: { idBand: bandForDelete.idBand },
      });

      bandForDelete.destroy();
      return new ServerMessages(false, 'Exito eliminando la banda', bandForDelete);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'A ocurrido un error eliminando la banda', error);
    }
  }

  async updateBand(managerId: number, updatedBandData: BandDto): Promise<ServerMessages> {
    if (
      updatedBandData.idBand == null ||
      updatedBandData.idBand == undefined ||
      !updatedBandData.name ||
      !updatedBandData.description ||
      updatedBandData.idUserManager == null ||
      !updatedBandData.bandMembers ||
      !updatedBandData.genres ||
      !updatedBandData.sets ||
      updatedBandData.bandMembers.length == 0 ||
      updatedBandData.genres.length == 0
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    } else if (updatedBandData.name.length < 8) {
      return new ServerMessages(
        true,
        'El nombre dela banda debe contener almenos 8 caracteres.',
        {},
      );
    } else if (updatedBandData.description.length > 999) {
      return new ServerMessages(
        true,
        'Descripcion muy larga maximo de 1000.',
        {},
      );
    }

    var bandFinded: Band = await this.bandRepository.findOne<Band>({
      where: { idBand: updatedBandData.idBand.toString(), idUserManager: managerId.toString() },
    });

    if (bandFinded == undefined || bandFinded == null) {
      return new ServerMessages(true, 'Banda no disponible', new BandDto());
    } else {
      try {
        var newData = {
          name: updatedBandData.name,
          urlLogo: "",
          description: updatedBandData.description,
          idUserManager: updatedBandData.idUserManager
        };
        await bandFinded.update(newData);
        //Esto sirve por si se subira la imagen ya se setea de una vez
        if (updatedBandData.urlLogo.length > 0) {
          await bandFinded.update({ urlLogo: 'band-image/' + bandFinded.idBand });
        }

        //Eliminar todos los miebros de la banda
        let actualMembers: BandMember[] = await this.bandMemberRepository.findAll({
          where: { idBand: bandFinded.idBand },
        });
        let fixActual: any[] = Array.from(actualMembers);
        actualMembers.forEach(async actualMember => {
          let finded = updatedBandData.bandMembers.find((element) => {
            return element.idUser == actualMember.idUser;
          });

          if (finded == null && finded == undefined) {
            await actualMember.destroy();
          } else {
            //console.log("no se borro" + finded.idUser);
          }
        });

        //Se crean los nuevos miembros de la banda
        updatedBandData.bandMembers.forEach(async newMember => {
          let finded = fixActual.find((element) => {
            return element.idUser == newMember.idUser;
          });
          var newData = {
            idUser: newMember.idMember,
            idBand: bandFinded.idBand,
          };
          if (finded == null && finded == undefined) {
            await this.bandMemberRepository.create<BandMember>(newData, {});
          } else {
            //console.log("no se creo" + finded.idUser);
          }
        });

        //Eliminar todos los generos de la banda
        await this.bandGenreRepository.destroy({
          where: { idBand: bandFinded.idBand },
        });


        //Se crean los nuevos generos de la banda
        updatedBandData.genres.forEach(async newGenre => {
          var newData = {
            idGenre: newGenre.idGenre,
            idBand: bandFinded.idBand,
          };
          await this.bandGenreRepository.create<BandGenre>(newData, {});
        });

        //Eliminar todos los live designer de la banda
        let actualDesigner: LiveDesigner[] = await this.liveDesignerRepository.findAll({
          where: { idBand: bandFinded.idBand },
        });
        //console.log(actualDesigner);
        let fixActualDesigner: any[] = Array.from(actualDesigner);
        actualDesigner.forEach(async actualDesigner => {
          let finded = updatedBandData.bandLiveDesigners.find((element) => {
            return element == actualDesigner.idUserDesigner;
          });
          //console.log("entro");
          
          if (finded == null && finded == undefined) {
            //console.log("se borro" + actualDesigner.idUserDesigner);
            await actualDesigner.destroy();
          } else {
            //console.log("no se borro" + finded);
          }
        });

        //Se crean los nuevos live designers de la banda
        updatedBandData.bandLiveDesigners.forEach(async newDesigner => {
          let finded = fixActualDesigner.find((element) => {
            return element.idUserDesigner == newDesigner;
          });
          var newData = {
            idUserDesigner: newDesigner,
            idBand: bandFinded.idBand,
          };
          if (finded == null && finded == undefined) {
            await this.liveDesignerRepository.create<LiveDesigner>(newData, {});
          } else {
            //console.log("no se creo" + finded.idUser);
          }
        });
        return new ServerMessages(false, 'Banda actualizada con exito', updatedBandData);
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
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
