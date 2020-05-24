import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { bandProviders } from '../../models/repositoriesModels/bands.providers';
import { userProviders } from '../../models/repositoriesModels/user.providers';
//import into any module that contains routes we want to protect with our JWT authorisation. 
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  controllers: [SearchController],
  providers: [SearchService, ...bandProviders, ...userProviders],
})
export class SearchModule {}
