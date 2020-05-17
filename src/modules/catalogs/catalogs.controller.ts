import { Controller, Get, Param } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { ServerMessage } from '../../utils/dtos/serverMessages.dto';

@Controller('catalogs')
export class CatalogsController {

    constructor(private readonly catalogService: CatalogsService) {}

    /* @Get('genres')
    async getAllGenres(): Promise<ServerMessage>{
        
    } */
}
