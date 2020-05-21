import { Sequelize } from 'sequelize-typescript';

/**
 * SEQUELIZE variable is stored in a file named
 * 'constants' so it can be easily reused anywhere
 * without being subject to human error.
 */
//import { SEQUELIZE } from '../utils/constants';
import { User } from '../models/users.entity';
import { BandMember } from '../models/band-members.entity';
import { Band } from '../models/bands.entity';
import { LiveDesigner } from '../models/live-designers.entity';
import { Genre } from '../models/genres.entity';
import { LiveEvent } from '../models/live-events.entity';
import { Setlist } from '../models/setlists.entity';
import { Set } from '../models/sets.entity';
import { Song } from 'src/models/songs.entity';
import { Tag } from '../models/tags.entity';
import { UserHistory } from '../models/user-history.entity';
import { BandGenre } from '../models/band-genres.entity';
import { LiveEventTag } from '../models/live-event-tags.entity';
import { SetlistSet } from '../models/setlist-sets.entity';
import { SetSong } from '../models/set-songs.entity';
import { SetlistTag } from '../models/setlist-tags.entity';
import { SongTag } from '../models/song-tags.entity';

export const databaseProviders = [
  {
    provide: 'SequelizeInstance',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        define: {
          timestamps: false,
        },
        logging: false,
        host: 'localhost',
        port: 3306,
        username: 'ux_user',
        password: 'Auoflo9Pm5z97V2U',
        database: 'ux_proyect',
      });

      /**
       * Add Models Here
       * ===============
       * You can add the models to
       * Sequelize later on.
       */
      sequelize.addModels([
        User,
        BandMember,
        Band,
        LiveDesigner,
        Genre,
        LiveEvent,
        Setlist,
        Set,
        Song,
        Tag,
        UserHistory,
        BandGenre,
        LiveEventTag,
        SetlistSet,
        SetSong,
        SetlistTag,
        SongTag,
      ]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
