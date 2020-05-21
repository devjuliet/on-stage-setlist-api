import { Controller, Get } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { ServerMessages } from '../../utils/serverMessages.util';

@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogService: CatalogsService) {}

  @Get('genres')
  ///@UseGuards(AuthGuard())//
  async getAllGenres(): Promise<ServerMessages> {
    return await this.catalogService.getAllGenres();
  }

  @Get('tags')
  ///@UseGuards(AuthGuard())//
  async getAllTags(): Promise<ServerMessages> {
    return await this.catalogService.getAllTags();
  }
}
