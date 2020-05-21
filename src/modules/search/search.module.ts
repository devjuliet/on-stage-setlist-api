import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { bandProviders } from '../../models/repositoriesModels/bands.providers';
import { userProviders } from '../../models/repositoriesModels/user.providers';

@Module({
  controllers: [SearchController],
  providers: [SearchService, ...bandProviders, ...userProviders],
})
export class SearchModule {}
