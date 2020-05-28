import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ServerMessages } from '../../utils/serverMessages.util';
import { AuthGuard } from '@nestjs/passport';
import { Body, Query } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { LiveEvent } from '../../models/live-events.entity';
import { BandMember } from '../../models/band-members.entity';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  @Get('events')
  @UseGuards(AuthGuard())
  async findEventsByManagerId(@Request() req): Promise<ServerMessages> {
    return await this.managerService.findEventsByManagerId(req.user.idUser);
  }

  @Get('bands')
  @UseGuards(AuthGuard())
  async findBandsByManagerId(@Request() req): Promise<ServerMessages> {
    return await this.managerService.findBandsByManagerId(req.user.idUser);
  }

  @Get('bands/:id')
  @UseGuards(AuthGuard())
  async findBandByIdAndByManagerId(
    @Param('id') id: number,
    @Request() req,
  ): Promise<ServerMessages> {
    return await this.managerService.findBandByIdAndByManagerId(
      req.user.idUser,
      id,
    );
  }

  @Post('bands/:id')
  @UseGuards(AuthGuard())
  async addBandMemberByUsername(
    @Param('id') idBand: number,
    @Request() req,
    @Body() bandMember: BandMember,
    @Query() livedesigner: string,
    @Query() username: string,
  ): Promise<ServerMessages> {
    return await this.managerService.addBandMemberByUsername(
      req.user.idUser,
      idBand,
      username,
      livedesigner,
    );
  }

  @Delete('bands/:id')
  @UseGuards(AuthGuard())
  async deleteBandById(
    @Param('id') id: number,
    @Request() req,
  ): Promise<ServerMessages> {
    return await this.managerService.deleteBandById(req.user.idUser, id);
  }

  @Put('bands/:id')
  @UseGuards(AuthGuard())
  async updateBand(
    @Param('id') id: number,
    @Request() req,
    @Body() band: Band,
  ): Promise<ServerMessages> {
    return await this.managerService.updateBand(req.user.idUser, id, band);
  }

  @Post('events')
  @UseGuards(AuthGuard())
  async createLiveEvent(
    @Request() req,
    @Body() event: LiveEvent,
  ): Promise<ServerMessages> {
    return await this.managerService.createLiveEvent(req.user.idUser, event);
  }
}
