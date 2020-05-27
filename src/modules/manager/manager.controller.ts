import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ServerMessages } from '../../utils/serverMessages.util';
import { AuthGuard } from '@nestjs/passport';

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
}
