import { Injectable, Inject } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { LiveEvent } from '../../models/live-events.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Genre } from '../../models/genres.entity';
import { BandMember } from '../../models/band-members.entity';
import { Song } from '../../models/songs.entity';
import { User } from '../../models/users.entity';
import { Op } from 'sequelize';
import { BandGenre } from '../../models/band-genres.entity';
import { Set } from '../../models/sets.entity';
import { UserHistory } from '../../models/user-history.entity';
import { LiveDesigner } from '../../models/live-designers.entity';

@Injectable()
export class BandMembersService {
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
    @Inject('UserHistoryRepository')
    private readonly userHistoryRepository: typeof UserHistory,
    @Inject('SetRepository')
    private readonly setRepository: typeof Set,
    @Inject('SongRepository')
    private readonly songRepository: typeof Song,
  ) {}

  //find song by id, member and song belongs to same band id
  async findSongById(songId: number, userId): Promise<ServerMessages> {
    try {
      const song = await this.songRepository.findOne({
        where: { idSong: songId },
      });
      if (song == null) {
        return new ServerMessages(false, 'Song id ' + songId, {});
      }

      let bandId = song.idBand;
      console.log(bandId);
      const bandMember = await this.bandMemberRepository.findOne({
        where: {
          idBand: bandId,
          [Op.and]: [{ idUser: userId }],
        },
      });

      if (bandMember != null) {
        return new ServerMessages(false, 'Song id ' + songId, song);
      } else {
        return new ServerMessages(
          false,
          'You dont belong to the band to see this song',
          {},
        );
      }
    } catch (error) {
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async findAllEventsByUserId(userId): Promise<ServerMessages> {
    //encontrar todas la bands que pertenece el usuario
    const eventsOfMember = [];
    try {
      const bands = await this.bandMemberRepository.findAll({
        attributes: ['idBand'],
        where: { idUser: userId },
      });

      //encontrar todos los eventos por banda
      return Promise.all(
        bands.map(band =>
          this.liveEventRepository.findAll({
            where: { idBand: band.idBand },
          }),
        ),
      )
        .then(allEvents => {
          allEvents.forEach(eventsPerBand => {
            eventsPerBand.forEach(event => {
              eventsOfMember.push(event);
            });
          });
        })
        .then(
          //regresar eventos
          () => new ServerMessages(false, 'Songs not saved', eventsOfMember),
        );
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async getBandMemberHistory(userId): Promise<ServerMessages> {
    try {
      const history = await this.userHistoryRepository.findAll({
        where: { idUser: userId },
      });

      return new ServerMessages(true, 'History of user ' + userId, history);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async findSetById(setId, userId): Promise<ServerMessages> {
    try {
      const set = await this.setRepository.findOne({
        where: { idSet: setId },
        include: [
          {
            model: Song,
            as: 'songs',
          },
        ],
      });

      return new ServerMessages(false, 'Success', set);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }
}
