import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LedController } from './led.controller';
import { LedService } from './led.service';
import { liveEventProviders } from '../../models/repositoriesModels/live-events.providers';
import { bandProviders } from '../../models/repositoriesModels/bands.providers';
import { bandGenreProviders } from '../../models/repositoriesModels/band-genres.providers';
import { genreProviders } from '../../models/repositoriesModels/genres.providers';
import { bandMemberProviders } from '../../models/repositoriesModels/band-members.providers';
import { userProviders } from '../../models/repositoriesModels/user.providers';
import { songProviders } from '../../models/repositoriesModels/songs.providers';
import { liveDesignerProviders } from '../../models/repositoriesModels/live-designers.providers';

import { setProviders } from '../../models/repositoriesModels/sets.providers';
import { userHistoryProviders } from '../../models/repositoriesModels/user-history.providers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  controllers: [LedController],
  providers: [
    LedService,
    ...liveEventProviders,
    ...bandProviders,
    ...genreProviders,
    ...bandMemberProviders,
    ...userProviders,
    ...userHistoryProviders,
    ...songProviders,
    ...bandGenreProviders,
    ...liveDesignerProviders,
    ...setProviders
  ]
})
export class LedModule {}
