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
import { SetDto } from './dto/set.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { SetSong } from '../../models/set-songs.entity';

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
    @Inject('SetSongRepository')
    private readonly setSongRepository: typeof SetSong,
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

  async findSetsOfLedByLedId(idUser: number): Promise<ServerMessages> {
    try {
      /*const setLists : any[]  = await this.liveDesignerRepository.findAll({
        attributes: [
          'idLiveDesigner',
          'idBand',
          'idUserDesigner',
        ],
        where: { idUserDesigner: idUser },
        include: [{
          model: Band,
          as: 'band',
          include: [{
            model: Set,
            as: 'sets',
            include:[{
              model: SetSong,
              as: 'setSongs',
              include: [{
                model : Song,
                as: 'song'
              }]
            }]
          }],
        },
        ],
      }) .map((liveDesigner: LiveDesigner) => {
        return Object.assign(
           liveDesigner.band.sets
        )
      }) */;



      /* let allSets : any[] = [];
      setLists.forEach((setListBand : any)=>{
        setListBand.forEach((set : any) => {
          allSets.push(set);
        });
      });

      allSets.map((set: any) => {
        return Object.assign({
          idSet : set.idSet,
          name : set.name,
          description : set.description,
          haveImage : set.haveImage,
          idBand : set.idBand,
          songs : set.set
        })
      }); */

      const setLists: any[] = await this.setRepository.findAll({
        attributes: [
          'idSet',
          'name',
          'description',
          'haveImage',
          'idBand'
        ],
        /* where: { idUserDesigner: idUser }, */
        include: [{
          model: Band,
          as: 'band',
          include: [{
            model: LiveDesigner,
            as: 'liveDesigners',
            where: { idUserDesigner: idUser }
          }],
        }],
      }).map(async (set: any) => {
        let songs: any[] = [];
        if (set.band != null) {
          songs = await this.setSongRepository.findAll({
            where: { idSet: set.idSet },
            include: [{
              model: Song,
              as: 'song'
            }]
          }).map(async (song: any) => {
            return Object.assign({
              idSong: song.idSong,
              name: song.song.name
            });
          });
        }
        return Object.assign({
          idSet: set.idSet,
          name: set.name,
          description: set.description,
          haveImage: set.haveImage,
          idBand: set.idBand,
          songs: songs,
          band: set.band
        });
      });
      let response: any[] = [];
      setLists.forEach((set) => {
        if (set.band != null) {
          response.push({
            idSet: set.idSet,
            name: set.name,
            description: set.description,
            haveImage: set.haveImage,
            idBand: set.idBand,
            songs: set.songs
          });
        }
      });

      return new ServerMessages(false, 'Listas de sets de las bandas del live designer obtenidas con exito', response);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'A ocurrido un error obteniendo las listas', error);
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
          nameTag: song.tag.name
        })
      });

      return new ServerMessages(false, 'Lista de canciones obtenida con exito', songs);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'A ocurrido un error', error);
    }
  }

  async findSongsByIdSong(idSong: number): Promise<ServerMessages> {
    try {
      const song = await this.songRepository.findOne({
        where: { idSong: idSong },
        include: [{
          model: Tag,
          as: 'tag',
        },
        ],
      });

      let dataSong: any = {};
      dataSong.idSong = song.idSong;
      dataSong.name = song.name;
      dataSong.artist = song.artist;
      dataSong.lyric = song.lyric;
      dataSong.chordsGuitar = song.chordsGuitar;
      dataSong.tabGuitar = song.tabGuitar;
      dataSong.chordsBass = song.chordsBass;
      dataSong.tabBass = song.tabBass;
      dataSong.chordsPiano = song.chordsPiano;
      dataSong.tabPiano = song.tabPiano;
      dataSong.tempo = song.tempo;
      dataSong.idBand = song.idBand;
      dataSong.idTag = song.idTag;
      dataSong.nameTag = song.tag.name;
      return new ServerMessages(false, 'Cancion obtenida con exito', dataSong);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'A ocurrido un error obteniendo la cancion', error);
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

  async updateSong(newSongData: SongDto): Promise<ServerMessages> {
    if (
      newSongData.idSong == null ||
      newSongData.idSong == undefined ||
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
      where: { idSong: newSongData.idSong.toString() }
    });

    if (songFinded) {
      //Cosas por hacer si se encuentra la cancion
      songFinded.name = newSongData.name;
      songFinded.artist = newSongData.artist;
      songFinded.lyric = newSongData.lyric;
      songFinded.chordsGuitar = newSongData.chordsGuitar;
      songFinded.tabGuitar = newSongData.tabGuitar;
      songFinded.chordsBass = newSongData.chordsBass;
      songFinded.tabBass = newSongData.tabBass;
      songFinded.chordsPiano = newSongData.chordsPiano;
      songFinded.tabPiano = newSongData.tabPiano;
      songFinded.tempo = newSongData.tempo;
      songFinded.idBand = newSongData.idBand;
      songFinded.idTag = newSongData.idTag;

      await songFinded.save();
      return new ServerMessages(false, 'Cancion actualizada con exito', songFinded);
    } else {
      try {
        return new ServerMessages(true, 'La cancion no esta disponible existe.', {});
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
    }
  }

  async createSet(newSetData: SetDto): Promise<ServerMessages> {
    if (
      newSetData.name == null ||
      newSetData.name == undefined ||
      newSetData.description == null ||
      newSetData.description == undefined ||
      newSetData.haveImage == null ||
      newSetData.haveImage == undefined ||
      newSetData.idBand == null ||
      newSetData.idBand == undefined ||
      newSetData.songs == null
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    } else if (newSetData.name.length < 1) {
      return new ServerMessages(
        true,
        'El nombre de la lista debe contener almenos 1 caracteres.',
        {},
      );
    } else if (newSetData.songs.length < 1) {
      return new ServerMessages(
        true,
        'La cancion debe contener almenos una cancion.',
        {},
      );
    }

    var listFinded = await this.setRepository.findOne<Set>({
      attributes: [
        'idSet',
        'name',
        'idBand'
      ],
      where: { name: newSetData.name.toString(), idBand: newSetData.idBand.toString() },
    });

    if (listFinded) {
      return new ServerMessages(true, 'Existe otra lista con el mismo nombre.', {});
    } else {
      try {
        var newList: Set = await this.setRepository.create<Set>(newSetData, {});
        //Se guardan las nuevas canciones de la lista
        newSetData.songs.forEach(async (newSong) => {
          var savedSong: SetSong = await this.setSongRepository.create<SetSong>({ idSet: newList.idSet, idSong: newSong.idSong }, {});
        });
        return new ServerMessages(false, 'Lista creada con exito', newList);
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error guardando la lista', error);
      }
    }
  }

  async updateSet(newSetData: SetDto): Promise<ServerMessages> {
    if (
      newSetData.idSet == null ||
      newSetData.idSet == undefined ||
      newSetData.name == null ||
      newSetData.name == undefined ||
      newSetData.description == null ||
      newSetData.description == undefined ||
      newSetData.haveImage == null ||
      newSetData.haveImage == undefined ||
      newSetData.idBand == null ||
      newSetData.idBand == undefined ||
      newSetData.songs == null
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    } else if (newSetData.name.length < 1) {
      return new ServerMessages(
        true,
        'El nombre de la lista debe contener almenos 1 caracteres.',
        {},
      );
    } else if (newSetData.songs.length < 1) {
      return new ServerMessages(
        true,
        'La cancion debe contener almenos una cancion.',
        {},
      );
    }

    var listFindedForUpdate = await this.setRepository.findOne<Set>({
      where: { idSet: newSetData.idSet.toString() },
    });

    if (listFindedForUpdate) {
      try {
        listFindedForUpdate.name = newSetData.name;
        listFindedForUpdate.description = newSetData.description;
        listFindedForUpdate.haveImage = newSetData.haveImage;
        listFindedForUpdate.idBand = newSetData.idBand;
        await listFindedForUpdate.save();
        
        //Se buscan las canciones actuales de la lista
        let actualSongs: SetSong[] = await this.setSongRepository.findAll(
          {
              where: { idSet: newSetData.idSet.toString() },
              include: [
                  {
                      model: Song,
                      as: 'song',
                  },
              ],
          },
      );
      //Eliminar todas las canciones de la lista que no estan en la nueva lista
      let fixActual: any[] = Array.from(actualSongs);
      actualSongs.forEach(async actualSong => {
          let finded = newSetData.songs.find(song => {
              return song.idSong == actualSong.idSong;
          });
          if (finded == null && finded == undefined) {
              await actualSong.destroy();
          } else {
            //console.log("no se borro" + finded.idSong);
          }
      });

      //Se crean las nuevas canciones de la lista que no estan actualmente registradas
      newSetData.songs.forEach(async newSong => {
          let finded = actualSongs.find(element => {
              return element.idSong == newSong.idSong;
          });
          if (finded == null && finded == undefined) {
            let newData = {
              idSet: newSetData.idSet,
              idSong: newSong.idSong,
            };
            await this.setSongRepository.create<SetSong>(newData, {});
          } else {
              //console.log("no se creo" + finded.idSong);
          }
      });

        return new ServerMessages(false, 'Lista actualizada con exito', listFindedForUpdate);
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error guardando la lista', error);
      }
    } else {
      return new ServerMessages(true, 'La lista no existe.', {});
    }
  }
}
