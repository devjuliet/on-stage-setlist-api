import { Injectable, Inject } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { LiveEvent } from '../../models/live-events.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Genre } from '../../models/genres.entity';
import { BandGenre } from '../../models/band-genres.entity';
import { BandMember } from '../../models/band-members.entity';
import { Song } from '../../models/songs.entity';
import { User } from '../../models/users.entity';

@Injectable()
export class ManagerService {
  constructor(
    @Inject('BandRepository')
    private readonly bandRepository: typeof Band,
    @Inject('LiveEventRepository')
    private readonly liveEventRepository: typeof LiveEvent,
    @Inject('BandGenreRepository')
    private readonly bandGenreRepository: typeof BandGenre,
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
        where: { idBand: id },
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
}
