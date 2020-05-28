import { Injectable, Inject } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { LiveEvent } from '../../models/live-events.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Genre } from '../../models/genres.entity';
import { BandMember } from '../../models/band-members.entity';
import { Song } from '../../models/songs.entity';
import { User } from '../../models/users.entity';
import { Op } from 'sequelize';
import { LiveDesigner } from '../../models/live-designers.entity';

@Injectable()
export class ManagerService {
  constructor(
    @Inject('BandRepository')
    private readonly bandRepository: typeof Band,
    @Inject('LiveEventRepository')
    private readonly liveEventRepository: typeof LiveEvent,
    @Inject('BandMemberRepository')
    private readonly bandMemberRepository: typeof BandMember,
    @Inject('BandMemberRepository')
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
      console.log(error);
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

  async addBandMemberByUsername(
    managerId: number,
    idBand: number,
    username: string,
    isLiveDesigner: string,
  ): Promise<ServerMessages> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: username,
          type: { [Op.eq]: 0 },
        },
      });

      const idUser = user.idUser;

      if (isLiveDesigner == 'true') {
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
    idBand: number,
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
