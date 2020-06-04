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

    @Post('create-song')
    @UseGuards(AuthGuard())
    public async createSong(@Body() body): Promise<ServerMessages> {
      return this.ledService.createSong(body);
    }
  
}
