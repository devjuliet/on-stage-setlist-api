import {
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Request,
    Delete,
    Put,
    Body,
    Query,
} from '@nestjs/common';
import { BandMembersService } from './band-members.service';
import { AuthGuard } from '@nestjs/passport';
import { ServerMessages } from '../../utils/serverMessages.util';

@Controller('band-members')
export class BandMembersController {
    constructor(private readonly BandMembersService: BandMembersService) { }

    @Get('songs/:id')
    @UseGuards(AuthGuard())
    async findSongById(@Param('id') idSong: number, @Request() req): Promise<ServerMessages> {
        return await this.BandMembersService.findSongById(idSong, req.user.idUser);
    }

    @Get('events')
    @UseGuards(AuthGuard())
    async findAllEventsByUserId(@Request() req): Promise<ServerMessages> {
        return await this.BandMembersService.findAllEventsByUserId(req.user.idUser);
    }

    @Get('history')
    @UseGuards(AuthGuard())
    async getBandMemberHistory(@Request() req): Promise<ServerMessages> {
        return await this.BandMembersService.getBandMemberHistory(req.user.idUser);
    }

}
