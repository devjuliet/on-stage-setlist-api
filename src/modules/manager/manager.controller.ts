import { Controller, Get, Param } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ServerMessages } from '../../utils/serverMessages.util';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  @Get('events')
  ///@UseGuards(AuthGuard())//
  async findEventsByManagerId(): Promise<ServerMessages> {
    return await this.managerService.findEventsByManagerId(1);
  }

  @Get('bands')
  ///@UseGuards(AuthGuard())//
  async findBandsByManagerId(): Promise<ServerMessages> {
    return await this.managerService.findBandsByManagerId(1);
  }

  @Get('bands/:id')
  ///@UseGuards(AuthGuard())//
  async findBandByIdAndByManagerId(
    @Param('id') id: number,
  ): Promise<ServerMessages> {
    return await this.managerService.findBandByIdAndByManagerId(1, id);
  }
}
