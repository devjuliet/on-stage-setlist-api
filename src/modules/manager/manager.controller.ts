import { Controller, Get } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ServerMessages } from '../../utils/serverMessages.util';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}
  @Get('events')
  ///@UseGuards(AuthGuard())//
  async findAllEventsByManagerId(): Promise<ServerMessages> {
    return await this.managerService.findAllEventsByManagerId(1);
  }
}
