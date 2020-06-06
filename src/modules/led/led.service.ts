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
import { Setlist } from '../../models/setlists.entity';
import { RepertorieDto } from './dto/repertorie.dto';
import { SetlistSet } from '../../models/setlist-sets.entity';

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
    @Inject('SetlistRepository')
    private readonly setlistRepository: typeof Setlist,
    @Inject('SetlistSetRepository')
    private readonly setlistSetRepository: typeof SetlistSet,
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

  async findLiveEventsOfBandsAvailableForRepertories(idBand: number): Promise<ServerMessages> {
    try {
      const events: any[] = await this.liveEventRepository.findAll({
        attributes: ['idLiveEvent', 'name'],
        where: { idBand: idBand },
        include: [{
          model: Setlist,
          as: 'setlist'
        }]
      });

      let dataEvents = [];

      events.forEach((event) => {
        if (event.setlist == null) {
          dataEvents.push({ idLiveEvent: event.idLiveEvent, name: event.name });
        }
      })

      const sets: any[] = await this.setRepository.findAll({
        where: { idBand: idBand },
        include: [{
          model: Song,
          as: 'songs',
          attributes: ['idSong']
        }]
      }).map((set: Set) => {
        return Object.assign({
          idSet: set.idSet,
          name: set.name,
          haveImage: set.haveImage,
          numberSongs: set.songs.length,
          selected: false
        })
      });;

      let response = { events: dataEvents, sets: sets };
      return new ServerMessages(false, 'Eventos sin repositorios y sets de la banda obtenidas con exito', response);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'A ocurrido un error obteniendo las listas', error);
    }
  }

  async createRepertorie(newRepertorieData: RepertorieDto): Promise<ServerMessages> {
    if (
      newRepertorieData.name == null ||
      newRepertorieData.name == undefined ||
      newRepertorieData.event == null ||
      newRepertorieData.event == undefined ||
      newRepertorieData.band == null ||
      newRepertorieData.band == undefined ||
      newRepertorieData.tag == null ||
      newRepertorieData.tag == undefined ||
      newRepertorieData.idLiveDesigner == null ||
      newRepertorieData.idLiveDesigner == undefined ||
      newRepertorieData.sets == null ||
      newRepertorieData.sets == undefined
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    } else if (newRepertorieData.name.length < 1) {
      return new ServerMessages(
        true,
        'El nombre del repertorio debe contener almenos 1 caracteres.',
        {},
      );
    } else if (newRepertorieData.sets.length < 1) {
      return new ServerMessages(
        true,
        'El repertorio debe contener almenos una lista.',
        {},
      );
    }

    var listFinded = await this.setlistRepository.findOne<Setlist>({
      attributes: [
        'name',
      ],
      where: {
        name: newRepertorieData.name.toString(),
        idLiveDesigner: newRepertorieData.idLiveDesigner.toString()
      },
    });

    if (listFinded) {
      return new ServerMessages(true, 'Existe otro repertorio con el mismo nombre.', {});
    } else {
      try {
        let newData: any = {
          name: newRepertorieData.name,
          idBand: newRepertorieData.band.idBand,
          idTag: newRepertorieData.tag.idTag,
          idLiveDesigner: newRepertorieData.idLiveDesigner,
          //idLiveEvent : newRepertorieData.event.idLiveEvent
        };
        //En caso de que venga con un evento
        if (newRepertorieData.event.name.length != 0) {
          newData.idLiveEvent = newRepertorieData.event.idLiveEvent;
        }
        var newSetList: Setlist = await this.setlistRepository.create<Setlist>(newData, {});

        //Se guardan las nuevas canciones de la lista
        newRepertorieData.sets.forEach(async (newSet) => {
          var savedSet: SetlistSet = await this.setlistSetRepository.create<SetlistSet>({
            idSetlist: newSetList.idSetlist,
            idSet: newSet.idSet
          }, {});
        });

        return new ServerMessages(false, 'Lista creada con exito', newSetList);
      } catch (error) {
        console.log(error);
        return new ServerMessages(true, 'A ocurrido un error guardando el repertorio', error);
      }
    }
  }

  async updateRepertorie(newRepertorieData: RepertorieDto): Promise<ServerMessages> {
    if (
      newRepertorieData.idSetlist == null ||
      newRepertorieData.idSetlist == undefined ||
      newRepertorieData.name == null ||
      newRepertorieData.name == undefined ||
      newRepertorieData.event == null ||
      newRepertorieData.event == undefined ||
      newRepertorieData.band == null ||
      newRepertorieData.band == undefined ||
      newRepertorieData.tag == null ||
      newRepertorieData.tag == undefined ||
      newRepertorieData.idLiveDesigner == null ||
      newRepertorieData.idLiveDesigner == undefined ||
      newRepertorieData.sets == null ||
      newRepertorieData.sets == undefined
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    } else if (newRepertorieData.name.length < 1) {
      return new ServerMessages(
        true,
        'El nombre del repertorio debe contener almenos 1 caracteres.',
        {},
      );
    } else if (newRepertorieData.sets.length < 1) {
      return new ServerMessages(
        true,
        'El repertorio debe contener almenos una lista.',
        {},
      );
    }

    var repertorieFinded = await this.setlistRepository.findOne<Setlist>({
      where: {
        idSetlist: newRepertorieData.idSetlist.toString(),
        idLiveDesigner: newRepertorieData.idLiveDesigner.toString()
      },
    });

    if (repertorieFinded) {
      try {
        repertorieFinded.name = newRepertorieData.name;
        //Si no tiene un evento este se marca como null
        if (newRepertorieData.event.name.length == 0) {
          repertorieFinded.idLiveEvent = null;
        } else {
          repertorieFinded.idLiveEvent = newRepertorieData.event.idLiveEvent;
        }
        repertorieFinded.idBand = newRepertorieData.band.idBand;
        repertorieFinded.idTag = newRepertorieData.tag.idTag;
        repertorieFinded.idLiveDesigner = newRepertorieData.idLiveDesigner;
        await repertorieFinded.save();

        //Se buscan los sets actuales del repertorio
        let actualSets: SetlistSet[] = await this.setlistSetRepository.findAll(
          {
            where: { idSetlist: repertorieFinded.idSetlist.toString() },
          },
        );
        //Eliminar todos los set que no se encuentran en repertorio de sets
        let fixActual: any[] = Array.from(actualSets);
        actualSets.forEach(async actualSet => {
          let finded = newRepertorieData.sets.find(set => {
            return set.idSet == actualSet.idSet;
          });
          if (finded == null && finded == undefined) {
            await actualSet.destroy();
          } else {
            //console.log("no se borro" + finded.idSong);
          }
        });

        //Se crean los nuevos sets del repertorio que no estan actualmente registradas
        newRepertorieData.sets.forEach(async newSet => {
          let finded = actualSets.find(element => {
            return element.idSet == newSet.idSet;
          });
          if (finded == null && finded == undefined) {
            let newData = {
              idSetlist: newRepertorieData.idSetlist,
              idSet: newSet.idSet,
            };
            await this.setlistSetRepository.create<SetlistSet>(newData, {});
          } else {
            //console.log("no se creo" + finded.idSong);
          }
        });

        return new ServerMessages(false, 'Repertorio actualizado con exito', repertorieFinded);
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error guardando el repertorio', error);
      }
    } else {
      return new ServerMessages(true, 'La lista no existe.', {});
    }
  }

  async deleteRepertorie(idSetlist: number): Promise<ServerMessages> {
    if (
      idSetlist == null ||
      idSetlist == undefined 
    ) {
      return new ServerMessages(true, 'Peticion incompleta', {});
    }

    var repertorieFinded = await this.setlistRepository.findOne<Setlist>({
      where: {
        idSetlist: idSetlist.toString()
      },
    });

    if (repertorieFinded) {
      try {
        //Eliminar todos los set del repertorio
        await this.setlistSetRepository.destroy({
          where: { idSetlist: repertorieFinded.idSetlist.toString() },
        });
        //eliminando el repertorio
        repertorieFinded.destroy();

        return new ServerMessages(false, 'Repertorio eliminado con exito', repertorieFinded);
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error guardando el repertorio', error);
      }
    } else {
      return new ServerMessages(true, 'La lista no existe.', {});
    }
  }

  async getRepertories(idUser: number): Promise<ServerMessages> {
    try {
      const repertories: any[] = await this.setlistRepository.findAll({
        /* attributes: ['idLiveEvent','name'], */
        where: { idLiveDesigner: idUser },
        include: [{
          attributes: ['idSet', 'name'],
          model: Set,
          as: 'sets'
        }, {
          model: Tag,
          as: 'tag'
        }, {
          model: Band,
          as: 'band'
        }, {
          model: LiveEvent,
          as: 'liveEvent'
        }]
      }).map((set: Setlist) => {
        let event = {
          idLiveEvent: 0,
          name: "",
          location: "",
          tour: "",
          date: new Date(),
          place: ""
        };
        if (set.liveEvent != null) {
          event = {
            idLiveEvent: set.liveEvent.idLiveEvent,
            name: set.liveEvent.name,
            location: set.liveEvent.location,
            tour: set.liveEvent.tour,
            date: set.liveEvent.date,
            place: set.liveEvent.place
          }
        }

        let sets = set.sets.map((set: Set) => {
          return Object.assign({
            idSet: set.idSet,
            name: set.name,
          })
        });

        return Object.assign({
          idSetlist: set.idSetlist,
          name: set.name,
          event: event,
          band: { idBand: set.band.idBand, name: set.band.name },
          tag: { idTag: set.tag.idTag, name: set.tag.name },
          idLiveDesigner: set.idLiveDesigner,
          sets: sets
        })
      });

      return new ServerMessages(false, 'Repertorios obtenidos con exito', repertories);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'A ocurrido un error obteniendo los repertorios', error);
    }
  }
}
