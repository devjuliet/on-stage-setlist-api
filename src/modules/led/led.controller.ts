import { Controller, Get, UseGuards, Param, Request, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServerMessages } from '../../utils/serverMessages.util';
import { LedService } from './led.service';

@Controller('led')
export class LedController {
    constructor(private readonly ledService: LedService) {}

    @Get('band-list')
    @UseGuards(AuthGuard())
    async findBandByIdAndByManagerId( @Request() req ): Promise<ServerMessages> {
      return await 
        this.ledService.findOfLedBandsByLedId(req.user.idUser);
    }

    @Get('band-songs-list/:idBand')
    @UseGuards(AuthGuard())
    async findSongsBandByIdBandId(@Param('idBand') idBand: number,): Promise<ServerMessages> {
      return await 
        this.ledService.findSongsBandByIdBandId(idBand);
    }

    @Get('get-song/:idSong')
    @UseGuards(AuthGuard())
    async findSongsByIdSong(@Param('idSong') idSong: number,): Promise<ServerMessages> {
      return await 
        this.ledService.findSongsByIdSong(idSong);
    }

    @Post('create-song')
    @UseGuards(AuthGuard())
    public async createSong(@Body() body): Promise<ServerMessages> {
      return this.ledService.createSong(body);
    }

    @Post('update-song')
    @UseGuards(AuthGuard())
    public async updateSong(@Body() body): Promise<ServerMessages> {
      return this.ledService.updateSong(body);
    }

    @Post('create-set')
    @UseGuards(AuthGuard())
    public async createList(@Body() body): Promise<ServerMessages> {
      return this.ledService.createSet(body);
    }

    @Post('update-set')
    @UseGuards(AuthGuard())
    public async updateSet(@Body() body): Promise<ServerMessages> {
      return this.ledService.updateSet(body);
    }

    @Get('set-list')
    @UseGuards(AuthGuard())
    async findSetsOfLedByLedId( @Request() req ): Promise<ServerMessages> {
      return await 
        this.ledService.findSetsOfLedByLedId(req.user.idUser);
    }
  
}
