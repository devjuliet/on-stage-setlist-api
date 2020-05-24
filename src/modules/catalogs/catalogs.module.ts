import { Module } from '@nestjs/common';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';
import { genreProviders } from './../../models/repositoriesModels/genres.providers';
import { tagProviders } from './../../models/repositoriesModels/tags.providers';
//import into any module that contains routes we want to protect with our JWT authorisation. 
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  controllers: [CatalogsController],
  providers: [CatalogsService, ...genreProviders, ...tagProviders],
})
export class CatalogsModule {}
