import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { liveEventProviders } from '../../models/repositoriesModels/live-events.providers';
import { bandProviders } from '../../models/repositoriesModels/bands.providers';
import { bandGenreProviders } from '../../models/repositoriesModels/band-genres.providers';
import { genreProviders } from '../../models/repositoriesModels/genres.providers';
import { bandMemberProviders } from '../../models/repositoriesModels/band-members.providers';
import { userProviders } from '../../models/repositoriesModels/user.providers';
import { songProviders } from '../../models/repositoriesModels/songs.providers';
import { liveDesignerProviders } from '../../models/repositoriesModels/live-designers.providers';
import { PassportModule } from '@nestjs/passport';
import { setProviders } from '../../models/repositoriesModels/sets.providers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  controllers: [ManagerController],
  providers: [
    ManagerService,
    ...liveEventProviders,
    ...bandProviders,
    ...genreProviders,
    ...bandMemberProviders,
    ...userProviders,
    ...songProviders,
    ...bandGenreProviders,
    ...liveDesignerProviders,
    ...setProviders
  ],
})
export class ManagerModule {}
