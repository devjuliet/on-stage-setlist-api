
import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Delete,
  Put,
  Body ,
  Query
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ServerMessages } from '../../utils/serverMessages.util';
import { AuthGuard } from '@nestjs/passport';
import { Band } from '../../models/bands.entity';
import { LiveEvent } from '../../models/live-events.entity';
import { BandMember } from '../../models/band-members.entity';
import { BandDto } from './dto/band.dto';

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

  @Get('band/:idBand')
  @UseGuards(AuthGuard())
  async findBandByIdAndByManagerId(
    @Param('idBand') idBand: number, 
    @Request() req
  ): Promise<ServerMessages> {
    return await 
      this.managerService.findBandByIdAndByManagerId(req.user.idUser,idBand);
  }

  @Post('bands/:id')
  @UseGuards(AuthGuard())
  async addBandMemberByUsername(
    @Param('id') idBand: number,
    @Request() req,
    @Query() username,
    @Query() livedesigner,
  ): Promise<ServerMessages> {
    return await this.managerService.addBandMemberByUsername(
      req.user.idUser,
      idBand,
      username,
      livedesigner,
    );
  }

  @Get('band-delete/:id')
  @UseGuards(AuthGuard())
  async deleteBandById(
    @Param('id') idBand: number,
    @Request() req,
  ): Promise<ServerMessages> {
    return await this.managerService.deleteBandById(req.user.idUser, idBand);
  }

  @Post('band-update')
  @UseGuards(AuthGuard())
  async updateBand(
    @Request() req,
    @Body() band: BandDto,
  ): Promise<ServerMessages> {
    return await this.managerService.updateBand(req.user.idUser, band);
  }

  @Post('events')
  @UseGuards(AuthGuard())
  async createLiveEvent(
    @Request() req,
    @Body() event: LiveEvent,
  ): Promise<ServerMessages> {
    return await this.managerService.createLiveEvent(req.user.idUser, event);
  }

  @Post('create-band')
  @UseGuards(AuthGuard())
  public async updateUserPassword(@Body() body): Promise<ServerMessages> {
    return this.managerService.createBand(body);
  }
}
