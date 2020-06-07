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
import { Setlist } from '../../models/setlists.entity';
import { Tag } from '../../models/tags.entity';
import { RepertoriesDataDto } from './dto/repertoriesDto.dto';

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

      const bandId = song.idBand;
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
    const today = new Date();
    //encontrar todas la bands que pertenece el usuario
    let eventsOfMember : RepertoriesDataDto[] = [];
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
            include : [{
              model : Setlist,
              as : 'setlist',
              include: [{
                model : Set,
                as : 'sets',
                include: [{
                  model: Song,
                  as: 'songs',
                  /* attributes: ['idSong'] */
                }]
              }]
            },{
              model : Band,
              as : 'band',
              include : [{
                model: User,
                as: 'manager'
              }]
            },{
              model : Tag,
              as : 'tag'
            }],
          }),
        ),
      )
        .then(allEvents => {
          allEvents.forEach(eventsPerBand => {
            eventsPerBand.forEach((event : any) => {
              let dayOfEvent = new Date(event.date);
              if (dayOfEvent >= today) {
                eventsOfMember.push(event);
              }
            });
          });
        })
        .then(
          //regresar eventos
          () => {
            eventsOfMember = eventsOfMember.map((event: any) => {
              let eventFixed : any = {
                idLiveEvent: event.idLiveEvent,
                name: event.name,
                location: event.location,
                tour: event.tour,
                date: event.date,
                place: event.place,
                nameTag: event.tag.name,
                nameBand: event.band.name,
                nameManager: event.band.manager.name,
                setlist : null
              }
              if(event.setlist != null){
                eventFixed.setlist = {
                  idSetList : event.setlist.idSetlist, 
                  nameRepertori : event.setlist.name,
                  sets : event.setlist.sets
                }
                eventFixed.setlist.sets = eventFixed.setlist.sets.map((set: Set) => {
                  set.songs = set.songs.map((song: Song) => {
                    return Object.assign({
                      idSong: song.idSong,
                      name: song.name,
                      artist: song.artist,
                      lyric: song.lyric,
                      chordsGuitar: song.chordsGuitar,
                      tabGuitar: song.tabGuitar,
                      chordsBass: song.chordsBass,
                      tabBass: song.tabBass,
                      chordsPiano: song.chordsPiano,
                      tabPiano: song.tabPiano,
                      tempo: song.tempo,
                    })
                  });

                  return Object.assign({
                    idSet: set.idSet,
                    name: set.name,
                    haveImage: set.haveImage,
                    numberSongs: set.songs.length,
                    songs: set.songs
                  })
                });
              }
              return Object.assign(eventFixed)
            });
            return new ServerMessages(false, 'Eventos adquiridos con exito', eventsOfMember)
          }
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

      return new ServerMessages(
        false, 'Historial del usuario ' + userId + ' obtenido con exito', history);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'A ocurrido un error obteniendo el historial', error);
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

      const bandId = set.idBand;
      const bandMember = await this.bandMemberRepository.findOne({
        where: {
          idBand: bandId,
          [Op.and]: [{ idUser: userId }],
        },
      });

      if (bandMember == null) {
        return new ServerMessages(false, 'You dont belong to this band', {});
      } else if (set == null) {
        return new ServerMessages(false, 'Not found', {});
      } else {
        return new ServerMessages(false, 'Success', set);
      }
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async findAllSetsByUserId(userId): Promise<ServerMessages> {
    const setsOfMember = [];
    try {
      //encontrar todas la bands que pertenece el usuario
      const bands = await this.bandMemberRepository.findAll({
        attributes: ['idBand'],
        where: { idUser: userId },
      });

      return Promise.all(
        bands.map(band =>
          this.setRepository.findAll({
            where: { idBand: band.idBand },
          }),
        ),
      )
        .then(allSets => {
          allSets.forEach(setsPerBand => {
            setsPerBand.forEach(set => {
              setsOfMember.push(set);
            });
          });
        })
        .then(
          //regresar eventos
          () => new ServerMessages(false, 'Songs not saved', setsOfMember),
        );
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async counterOfSongsBySetId(setId): Promise<ServerMessages> {
    let counter = 0;
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

      if (set == null) {
        return new ServerMessages(false, 'Number of Songs of Set ' + setId, {});
      } else {
        counter = set.songs.length;
        return new ServerMessages(
          false,
          'Number of Songs of Set ' + setId,
          counter,
        );
      }
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }
}
