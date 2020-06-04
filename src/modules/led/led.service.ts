import { Injectable, Inject } from '@nestjs/common';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Band } from '../../models/bands.entity';
import { LiveDesigner } from '../../models/live-designers.entity';
import { BandMember } from '../../models/band-members.entity';
import { LiveEvent } from '../../models/live-events.entity';
import { BandGenre } from '../../models/band-genres.entity';
import { User } from '../../models/users.entity';
import { UserHistory } from '../../models/user-history.entity';
import { Set } from '../../models/sets.entity';
import { Genre } from '../../models/genres.entity';
import { SongDto } from './dto/song.dto';
import { Song } from '../../models/songs.entity';
import { Tag } from '../../models/tags.entity';

@Injectable()
export class LedService {
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
    @Inject('SongRepository')
    private readonly songRepository: typeof Song,
    @Inject('SetRepository')
    private readonly setRepository: typeof Set,
  ) { }


  async findOfLedBandsByLedId(id: number): Promise<ServerMessages> {
    try {
      const bands = await this.liveDesignerRepository.findAll({
        attributes: [
          'idLiveDesigner',
          'idBand',
          'idUserDesigner',
        ],
        where: { idUserDesigner: id },
        include: [{
          model: Band,
          as: 'band',
          include: [{
            model: User,
            as: 'manager',
          }],
        },
        ],
      }).map((liveDesigner: LiveDesigner) => {
        return Object.assign({
          idBand: liveDesigner.idBand,
          name: liveDesigner.band.name,
          urlLogo: liveDesigner.band.urlLogo,
          description: liveDesigner.band.description,
          managerName: liveDesigner.band.manager.name
        })
      });

      return new ServerMessages(false, 'Lista de bandas del live designer obtenidas con exito', bands);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'A ocurrido un error', error);
    }
  }

  async findSongsBandByIdBandId(idBand: number): Promise<ServerMessages> {
    try {
      const songs = await this.songRepository.findAll({
        where: { idBand: idBand },
        include: [{
          model: Tag,
          as: 'tag',
        },
        ],
      }).map((song: Song) => {
        return Object.assign({
          idSong: song.idSong,
          name: song.name,
          artist: song.artist,
          lyric: song.lyric,
          tempo: song.tempo,
          nameTag : song.tag.name
        })
      });

      return new ServerMessages(false, 'Lista de canciones obtenida con exito', songs);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'A ocurrido un error', error);
    }
  }

  async createSong(newSongData: SongDto): Promise<ServerMessages> {
    if (
      newSongData.name == null ||
      newSongData.name == undefined ||
      newSongData.artist == null ||
      newSongData.artist == undefined ||
      newSongData.lyric == null ||
      newSongData.lyric == undefined ||
      newSongData.chordsGuitar == null ||
      newSongData.chordsGuitar == undefined ||
      newSongData.tabGuitar == null ||
      newSongData.tabGuitar == undefined ||
      newSongData.chordsBass == null ||
      newSongData.chordsBass == undefined ||
      newSongData.tabBass == null ||
      newSongData.tabBass == undefined ||
      newSongData.chordsPiano == null ||
      newSongData.chordsPiano == undefined ||
      newSongData.tabPiano == null ||
      newSongData.tabPiano == undefined ||
      newSongData.tempo == null ||
      newSongData.tempo == undefined ||
      newSongData.idBand == null ||
      newSongData.idBand == undefined ||
      newSongData.idTag == null ||
      newSongData.idTag == undefined
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    } else if (newSongData.name.length < 1) {
      return new ServerMessages(
        true,
        'El nombre de la cancion debe contener almenos 1 caracteres.',
        {},
      );
    } else if (newSongData.lyric.length > 20000) {
      return new ServerMessages(
        true,
        'Letra de la cancion muy larga maximo de 20,000 caracteres.',
        {},
      );
    }

    var songFinded = await this.songRepository.findOne<Song>({
      attributes: [
        'idSong',
        'name',
        'idBand'
      ],
      where: { name: newSongData.name.toString(), idBand: newSongData.idBand.toString() },
    });

    if (songFinded) {
      return new ServerMessages(true, 'Cancion actualmente en la lista de canciones de la banda.', {});
    } else {
      try {
        var newSong: Song = await this.songRepository.create<Song>(newSongData, {});
        return new ServerMessages(false, 'Cancion creada con exito', newSong);
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
    }
  }
}
