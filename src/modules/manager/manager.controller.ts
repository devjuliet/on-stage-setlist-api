import { Controller, Get, Param, Post, UseGuards, Body ,Request} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ServerMessages } from '../../utils/serverMessages.util';
import { AuthGuard } from '@nestjs/passport';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  @Get('events')
  ///@UseGuards(AuthGuard())//
  async findEventsByManagerId(): Promise<ServerMessages> {
    return await this.managerService.findEventsByManagerId(1);
  }

  @Get('bands')
  @UseGuards(AuthGuard())
  async findBandsByManagerId(@Request() req): Promise<ServerMessages> {
    return await this.managerService.findBandsByManagerId(req.user.idUser);
  }

  @Get('band/:id')
  //@UseGuards(AuthGuard())//
  async findBandByIdAndByManagerId(
    @Param('id') id: number,
  ): Promise<ServerMessages> {
    return await this.managerService.findBandByIdAndByManagerId(1, id);
  }

  @Post('create-band')
  @UseGuards(AuthGuard())
  public async updateUserPassword(@Body() body): Promise<ServerMessages> {
    return this.managerService.createBand(body);
  }
}
