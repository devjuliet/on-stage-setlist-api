import { Controller, Get, Param } from '@nestjs/common';
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
}
