import { Injectable, Inject } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { LiveEvent } from '../../models/live-events.entity';
import { ServerMessages } from '../../utils/serverMessages.util';

@Injectable()
export class ManagerService {
  constructor(
    @Inject('BandRepository')
    private readonly bandRepository: typeof Band,
    @Inject('LiveEventRepository')
    private readonly liveEventRepository: typeof LiveEvent,
  ) {}

  async findAllEventsByManagerId(id: number): Promise<ServerMessages> {
    try {
      const events = await this.liveEventRepository.findAll({
        include: [
          {
            model: Band,
            as: 'band',
            where: { idUserManager: id },
          },
        ],
      });

      return new ServerMessages(false, 'Sucess', events);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async findAllBandsWithGenre(): Promise<ServerMessages> {
    try {
      const bands = await this.bandRepository.findAll({});

      return new ServerMessages(false, 'Sucess', bands);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }
}
