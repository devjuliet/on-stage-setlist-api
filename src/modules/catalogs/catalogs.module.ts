import { Module } from '@nestjs/common';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';
import { genreProviders } from './../../models/repositoriesModels/genres.providers';
import { tagProviders } from './../../models/repositoriesModels/tags.providers';

@Module({
  controllers: [CatalogsController],
  providers: [CatalogsService, ...genreProviders, ...tagProviders],
})
export class CatalogsModule {}
