import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { liveEventProviders } from '../../models/repositoriesModels/live-events.providers';
import { bandProviders } from '../../models/repositoriesModels/bands.providers';
import { bandGenreProviders } from '../../models/repositoriesModels/band-genres.providers';
import { genreProviders } from 'src/models/repositoriesModels/genres.providers';
import { bandMemberProviders } from 'src/models/repositoriesModels/band-members.providers';
import { userProviders } from 'src/models/repositoriesModels/user.providers';
import { songProviders } from '../../models/repositoriesModels/songs.providers';

@Module({
  /*imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],*/
  controllers: [ManagerController],
  providers: [
    ManagerService,
    ...liveEventProviders,
    ...bandProviders,
    ...bandGenreProviders,
    ...genreProviders,
    ...bandMemberProviders,
    ...userProviders,
    ...songProviders,
    ...bandGenreProviders,
  ],
})
export class ManagerModule {}
